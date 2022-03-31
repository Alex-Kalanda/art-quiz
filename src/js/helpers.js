import images from '../image-data/images.js';

const helpers = {
  getRandom: function randomInteger(min, max) {
    //get random number from (min-0.5) to (max+0.5)
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  },
  getColor() {
    return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
  },
  getStat() {
    return JSON.parse(localStorage.getItem('stat'));
  },
  getSettings() {
    return JSON.parse(localStorage.getItem('settings'));
  },
  getGameInitStat(count) {
    const obj = {};
    for (let i = 1; i <= count; i++) {
      obj[i] = {
        isVisited: false,
        rightAns: null,
        ans: null,
      };
    }
    return obj;
  },
  writeStat(type, gameId, result) {
    const stat = JSON.parse(localStorage.getItem('stat'));
    let key;
    switch (type) {
      case 'guessAuthor':
        key = 'painters';
        break;
      case 'guessPicture':
        key = 'paintings';
        break;
    }
    stat[key][gameId].isVisited = true;
    stat[key][gameId].rightAns = result.filter((i) => i).length;
    stat[key][gameId].ans = result;

    localStorage.setItem('stat', JSON.stringify(stat));
  },
  writeSettings(set) {
    localStorage.setItem('settings', JSON.stringify(set));
  },
  getPageKey(type) {
    let key;
    switch (type) {
      case 'guessAuthor':
        key = 'painters';
        break;
      case 'guessPicture':
        key = 'paintings';
        break;
    }
    return key;
  },
  getQuestWithID(id) {
    const COUNT_ITEMS = 10;
    const start = (id - 1) * COUNT_ITEMS;
    const finish = COUNT_ITEMS + start;
    return images.slice(start, finish);
  },
  getPaintingsForAuthor(author) {
    const result = [];
    images.forEach((item) => {
      if (item.author === author) {
        result.push(item);
      }
    });
    return result;
  },
  shuffleArr(arr) {
    function makeRandomArr() {
      return Math.random() - 0.5;
    }

    return arr.sort(makeRandomArr);
  },
  music(action) {
    const music = document.querySelector('#music');
    const TIME_OF_START_PLAY = 0;
    switch (action) {
      case 'on':
        music.volume = this.getSettings().music.volume;
        music.play();
        break;
      case 'off':
        music.pause();
        music.currentTime = TIME_OF_START_PLAY;
        break;
    }
  },
  sound: {
    tap() {
      const sound = document.querySelector('#push');
      sound.volume = helpers.getSettings().sound.volume;
      sound.play();
    },
    swipe() {
      const sound = document.querySelector('#fly');
      sound.volume = helpers.getSettings().sound.volume;
      sound.play();
    },
    correct() {
      const sound = document.querySelector('#correct');
      sound.volume = helpers.getSettings().sound.volume;
      sound.play();
    },
    incorrect() {
      const sound = document.querySelector('#incorrect');
      sound.volume = helpers.getSettings().sound.volume;
      sound.play();
    },
    finish() {
      const sound = document.querySelector('#audio__finish');
      sound.volume = helpers.getSettings().sound.volume;
      sound.play();
    },
    timeIsOver() {
      const sound = document.querySelector('#time__over');
      sound.volume = helpers.getSettings().sound.volume;
      sound.play();
    },
  },
};

export default helpers;
