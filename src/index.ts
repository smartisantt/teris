import { Square } from './core/Square';
import { SquarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery';
import { SquareGroup } from './core/SquareGroup';
import { createTeris, LShape, SquareShape } from './core/Teris';

const group = createTeris({ x: 2, y: 4 });

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
    y: group.centerPoint.y,
  };
});

$('.right').on('click', () => {
  group.centerPoint = {
    x: group.centerPoint.x + 1,
    y: group.centerPoint.y,
  };
});
