import { SquareGroup } from './SquareGroup';
import { Point, Shape } from './types';
import { getRandom } from './utils';

export class TShap extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
}
export class LShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: -2, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
}

export class LMirrorShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }
}

export class SShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }
  rotate() {
    super.rotate();
    this.isClock = !this.isClock;
  }
}

export class SMirrorShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }
  rotate() {
    super.rotate();
    this.isClock = !this.isClock;
  }
}
export class SquareShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }
  afterRotateShape() {
    return this.shape;
  }
}

export class LineShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      _centerPoint,
      _color
    );
  }
  rotate() {
    super.rotate();
    this.isClock = !this.isClock;
  }
}

const shapes = [TShap, LShape, LMirrorShape, SShape, SMirrorShape, SquareShape, LineShape];

const colors = ['red', 'green', '#fff', 'orange'];

export function createTeris(centerPoint: Point) {
  const shape = shapes[getRandom(0, shapes.length)];
  const color = colors[getRandom(0, colors.length)];
  return new shape(centerPoint, color);
}
