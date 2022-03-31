import images from '../image-data/images.js';
import Game from './game.js';
import startPage from '../../app.js';
import helpers from './helpers.js';
import Quiz from './quiz.js';
import QuizResult from './quizResults.js';

export default class PaintersPage {
  constructor(root) {
    this.root = root;
    this.type = 'guessAuthor';
    this.countGameQuest = 10;
  }

  render() {
    if (helpers.getSettings().sound.status) {
      helpers.sound.swipe();
    }
    this.root.innerHTML = `
      <button class="button-home"></button>
      <div class="painters-caption">
        <span>Угадываем авторов</span>
      </div>
      <div class="game__results-popup"></div>`;

    this.renderCategories();
    this.addListeners();
  }

  renderCategories() {
    const stat = helpers.getStat();
    const countOfGames = Math.ceil(images.length / this.countGameQuest);

    for (let i = 1; i <= countOfGames; i++) {
      const game = new Game('guessAuthor', i);
      game.render(this.root, stat);
    }
  }

  addListeners() {
    const buttonHome = document.querySelector('.button-home');
    buttonHome.addEventListener('click', () => {
      startPage.render(this.root);
    });

    const games = document.querySelectorAll('.painters-game');

    //add to all cards click-listeners >>> than render quiz
    games.forEach((game) => {
      game.addEventListener('click', () => {
        const gameId = game.dataset.id;
        const questions = helpers.getQuestWithID(gameId);
        const newQuiz = new Quiz(this.root, questions, this.type, gameId);
        newQuiz.render();
      });
    });

    //add listeners for show results finished quizes
    const popUpResult = new QuizResult(this.root, this.type);
    popUpResult.showGameResult();
  }
}
