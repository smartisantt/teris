import { Square } from './core/Square';
import { SquarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery';
import { SquareGroup } from './core/SquareGroup';

const group = new SquareGroup(
  [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 0 },
  ],
  { x: 5, y: 5 },
  'red'
);

group.squares.forEach((sq) => {
  sq.viewer = new SquarePageViewer(sq, $('#root'));
});

$('.down').on('click', () => {
  group.centerPoint = {
    x: group.centerPoint.x,
    y: group.centerPoint.y + 1,
  };
});

$('.up').on('click', () => {
  group.centerPoint = {
    x: group.centerPoint.x,
    y: group.centerPoint.y - 1,
  };
});

$('.left').on('click', () => {
  group.centerPoint = {
    x: group.centerPoint.x - 1,
    y: group.centerPoint.y ,
  };
});

$('.right').on('click', () => {
  group.centerPoint = {
    x: group.centerPoint.x + 1,
    y: group.centerPoint.y ,
  };
});
