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
  private _duration: number = 1000;
  private _exists: Square[] = [];

  constructor(private _viewer: GameViewer) {
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
  }

  start() {
    if (this._gameStatus === GameStatus.playing) {
      return;
    }
    this._gameStatus = GameStatus.playing;
    if (!this._curTeris) {
      this.switchTeris();
    }
    this.autoDrop();
  }

  pause() {
    if (this._gameStatus === GameStatus.playing) {
      this._gameStatus = GameStatus.pause;
      clearInterval(this._timer);
      this._timer = undefined;
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
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTeris);
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.switch(this._curTeris);
    this._viewer.showNext(this._nextTeris);
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
      teris.squares.forEach(
        (sq) =>
          (sq.point = {
            x: sq.point.x,
            y: sq.point.y + 1,
          })
      );
    }
  }

  /**
   * 触底之后的操作
   */
  private hitBottom() {
    this._exists.push(...this._curTeris!.squares);
    this.switchTeris();
  }
}