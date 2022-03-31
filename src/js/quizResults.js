import helpers from './helpers.js';

export default class QuizResult {
  constructor(root, type) {
    this.root = root;
    this.type = type;
  }

  showGameResult() {
    const toResults = document.querySelectorAll('.game-link-to-result');
    const popUpRes = document.querySelector('.game__results-popup');

    let typeClass, key;
    if (this.type === 'guessAuthor') {
      key = 'painters';
      typeClass = '.painters-game';
    }
    if (this.type === 'guessPicture') {
      typeClass = '.paintings-game';
      key = 'paintings';
    }

    toResults.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.stopPropagation();
        const stat = helpers.getStat();
        const gameId = event.target.closest(`${typeClass}`).dataset.id;
        const questions = helpers.getQuestWithID(gameId);
        const gameRes = stat[key][gameId].ans;

        popUpRes.innerHTML = '<div class="quiz__final__caption">Ваш результат:</div>';

        gameRes.forEach((item, index) => {
          let author = questions[index].author,
            picName = questions[index].name,
            picNum = questions[index].imageNum;

          const elem = document.createElement('div');
          elem.classList.add('quiz__final-item');
          elem.innerHTML = `
            <div class="quiz__final__img">
              <img  style="filter: grayscale(${gameRes[index] ? '0' : '100%'})"
                    src="image-data/img/${picNum}.jpg" alt="miniPic">
            </div>
            <span class="quiz__final__desc">${author}<br>"${picName}"</span>
            <span class="quiz__final__symbol">${gameRes[index] ? '✓' : '⊘'}</span>`;

          elem.style.color = gameRes[index] ? 'green' : '#000000';
          elem.dataset.pos = `${index}`;

          popUpRes.appendChild(elem);
        });
        popUpRes.innerHTML += `<button id="popUp-exit" class="right-answer__button">Выход</button>
                               <div class="painting__description"></div>`;

        popUpRes.style.right = '0';

        //hide results table
        document.querySelector('#popUp-exit').addEventListener('click', () => {
          popUpRes.style.right = '-150%';
        });

        //mini-pic click-handler (show detailed info about paintings)
        this.showDetails(popUpRes, questions, gameRes);
      });
    });
  }

  showDetails = (popUpRes, questions, gameRes) => {
    popUpRes.addEventListener(
      'click',
      (event) => {
        const targetEl = event.target.closest('.quiz__final-item');

        if (targetEl) {
          let pos = targetEl.dataset.pos;

          let author = questions[pos].author,
            picName = questions[pos].name,
            year = questions[pos].year,
            questNum = +pos + 1,
            picNum = questions[pos].imageNum;

          const paintingDescription = document.querySelector('.painting__description');

          paintingDescription.innerHTML = `
             <div class="description-caption">
               <div class="description-caption__icon">
                   <img src="assets/icons/${gameRes[pos] ? '' : 'in'}correct-answer.png" alt="answer">
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
  };
}
