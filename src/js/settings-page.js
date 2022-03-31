import startPage from '../../app.js';
import helpers from './helpers.js';

export default class SettingsPage {
  constructor(root) {
    this.root = root;
  }

  render() {
    const isMusic = helpers.getSettings().music.status;
    const isSound = helpers.getSettings().sound.status;
    const isTimer = helpers.getSettings().timer.status;
    const VOL_REDUCE_RATIO = 0.5;
    const PERCENTAGE = 100;

    this.root.innerHTML = `
      <button class="button-home game-list"></button>
      <div class="settings-page">
        <div class="settings-page__caption">Настройки</div>
        <div class="settings-page__sound settings-item">
          <div class="settings-item__icon">
            <img src="assets/icons/grammofon.svg" alt="music">
          </div>
          <div class="settings-item__control">
            <div class="control__switch-music">
              <button id="switch-music">Фоновая музыка</button>
              <img src="assets/icons/sound${isMusic ? 'ON' : 'Off'}.svg" alt="music">
            </div>
            <div class="control__volume">
              <span>ГРОМКОСТЬ</span>
              <input type="range" value="${(helpers.getSettings().music.volume * PERCENTAGE) / VOL_REDUCE_RATIO}">
            </div>
          </div>
        </div>
        <div class="settings-page__music settings-item">
          <div class="settings-item__icon">
              <img src="assets/icons/music-notes.svg" alt="sounds">
          </div>
          <div class="settings-item__control">
            <div class="control__switch-sound">
              <button id="switch-sound">Звуки приложения</button>
              <img src="assets/icons/sound${isSound ? 'ON' : 'Off'}.svg" alt="sounds">
            </div>
            <div class="control__sound">
              <span>ГРОМКОСТЬ</span>
              <input type="range" value="${(helpers.getSettings().sound.volume * PERCENTAGE) / VOL_REDUCE_RATIO}">
            </div>
          </div>
        </div>
        <div class="settings-page__timer settings-item">
          <div class="settings-item__icon">
            <img src="assets/icons/timer.svg" alt="timer">
          </div>
          <div class="settings-item__control">
            <div class="control__switch-timer">
              <button id="switch-timer">Игра на время</button>
              <img src="assets/icons/timer${isTimer ? 'On' : 'Off'}.svg" alt="sounds">
            </div>
            <div class="control__time">
              <span>ОГРАНИЧЕНИЕ ${helpers.getSettings().timer.time}c</span>
              <input type="range" min="5" max="30" step="5" value="${helpers.getSettings().timer.time}">
            </div>
          </div>
        </div>
      </div>`;

    this.addListeners();
  }

  addListeners() {
    const time = document.querySelector('.control__time input');
    const music = document.querySelector('#music');
    const sound = document.querySelector('.control__sound input');
    const volume = document.querySelector('.control__volume input');
    const settings = helpers.getSettings();
    const timerText = document.querySelector('.control__time span');
    const buttonHome = document.querySelector('.button-home');
    const musicButton = document.querySelector('#switch-music');
    const soundButton = document.querySelector('#switch-sound');
    const timerButton = document.querySelector('#switch-timer');
    const TIMER_OFF_PATH = 'assets/icons/timerOff.svg';
    const TIMER_ON_PATH = 'assets/icons/timerOn.svg';
    const SOUND_OFF_PATH = 'assets/icons/soundOff.svg';
    const SOUND_ON_PATH = 'assets/icons/soundON.svg';
    const VOL_REDUCE_RATIO = 0.5;
    const PERCENTAGE = 100;

    buttonHome.addEventListener('click', () => {
      startPage.render(this.root);
    });

    //background music button handler
    musicButton.addEventListener('click', () => {
      const icon = document.querySelector('.control__switch-music img');
      if (settings.music.status) {
        settings.music.status = false;
        icon.src = SOUND_OFF_PATH;
        helpers.music('off');
        helpers.writeSettings(settings);
      } else {
        settings.music.status = true;
        icon.src = SOUND_ON_PATH;
        helpers.music('on');
        helpers.writeSettings(settings);
      }
    });

    //change volume background music
    volume.addEventListener('input', (event) => {
      let currentVolume = (event.target.value / PERCENTAGE) * VOL_REDUCE_RATIO;
      music.volume = currentVolume;
      settings.music.volume = currentVolume;
      helpers.writeSettings(settings);
    });

    //app sounds button handler
    soundButton.addEventListener('click', () => {
      const icon = document.querySelector('.control__switch-sound img');
      icon.src = settings.sound.status ? SOUND_OFF_PATH : SOUND_ON_PATH;
      settings.sound.status = !settings.sound.status;
      helpers.writeSettings(settings);
    });

    //change volume app sounds
    sound.addEventListener('input', (event) => {
      //convert from percent and reduce volume
      settings.sound.volume = (event.target.value / PERCENTAGE) * VOL_REDUCE_RATIO;
      helpers.writeSettings(settings);
    });

    //timer button click-handler
    timerButton.addEventListener('click', () => {
      const check = document.querySelector('.control__switch-timer img');
      check.src = settings.timer.status ? TIMER_OFF_PATH : TIMER_ON_PATH;
      settings.timer.status = !settings.timer.status;
      helpers.writeSettings(settings);
    });

    //change time for game
    time.addEventListener('click', changeTime.bind(this));
    time.addEventListener('touchend', changeTime.bind(this));

    function changeTime(event) {
      const sec = event.target.value;
      timerText.innerHTML = `ОГРАНИЧЕНИЕ  ${sec}c`;
      settings.timer.time = sec;
      helpers.writeSettings(settings);
    }
  }
}
