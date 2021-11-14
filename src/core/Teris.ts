import { SquareGroup } from './SquareGroup';
import { Point, Shape } from './types';
import { getRandom } from './utils';

export const TShap: Shape = [
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
];

export const LShape: Shape = [
  { x: -2, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: -1 },
];

export const LMirrorShape: Shape = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 0, y: 1 },
];

export const SShape: Shape = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
];

export const SMirrorShape: Shape = [
  { x: 0, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export const SquareShape: Shape = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export const LineShape: Shape = [
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
];

const shapes = [TShap, LShape, LMirrorShape, SShape, SMirrorShape, SquareShape, LineShape];

const colors = ['red', 'green', '#fff', 'orange'];

export function createTeris(centerPoint: Point) {
  const shape = shapes[getRandom(0, shapes.length)];
  const color = colors[getRandom(0, colors.length)];
  return new SquareGroup(shape, centerPoint, color);
}
