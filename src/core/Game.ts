import GameConfig from './GameConfig';
import { Square } from './Square';
import { SquareGroup } from './SquareGroup';
import { createTeris } from './Teris';
import { TerisRules } from './TerisRules';
import { Direction, GameStatus, GameViewer } from './types';

export class Game {
  // 游戏状态
  private _gameStatus: GameStatus = GameStatus.init;
  // 当前玩家操作的方块
  private _curTeris?: SquareGroup;
  private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
  private _timer?: number;
  private _duration;
  private _exists: Square[] = [];
  private _score: number = 0;

  constructor(private _viewer: GameViewer) {
    this._duration = GameConfig.levels[0].duration;
    this.createNext();
    this._viewer.init(this);
    this._viewer.showScore(this.score);
  }

  private createNext() {
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
  }

  public get score(){
    return this._score;
  }

  public set score(val){
    this._score = val;
    this._viewer.showScore(val);
    const level = GameConfig.levels.filter(it=>it.score <= val ).pop()!
    console.log(level)
    if(level.duration === this._duration){
      return
    }
    if(this._timer){
      this._timer= undefined;
      clearInterval(this._timer)
      this._duration = level.duration;
      this.autoDrop()
    }

  }

  public get gameStatus(){
    return this._gameStatus;
  }

  private init() {
    this._exists.forEach((sq) => {
      sq.viewer?.remove();
    });
    this._exists = [];

    this.createNext();
    this._curTeris = undefined;
    this.score = 0;
  }

  start() {
    if (this._gameStatus === GameStatus.playing) {
      return;
    }
    if (this._gameStatus === GameStatus.over) {
      this.init();
    }
    this._gameStatus = GameStatus.playing;
    if (!this._curTeris) {
      this.switchTeris();
    }
    this.autoDrop();
    this._viewer.onGameStart();
  }

  pause() {
    if (this._gameStatus === GameStatus.playing) {
      this._gameStatus = GameStatus.pause;
      clearInterval(this._timer);
      this._timer = undefined;
      this._viewer.onGamePause();
    }
  }

  control_left() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRules.move(this._curTeris, Direction.left, this._exists);
    }
  }

  control_right() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRules.move(this._curTeris, Direction.right, this._exists);
    }
  }

  control_down() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRules.moveDirectly(this._curTeris, Direction.down, this._exists);
      this.hitBottom();
    }
  }

  control_rotate() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRules.rotate(this._curTeris, this._exists);
    }
  }

  private switchTeris() {
    this._curTeris = this._nextTeris;
    this._curTeris.squares.forEach((sq) => {
      sq.viewer?.remove();
    });
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTeris);

    if (!TerisRules.canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)) {
      this._gameStatus = GameStatus.over;
      clearInterval(this._timer);
      this._timer = undefined;
      this._viewer.onGameOver();
      return;
    }
    this.createNext();
    this._viewer.switch(this._curTeris);
  }

  /**
   * 方块自由下落
   */
  private autoDrop() {
    if (this._timer) {
      return;
    }
    this._timer = setInterval(() => {
      if (this._curTeris) {
        if (!TerisRules.move(this._curTeris, Direction.down, this._exists)) {
          this.hitBottom();
        }
      }
    }, this._duration);
  }

  private resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1;
    const y = 0;
    teris.centerPoint = { x, y };
    while (teris.squares.some((it) => it.point.y < 0)) {
      teris.centerPoint = {
        x: teris.centerPoint.x,
        y: teris.centerPoint.y + 1,
      };
    }
  }

  /**
   * 触底之后的操作
   */
  private hitBottom() {
    this._exists.push(...this._curTeris!.squares);
    const num = TerisRules.deleteSquares(this._exists);
    this.addScore(num);
    this.switchTeris();
  }

  private addScore(lineNumber: number) {
    switch (lineNumber) {
      case 1:
        this.score += 1;
        break;
      case 2:
        this.score += 3;
        break;
      case 3:
        this.score += 5;
        break;
      case 4:
        this.score += 10;
        break;

      default:
        break;
    }

  }
}
