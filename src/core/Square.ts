import { IViewer, Point } from './types';

export class Square {
  private _iviewer?: IViewer;
  private _point: Point = { x: 0, y: 0 };
  private _color: string = 'red';

  public get viewer() {
    return this._iviewer;
  }

  public set viewer(val) {
    this._iviewer = val;
    if (val) {
      this._iviewer?.show();
    }
  }

  public get point() {
    return this._point;
  }

  public set point(value: Point) {
    this._point = value;
    if (this._iviewer) {
      this._iviewer.show();
    }
  }

  public get color() {
    return this._color;
  }

  public set color(val) {
    this._color = val;
  }
}
