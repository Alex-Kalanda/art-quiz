import { painters, paintings } from './main-page.js';
import helpers from './helpers.js';
import images from '../image-data/images.js';
import startPage from '../../app.js';

export default class Quiz {
  constructor(root, questions, type, gameId, currentQuest = 0) {
    this.root = root;
    this.questions = questions;
    this.type = type;
    this.gameId = gameId;
    this.currentQuestion = currentQuest;
    this.gameRes = [];
  }

  render() {
    let author = this.questions[this.currentQuestion].author,
      picName = this.questions[this.currentQuestion].name,
      year = this.questions[this.currentQuestion].year,
      questNum = this.currentQuestion + 1,
      picNum = this.questions[this.currentQuestion].imageNum;

    const answers = this.getDiffAns();

    switch (this.type) {
      case 'guessAuthor':
        this.root.innerHTML = `
          <div class="quiz">
            <div class="quiz-caption">
              <div id="dark-BG"></div>
              <button class="button-home quiz-back"></button>
              <button class="button-start-page"></button>
              <span class="quiz-quest-num">Вопрос ${questNum}</span>
              <span>Кто автор этой картины?</span>
            </div>
            <div class="quiz__author-container">
              <div class="quiz__author-painting">
                <img src="image-data/full/${picNum}full.jpg" alt="pic">
              </div>
            </div>
            <div class="quiz__guessAuthor-answers">
              <div data-pos="${answers[0]}" class="quiz__guessAuthor-ans">
                <span data-pos="${answers[0]}">${images[answers[0]].author}</span>
              </div>
              <div data-pos="${answers[1]}" class="quiz__guessAuthor-ans">
                <span data-pos="${answers[1]}">${images[answers[1]].author}</span>
              </div>
              <div data-pos="${answers[2]}" class="quiz__guessAuthor-ans">
                <span data-pos="${answers[2]}">${images[answers[2]].author}</span>
              </div>
              <div data-pos="${answers[3]}" class="quiz__guessAuthor-ans">
                <span data-pos="${answers[3]}">${images[answers[3]].author}</span>
              </div>
            </div>
            <div class="quiz__progress">
              <span class="progress-bullet bullet-0 no-color"></span>
              <span class="progress-bullet bullet-1 no-color"></span>
              <span class="progress-bullet bullet-2 no-color"></span>
              <span class="progress-bullet bullet-3 no-color"></span>
              <span class="progress-bullet bullet-4 no-color"></span>
              <span class="progress-bullet bullet-5 no-color"></span>
              <span class="progress-bullet bullet-6 no-color"></span>
              <span class="progress-bullet bullet-7 no-color"></span>
              <span class="progress-bullet bullet-8 no-color"></span>
              <span class="progress-bullet bullet-9 no-color"></span>
            </div>
            
            <div class="quiz__right-answer">
              <div class="right-answer__icon">
                <img src="assets/icons/correct-answer.png" alt="answer">
              </div>
              <div class="right-answer__image">
                <img src="image-data/full/${picNum}full.jpg" alt="painting">
              </div>
              <div class="right-answer__desc">
                <div class="right-answer__author">${author}</div>
                <div class="right-answer__picname">"${picName}"</div>
                <div class="right-answer__year">${year} г.</div>
              </div>
              <button id="popUp-continue" class="right-answer__button">Продолжить</button>
            </div>
            
            <div class="timer-alert">
              <div class="timer-alert__text">Время<br>вышло!</div>
              <button class="timer-alert__button">Продолжить</button>
            </div>
                
            <div class="quiz__final"></div>
          </div>
          `;
        break;
      case 'guessPicture':
        this.root.innerHTML = `
          <div class="quiz">
            <div class="quiz-caption">
              <div id="dark-BG"></div>
              <button class="button-home quiz-back"></button>
              <button class="button-start-page"></button>
              <span class="quiz-quest-num">Вопрос ${questNum}</span>
              <span>Какую из картин написал</span>
              <span>${author}?</span>
            </div>
            <div class="quiz__picture-container">
              <div class="quiz__picture-painters">
                <img data-pos="${answers[0]}" src="image-data/img/${answers[0]}.jpg" alt="pic">
              </div>
              <div class="quiz__picture-painters">
                <img data-pos="${answers[1]}" src="image-data/img/${answers[1]}.jpg" alt="pic">
              </div>
              <div class="quiz__picture-painters">
                <img data-pos="${answers[2]}" src="image-data/img/${answers[2]}.jpg" alt="pic">
              </div>
              <div class="quiz__picture-painters">
                <img data-pos="${answers[3]}" src="image-data/img/${answers[3]}.jpg" alt="pic">
              </div>
            </div>
            <div class="quiz__progress">
              <span class="progress-bullet bullet-0 no-color"></span>
              <span class="progress-bullet bullet-1 no-color"></span>
              <span class="progress-bullet bullet-2 no-color"></span>
              <span class="progress-bullet bullet-3 no-color"></span>
              <span class="progress-bullet bullet-4 no-color"></span>
              <span class="progress-bullet bullet-5 no-color"></span>
              <span class="progress-bullet bullet-6 no-color"></span>
              <span class="progress-bullet bullet-7 no-color"></span>
              <span class="progress-bullet bullet-8 no-color"></span>
              <span class="progress-bullet bullet-9 no-color"></span>
            </div>
    
            <div class="quiz__right-answer">
              <div class="right-answer__icon">
                 <img src="assets/icons/correct-answer.png" alt="answer">
              </div>
              <div class="right-answer__image">
                 <img src="image-data/full/${picNum}full.jpg" alt="painting">
              </div>
              <div class="right-answer__desc">
                <div class="right-answer__author">${author}</div>
                <div class="right-answer__picname">"${picName}"</div>
                <div class="right-answer__year">${year} г.</div>
              </div>
              <button id="popUp-continue" class="right-answer__button">Продолжить</button>
            </div>
            
            <div class="timer-alert">
              <div class="timer-alert__text">Время<br>вышло!</div>
              <button class="timer-alert__button">Продолжить</button>
            </div>
            
            <div class="quiz__final"></div>
          </div>`;
        break;
    }
    this.addListeners();
  }

  addListeners() {
    const quizContainer = document.querySelector('.quiz__picture-container');
    const variantsArr = document.querySelectorAll('.quiz__guessAuthor-ans');
    const timerButton = document.querySelector('.timer-alert__button');
    const quizBack = document.querySelector('.button-home.quiz-back');
    const buttonContinue = document.querySelector('#popUp-continue');
    const bullets = document.querySelectorAll('.progress-bullet');
    const quizHome = document.querySelector('.button-start-page');
    const popUp = document.querySelector('.quiz__right-answer');
    const timerAlert = document.querySelector('.timer-alert');
    const timerVisual = document.querySelector('.timer-box');
    const popUpRes = document.querySelector('.quiz__final');
    const darkBG = document.querySelector('#dark-BG');
    const LAST_QUEST_POS = 9;

    const settings = helpers.getSettings();
    const isTimer = settings.timer.status;
    const sec = settings.timer.time;
    let interval, counter;

    //change view bullets in depending on correct answers
    this.gameRes.forEach((status, index) => {
      bullets[index].classList.remove('no-color');
      status ? bullets[index].classList.add('green') : bullets[index].classList.add('red');
    });
    bullets[this.currentQuestion].classList.add('active');

    //push button "продолжить"/"результаты" after answer
    buttonContinue.addEventListener('click', () => {
      darkBG.style.zIndex = '';
      darkBG.style.opacity = '';

      if (this.currentQuestion === 9) {
        finishQuiz();
      } else {
        this.currentQuestion++;
        this.render();
      }
    });

    //return to start page
    quizHome.addEventListener('click', () => {
      stopTimer();
      timerVisual.innerHTML = '';
      startPage.render(this.root);
    });

    switch (this.type) {
      case 'guessAuthor':
        //возврат на страницу с играми
        quizBack.addEventListener('click', () => {
          stopTimer();
          timerVisual.innerHTML = '';
          painters.render();
        });

        variantsArr.forEach((i) => {
          i.addEventListener('click', (event) => {
            stopTimer();
            showResultPopUp(event);
          });
        });
        break;
      case 'guessPicture':
        //возврат на страницу с играми
        quizBack.addEventListener('click', () => {
          stopTimer();
          timerVisual.innerHTML = '';
          paintings.render();
        });

        quizContainer.addEventListener('click', (event) => {
          stopTimer();
          showResultPopUp(event);
        });
        break;
    }

    const showResultPopUp = (event) => {
      const ans = event.target.dataset.pos;
      const rightAns = this.questions[this.currentQuestion].imageNum;

      if (ans) {
        const icon = document.querySelector('.right-answer__icon img');
        this.gameRes[this.currentQuestion] = ans === rightAns;

        if (this.currentQuestion === 9) {
          buttonContinue.innerText = 'Результаты';
        }

        //звук после каждого ответа
        if (!(ans === rightAns)) {
          icon.src = 'assets/icons/incorrect-answer.png';
          popUp.style.backgroundColor = '#fc7979';
          if (helpers.getSettings().sound.status) {
            helpers.sound.incorrect();
          }
        } else {
          if (helpers.getSettings().sound.status) {
            helpers.sound.correct();
          }
        }

        bullets[this.currentQuestion].classList.remove('no-color');
        this.gameRes[this.currentQuestion]
          ? bullets[this.currentQuestion].classList.add('green')
          : bullets[this.currentQuestion].classList.add('red');

        darkBG.style.zIndex = '1';
        darkBG.style.opacity = '0.7';
        popUp.style.bottom = '4%';
      }
    };

    const finishQuiz = () => {
      //sound of ending game
      if (helpers.getSettings().sound.status) {
        helpers.sound.finish();
      }

      stopTimer();
      timerVisual.innerHTML = '';

      this.renderResultPopUp();
      popUp.style.bottom = '150%';
      popUpRes.style.bottom = '0';

      const stat = helpers.getStat();
      const key = helpers.getPageKey(this.type);
      const amountCorrectAns = this.gameRes.filter((i) => i).length;

      //check better answers - prev. or current >>> if current better - write to localstorage
      if (stat[key][this.gameId].isVisited) {
        const amountOldCorrectAns = stat[key][this.gameId].ans.filter((i) => i).length;

        if (amountCorrectAns > amountOldCorrectAns) {
          helpers.writeStat(this.type, this.gameId, this.gameRes);
        }
      } else {
        helpers.writeStat(this.type, this.gameId, this.gameRes);
      }
    };

    timerButton.addEventListener('click', () => {
      if (this.currentQuestion === LAST_QUEST_POS) {
        this.gameRes[this.currentQuestion] = false;
        finishQuiz();
        timerAlert.style.top = '';
        darkBG.style.zIndex = '';
        darkBG.style.opacity = '';
      } else {
        this.gameRes[this.currentQuestion] = false;
        bullets[this.currentQuestion].classList.remove('no-color');
        bullets[this.currentQuestion].classList.add('red');
        this.currentQuestion++;
        this.render();
      }
    });

    if (isTimer) {
      counter = sec;
      startTimer();
    }

    function startTimer() {
      clearInterval(interval);
      interval = setInterval(countDown, 1000);
    }

    function stopTimer() {
      clearInterval(interval);
    }

    function countDown() {
      if (counter === 0) {
        stopTimer();
        if (helpers.getSettings().sound.status) {
          helpers.sound.timeIsOver();
        }
        timerVisual.innerHTML = `00:00`;
        timerAlert.style.top = '5%';
        darkBG.style.zIndex = '1';
        darkBG.style.opacity = '0.7';
      } else {
        counter < 10 ? (timerVisual.innerHTML = `00:0${counter}`) : (timerVisual.innerHTML = `00:${counter}`);
        counter--;
      }
    }
  }

  getDiffAns() {
    let answers = [];
    let authors = [];
    const TOTAL_COUNT_OF_IMG = 240;
    const ALL_IMAGES_POS = TOTAL_COUNT_OF_IMG - 1;

    answers[0] = +this.questions[this.currentQuestion].imageNum;
    authors[0] = images[+answers[0]].author;

    answers[1] = getUniNum(answers, authors);
    authors[1] = images[+answers[1]].author;
    answers[2] = getUniNum(answers, authors);
    authors[2] = images[+answers[2]].author;
    answers[3] = getUniNum(answers, authors);
    authors[3] = images[+answers[3]].author;

    function getUniNum(ans, aut) {
      let a = helpers.getRandom(0, ALL_IMAGES_POS);
      while (ans.includes(a) || aut.includes(images[a].author)) {
        a = helpers.getRandom(0, TOTAL_COUNT_OF_IMG);
      }
      return a;
    }

    return helpers.shuffleArr(answers);
  }

  //show common result of game
  renderResultPopUp = () => {
    //window with all results after ending quiz
    const popUpRes = document.querySelector('.quiz__final');

    const stat = helpers.getStat();
    let key = helpers.getPageKey(this.type);
    let upgradeInfo = '';

    const amountCorrectAns = this.gameRes.filter((i) => i).length;
    const oldGame = stat[key][this.gameId];

    if (oldGame.isVisited) {
      const amountOldCorrectAns = oldGame.ans.filter((i) => i).length;
      upgradeInfo =
        amountCorrectAns > amountOldCorrectAns
          ? 'Вы улучшили передыдущий результат!'
          : 'Вам не удалось улучшить результат =(';
    }

    popUpRes.innerHTML = `
      <div class="quiz__final__caption">Ваш результат:  ${amountCorrectAns} из 10</div>
      <div class="quiz__final__subCaption">${upgradeInfo}</div>`;

    this.gameRes.forEach((item, index) => {
      let author = this.questions[index].author,
        picName = this.questions[index].name,
        picNum = this.questions[index].imageNum,
        improve = false,
        degrad = false;

      if (oldGame.isVisited) {
        improve = this.gameRes[index] > oldGame.ans[index];
        degrad = oldGame.ans[index] > this.gameRes[index];
      }

      const elem = document.createElement('div');
      elem.classList.add('quiz__final-item');
      elem.innerHTML = `
        <div class="quiz__final__img">
          <img  style="filter: grayscale(${this.gameRes[index] ? '0' : '100%'})"
                src="image-data/img/${picNum}.jpg" alt="miniPic">
        </div>
        <span class="quiz__final__desc">${author}<br>"${picName}"</span>
        <span class="quiz__final__indicator">
            ${improve ? '&#128516' : ''}
            ${degrad ? '&#128584' : ''}
        </span>
        <span class="quiz__final__symbol">${this.gameRes[index] ? '✓' : '⊘'}</span>`;

      elem.style.color = this.gameRes[index] ? 'green' : '#000000';
      elem.dataset.pos = `${index}`;

      popUpRes.appendChild(elem);
    });
    popUpRes.innerHTML += `
      <button id="popUp-exit" class="right-answer__button">Выход</button>
      <div class="painting__description"></div>`;

    //mini-picture click handler (show detailed info about paintings)
    popUpRes.addEventListener(
      'click',
      (event) => {
        const targetEl = event.target.closest('.quiz__final-item');

        if (targetEl) {
          let pos = targetEl.dataset.pos;

          let author = this.questions[pos].author,
            picName = this.questions[pos].name,
            year = this.questions[pos].year,
            questNum = +pos + 1,
            picNum = this.questions[pos].imageNum;

          const paintingDescription = document.querySelector('.painting__description');

          paintingDescription.innerHTML = `
             <div class="description-caption">
               <div class="description-caption__icon">
                 <img src="assets/icons/${this.gameRes[pos] ? '' : 'in'}correct-answer.png" alt="answer">
               </div>
               <div class="description-caption__quest-num">Вопрос ${questNum}</div>
             </div>
             
             <div class="right-answer__image">
               <img src="image-data/full/${picNum}full.jpg" alt="painting">
             </div>
             <div class="description-caption__desc">
               <div class="right-answer__author">${author}</div>
               <div class="description-caption__picname">"${picName}"</div>
               <div class="right-answer__year">${year} г.</div>
             </div>
             <button class="description__button">Закрыть</button>`;

          paintingDescription.style.right = '0';

          document.querySelector('.description__button').addEventListener('click', () => {
            paintingDescription.style.right = '-100%';
          });
        }
      },
      true
    );

    //click button handler - exit of results screen
    document.querySelector('#popUp-exit').addEventListener('click', () => {
      popUpRes.style.bottom = '150%';
      this.root.style.opacity = '0';
      setTimeout(() => {
        this.root.style.opacity = '1';
        if (this.type === 'guessAuthor') painters.render();
        if (this.type === 'guessPicture') paintings.render();
      }, 300);
    });
  };
}
