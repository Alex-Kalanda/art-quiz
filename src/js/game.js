export default class Game {
  constructor(type, id) {
    this.type = type;
    this.id = id;
  }

  render(root, stat) {
    let addClass;
    let chapter;

    switch (this.type) {
      case 'guessAuthor':
        addClass = 'painters-game';
        chapter = 'painters';
        break;
      case 'guessPicture':
        addClass = 'paintings-game';
        chapter = 'paintings';
        break;
    }

    const game = document.createElement('div');
    const { isVisited } = stat[chapter][this.id];

    game.classList.add(addClass);
    game.classList.add(isVisited ? 'color' : 'monochrome');
    game.dataset.id = this.id;
    game.innerHTML = `
      <span>Игра ${this.id}</span>
      <span class="game-result">${isVisited ? stat[chapter][this.id].rightAns + '/10' : ''}</span>
      <span class="game-visited">${isVisited ? 'Пройдена' : ''}</span>
      <span class="game-link-to-result">${isVisited ? 'результаты' : ''}</span>`;

    root.appendChild(game);

    setTimeout(() => {
      game.classList.add('show');
    }, 200);
  }
}
