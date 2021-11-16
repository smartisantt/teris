import { Game } from './core/Game';
import { GamePageViewer } from './core/viewer/GamePageViewer';
import $ from 'jquery'

const game = new Game(new GamePageViewer());

game.start();


$(".pause").on('click', function(){
    game.pause()
})


$(".start").on('click', function(){
    game.start()
})


$(".left").on('click', function(){
    game.control_left()
})

$(".right").on('click', function(){
    game.control_right()
})

$(".down").on("click", function(){
    game.control_down()
})

$(".rotate").on("click", function(){
    game.control_rotate()
})