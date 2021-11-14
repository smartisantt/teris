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
    this.setSquarePoints();
  }

  private setSquarePoints() {
    this._shape.forEach((p, i) => {
      this._squares[i].point = {
        x: p.x + this._centerPoint.x,
        y: p.y + this._centerPoint.y,
      };
    });
  }

  public get shape() {
    return this._shape;
  }

  constructor(private _shape: Shape, private _centerPoint: Point, private _color: string) {
    this._squares = [];
    const arr: Square[] = [];
    this._shape.forEach((p) => {
      const sq = new Square();
      sq.color = this._color;
      arr.push(sq);
    });

    this._squares = arr;
    this.setSquarePoints();
  }

  protected isClock = true;

  afterRotateShape(): Shape {
    if (this.isClock) {
      return this._shape.map((p) => {
        const newPoint: Point = {
          x: -p.y,
          y: p.x,
        };
        return newPoint;
      });
    }
    return this._shape.map((p) => {
      return {
        x: p.y,
        y: -p.x,
      };
    });
  }

  rotate() {
    const newShape = this.afterRotateShape();
    this._shape = newShape;
    this.setSquarePoints();
  }
}
