import { Square } from './core/Square';
import { SquarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery';

const sq = new Square();

sq.viewer = new SquarePageViewer(sq, $('#root'));

sq.color = 'green';
sq.point = { x: 1, y: 1 };

// setInterval(() => {
//   sq.point = {
//     x: sq.point.x,
//     y: sq.point.y + 1,
//   };
// }, 1000);

$('.down').on('click', () => {
  sq.point = {
    x: sq.point.x,
    y: sq.point.y + 1,
  };
});

$('.remove').on("click", ()=>{
  sq.viewer?.remove()
})
$('.add').on("click", ()=>{
  sq.viewer = new SquarePageViewer(sq, $('#root'))
})