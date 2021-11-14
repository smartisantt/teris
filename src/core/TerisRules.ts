import GameConfig from './GameConfig';
import { SquareGroup } from './SquareGroup';
import { Direction, Point, Shape } from './types';

function isPoint(obj: any): obj is Point {
  if (typeof obj.x === 'undefined') {
    return false;
  }
  return true;
}

export class TerisRules {
  static canIMove(shape: Shape, targetPoint: Point): boolean {
    const targetSquarePoints: Point[] = shape.map((it) => {
      return {
        x: it.x + targetPoint.x,
        y: it.y + targetPoint.y,
      };
    });

    const res = targetSquarePoints.some((p) => {
      return p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1;
    });

    if (res) {
      return false;
    }
    return true;
  }

  static move(teris: SquareGroup, targetOrDirection: Point): boolean;
  static move(teris: SquareGroup, targetOrDirection: Direction): boolean;
  static move(teris: SquareGroup, targetOrDirection: Point | Direction): boolean {
      console.log('lll')
    if (isPoint(targetOrDirection)) {
      if (TerisRules.canIMove(teris.shape, targetOrDirection)) {
        teris.centerPoint = targetOrDirection;
        return true;
      }
      return false;
    } else {
      const direction = targetOrDirection;
      let targetPoint;
      console.log('down')
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

      return this.move(teris, targetPoint);
    }
  }
}
