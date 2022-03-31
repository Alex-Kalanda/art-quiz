import helpers from './helpers.js';
import PaintersPage from './painters-page.js';
import PaintingsPage from './paintings-page.js';
import SettingsPage from './settings-page.js';

const COUNT_OF_PIC = 240;
//amount pictures in folder 'image-data/full'
const root = document.querySelector('#root');
export const painters = new PaintersPage(root);
export const paintings = new PaintingsPage(root);
export const settings = new SettingsPage(root);

export class MainPage {
  constructor(root) {
    this.root = root;
  }

  render() {
    this.root.innerHTML = `
    <div class="main-caption-wrapper">
        <h1 class="main-caption">ART QUIZ</h1>
    </div>
    
    <img class="root-background" src="assets/background/abstract-fon.png" alt="fon">

    <div class="main-navigation-wrapper">
        <div id="main-painters" class="main__button">
            <img src="assets/svg-img/author.svg" alt="choose-author">
            <span>Угадай художника</span>
        </div>
        <div id="main-paintings" class="main__button">
            <img src="assets/svg-img/painting.svg" alt="choose-picture">
            <span>Угадай картину</span>
        </div>
        <div id="main-settings" class="main__button">
            <img src="assets/icons/gears.svg" alt="settings">
            <span>Настройки игры</span>
        </div>
    </div>

    <div class="main-img-wrapper">
        <img src="image-data/img/${helpers.getRandom(0, COUNT_OF_PIC)}.jpg" alt="picture">
    </div>`;

    this.addListeners();
  }

  addListeners() {
    const toPainters = document.querySelector('#main-painters');
    const toPaintings = document.querySelector('#main-paintings');
    const toSettings = document.querySelector('#main-settings');

    toPainters.addEventListener('click', () => {
      painters.render();
    });
    toPaintings.addEventListener('click', () => {
      paintings.render();
    });
    toSettings.addEventListener('click', () => {
      settings.render();
    });

    //start background music, if it turned on
    this.root.addEventListener('click', () => {
      if (helpers.getSettings().music.status) {
        helpers.music('on');
      }
    });
  }
}
