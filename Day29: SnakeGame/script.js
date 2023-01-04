var game_run = true;
var main = null;
var direction = 0;
var x_w = 500, y_w = 500;
var grid_size = 50;
var grid = x_w/grid_size;
var snake = [];
var candy_location;
var change_dir = [];

function getNewCandy() {
	var x = Math.floor(Math.random()*(grid_size-1))+1;
	var y = Math.floor(Math.random()*(grid_size-1))+1;
	var candy = document.createElement("div");
	candy.className = "candy_block";
	candy.style.left = x*grid+"px";
	candy.style.top = y*grid+"px";
	candy.style.width = grid+"px";
	candy.style.height = grid+"px";
	main.appendChild(candy);
	return [x*grid,y*grid,candy];
}

function gameLoop() {
	for (var i=0; i<snake.length; i++) {
		if (i == 0 && snake[i][1] != direction) {
			snake[i][1] = direction;
			change_dir.push(0);
		}
		snake_direction = snake[i][1];
		if (snake_direction == 0) {
			if (parseInt(snake[i][0].style.top) == 0) {
				snake[i][0].style.top = y_w-grid+"px";
			} else {
				snake[i][0].style.top = parseInt(snake[i][0].style.top)-grid+"px";
			}
		} else if (snake_direction == 1) {
			if (parseInt(snake[i][0].style.left) == x_w-grid) {
				snake[i][0].style.left = 0;
			} else {
				snake[i][0].style.left = parseInt(snake[i][0].style.left)+grid+"px";
			}
		} else if (snake_direction == 2) {
			if (parseInt(snake[i][0].style.top) == y_w-grid) {
				snake[i][0].style.top = 0;
			} else {
				snake[i][0].style.top = parseInt(snake[i][0].style.top)+grid+"px";
			}
		} else if (snake_direction == 3) {
			if (parseInt(snake[i][0].style.left) == 0) {
				snake[i][0].style.left = x_w-grid+"px";
			} else {
				snake[i][0].style.left = parseInt(snake[i][0].style.left)-grid+"px";
			}
		}
	}
	if (parseInt(snake[0][0].style.left) == candy_location[0] && parseInt(snake[0][0].style.top) == candy_location[1]) {
		candy_location[2].remove();
		candy_location = getNewCandy();
		var last_snake = snake[snake.length-1];
		var addToTop = 0,addToLeft = 0;
		if (last_snake[1] == 0) {
			addToTop = 1;
		} else if (last_snake[1] == 1) {
			addToLeft = -1;
		} else if (last_snake[1] == 2) {
			addToTop = -1;
		} else if (last_snake[1] == 3) {
			addToLeft = 1;
		}
		snake.push([createSnakeBlock((parseInt(last_snake[0].style.top)/grid)+addToTop,(parseInt(last_snake[0].style.left)/grid)+addToLeft),last_snake[1]]);
	} else {
		for (var i=1; i<snake.length; i++) {
			if (parseInt(snake[0][0].style.left) == parseInt(snake[i][0].style.left) && parseInt(snake[0][0].style.top) == parseInt(snake[i][0].style.top)) {
				game_run = false;
				alert("Game Over");
			}
		}
	}
	for (var i=0; i<change_dir.length; i++) {
		change_dir[i]++;
		if (change_dir[i] < snake.length) {
			snake[change_dir[i]][1] = snake[change_dir[i]-1][1];
		} else {
			delete change_dir[i];
			change_dir.filter(function(val){return val});
		}
	}
	if (game_run == true) {
		var game_speed = (snake.length < 100 ? 100-snake.length : 10);
		setTimeout(gameLoop,game_speed);
	}
}
function createSnakeBlock(t,l) {
	var t_snake = document.createElement("div");
	t_snake.className = "snake_block";
	t_snake.style.left = l*grid+"px";
	t_snake.style.top = t*grid+"px";
	t_snake.style.width = grid+"px";
	t_snake.style.height = grid+"px";
	main.appendChild(t_snake);
	return t_snake;
}
document.addEventListener('keydown', function (e) {
	var key = e.keyCode;
	if (key == 38) {
		direction = 0;
	} else if (key == 39) {
		direction = 1;
	} else if (key == 40) {
		direction = 2;
	} else if (key == 37) {
		direction = 3;
	}
});
document.addEventListener('DOMContentLoaded', function () {
	main = document.getElementById("main");
	snake.push([createSnakeBlock(2,2),0]);
	snake.push([createSnakeBlock(3,2),0]);
	snake.push([createSnakeBlock(4,2),0]);
	snake.push([createSnakeBlock(5,2),0]);
	snake.push([createSnakeBlock(6,2),0]);
	candy_location = getNewCandy();
	gameLoop();
});