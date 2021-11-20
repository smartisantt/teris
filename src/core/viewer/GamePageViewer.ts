import { SquareGroup } from '../SquareGroup';
import { GameStatus, GameViewer } from '../types';
import { SquarePageViewer } from './SquarePageViewer';
import $ from 'jquery';
import { Game } from '../Game';
import GameConfig from '../GameConfig';
import PageConfig from './PageConfig';

export class GamePageViewer implements GameViewer {
  onGamePause(): void {
    this.msgDom.css({
      display: 'flex',
    });
    this.msgDom.find('p').html('游戏暂停');
  }
  onGameStart(): void {
    this.msgDom.hide();
  }
  onGameOver(): void {
    this.msgDom.css({
      display: 'flex',
    });
    this.msgDom.find('p').html('游戏结束');
  }
  private nextDom = $('#next');
  private panelDom = $('#panel');
  private scoreDom = $('#score');
  private msgDom = $('#msg');

  init(game: Game): void {
    //  设置宽高
    this.panelDom.css({
      width: GameConfig.panelSize.width * PageConfig.SquareSize.width,
      height: GameConfig.panelSize.height * PageConfig.SquareSize.height,
    });

    this.nextDom.css({
      width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
      height: GameConfig.nextSize.height * PageConfig.SquareSize.height,
    });

    // 注册键盘事件
    $(document).on('keydown', (e) => {
      switch (e.code) {
        case 'Space':
          if (game.gameStatus === GameStatus.playing) {
            game.pause();
          } else {
            game.start();
          }
          break;
        case 'ArrowDown':
          game.control_down();
          break;
        case 'ArrowUp':
          game.control_rotate();
          break;
        case 'ArrowLeft':
          game.control_left();
          break;
        case 'ArrowRight':
          game.control_right();
          break;

        default:
          break;
      }
    });
  }

  showScore(score: number): void {
    this.scoreDom.html(score.toString());
  }

  showNext(teris: SquareGroup): void {
    teris.squares.forEach((sq) => {
      sq.viewer = new SquarePageViewer(sq, this.nextDom);
    });
  }
  switch(teris: SquareGroup): void {
    teris.squares.forEach((sq) => {
      sq.viewer!.remove();
      sq.viewer = new SquarePageViewer(sq, this.panelDom);
    });
  }
}
