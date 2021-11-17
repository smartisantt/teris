import GameConfig from './GameConfig';
import { Square } from './Square';
import { SquareGroup } from './SquareGroup';
import { Direction, Point, Shape } from './types';

function isPoint(obj: any): obj is Point {
  if (typeof obj.x === 'undefined') {
    return false;
  }
  return true;
}

export class TerisRules {
  static canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean {
    const targetSquarePoints: Point[] = shape.map((it) => {
      return {
        x: it.x + targetPoint.x,
        y: it.y + targetPoint.y,
      };
    });

    let res = targetSquarePoints.some((p) => {
      return p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1;
    });

    if (res) {
      return false;
    }

    res = targetSquarePoints.some((p) => exists.some((sq) => sq.point.x === p.x && sq.point.y === p.y));
    if (res) {
      return false;
    }

    return true;
  }

  static move(teris: SquareGroup, targetOrDirection: Point, exists: Square[]): boolean;
  static move(teris: SquareGroup, targetOrDirection: Direction, exists: Square[]): boolean;
  static move(teris: SquareGroup, targetOrDirection: Point | Direction, exists: Square[]): boolean {
    if (isPoint(targetOrDirection)) {
      if (TerisRules.canIMove(teris.shape, targetOrDirection, exists)) {
        teris.centerPoint = targetOrDirection;
        return true;
      }
      return false;
    } else {
      const direction = targetOrDirection;
      let targetPoint;
      switch (direction) {
        case Direction.down:
          targetPoint = {
            x: teris.centerPoint.x,
            y: teris.centerPoint.y + 1,
          };
          break;
        case Direction.left:
          targetPoint = {
            x: teris.centerPoint.x - 1,
            y: teris.centerPoint.y,
          };
          break;
        case Direction.right:
          targetPoint = {
            x: teris.centerPoint.x + 1,
            y: teris.centerPoint.y,
          };
          break;
        default:
          targetPoint = {
            x: teris.centerPoint.x,
            y: teris.centerPoint.y,
          };
          break;
      }

      return this.move(teris, targetPoint, exists);
    }
  }

  static moveDirectly(teris: SquareGroup, direction: Direction, exists: Square[]) {
    while (this.move(teris, direction, exists)) {}
  }

  static rotate(teris: SquareGroup, exists: Square[]): boolean {
    const newShape = teris.afterRotateShape();
    if (this.canIMove(newShape, teris.centerPoint, exists)) {
      teris.rotate();
      return true;
    }
    return false;
  }

  /**
   * 当前y坐标的方块
   * @param exists
   * @param y
   */
  private static getLineSquares(exists: Square[], y: number) {
    return exists.filter((sq) => sq.point.y === y);
  }

  static deleteSquares(exists: Square[]): number {
    const ys = exists.map((sq) => sq.point.y);
    const maxY = Math.max(...ys);
    const minY = Math.min(...ys);
    let num = 0;
    for (let y = minY; y <= maxY; y++) {
      if (this.deleteLine(exists, y)) {
        num++;
      }
    }
    return num;
  }

  private static deleteLine(exists: Square[], y: number): boolean {
    const squares = this.getLineSquares(exists, y);

    if (squares.length === GameConfig.panelSize.width) {
      squares.forEach((sq) => {
        sq.viewer?.remove();
        exists
          .filter((sq) => sq.point.y < y)
          .forEach(
            (sq) =>
              (sq.point = {
                x: sq.point.x,
                y: sq.point.y + 1,
              })
          );
        const index = exists.indexOf(sq);
        exists.splice(index, 1);
      });

      return true;
    }
    return false;
  }
}
