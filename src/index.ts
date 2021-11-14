import { Square } from './core/Square';
import { SquarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery';
import { SquareGroup } from './core/SquareGroup';
import { createTeris, LShape, SquareShape } from './core/Teris';
import { TerisRules } from './core/TerisRules';
import { Direction } from './core/types';

const teris = createTeris({ x: 2, y: 4 });

teris.squares.forEach((sq) => {
  sq.viewer = new SquarePageViewer(sq, $('#root'));
});

$('.down').on('click', () => {
  TerisRules.move(teris, Direction.down);
});

$('.left').on('click', () => {
  TerisRules.move(teris, Direction.left);
});

$('.right').on('click', () => {
  TerisRules.move(teris, Direction.right);
});
