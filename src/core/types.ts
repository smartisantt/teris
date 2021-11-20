import { Game } from './Game';
import { SquareGroup } from './SquareGroup';

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface IViewer {
  show(): void;
  remove(): void;
}

export type Shape = Point[];

export enum Direction {
  left,
  right,
  down,
}

export enum GameStatus {
  init,
  playing,
  pause,
  over,
}

export interface GameViewer {
  showNext(teris: SquareGroup): void;
  switch(teris: SquareGroup): void;
  init(game:Game):void;
  showScore(score:number):void;
  onGamePause():void;
  onGameStart():void;
  onGameOver():void;
}
