import { Square } from './Square';
import { Point, Shape } from './types';

export class SquareGroup {
  private _squares: readonly Square[] = [];

  public get squares() {
    return this._squares;
  }

  public get centerPoint(): Point {
    return this._centerPoint;
  }

  public set centerPoint(v: Point) {
    this._centerPoint = v; 

    this._shape.forEach((p, i) => {
      this._squares[i].point = {
        x: p.x + this._centerPoint.x,
        y: p.y + this._centerPoint.y,
      };
    });
  }

  constructor(private _shape: Shape, private _centerPoint: Point, private _color: string) {
    this._squares = [];
    const arr: Square[] = [];
    this._shape.forEach((p) => {
      const sq = new Square();
      sq.color = this._color;
      sq.point = {
        x: p.x + this._centerPoint.x,
        y: p.y + this._centerPoint.y,
      };
      arr.push(sq);
    });

    this._squares = arr;
  }
}
