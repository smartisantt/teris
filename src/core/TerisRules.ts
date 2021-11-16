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
      console.log('down');
      switch (direction) {
        case Direction.down:
          console.log('down');
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
}
