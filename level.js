var keyState = {};    
window.addEventListener('keydown',function(e){
	keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
	keyState[e.keyCode || e.which] = false;
},true);

var Level = function (game) {
	var level = this;
	level.game = game;
	level.canvas = document.getElementById('world');
	level.ctx = level.canvas.getContext('2d');
	level.canvas.height = window.innerHeight;
	level.canvas.width = window.innerWidth;
	level.ship = new Ship(level.canvas);
	level.start = function() {
		var frameRate = 60;
		$('#world').addClass('active');
		setInterval(function() {
			// Check key input state at start of frame and execute
			level.keybinds();
			level.ctx.clearRect(0, 0, level.canvas.width, level.canvas.height);
			// Draw
			level.ship.render(level.ctx);
		}, 1000/frameRate);
	}
	level.keybinds = function() {
		// SHIP ON/OFF!
		if (keyState[38]) {
			level.ship.x += level.ship.s.forward * Math.cos(level.ship.r.angle * Math.PI / 180);
			level.ship.y += level.ship.s.forward * Math.sin(level.ship.r.angle * Math.PI / 180);
			level.ship.on();
		} else if (keyState[40]) {
			level.ship.x -= level.ship.s.reverse * Math.cos(level.ship.r.angle * Math.PI / 180);
			level.ship.y -= level.ship.s.reverse * Math.sin(level.ship.r.angle * Math.PI / 180);
			level.ship.on();
		} else {
			level.ship.off();
		}
		// SHIP TURN!
		if (keyState[37]) {
			level.ship.r.angle -= level.ship.r.rate;
		} else if (keyState[39]) {
			level.ship.r.angle += level.ship.r.rate;
		}
	}
}

// Player Ship
function Ship(canvas) {
	var ship = this;
	ship.h = 125;
	ship.w = 80;
	ship.x = (canvas.width / 2) - (ship.w / 2);
	ship.y = (canvas.height / 2) - (ship.h / 2);
	ship.r = {
		angle: -90,
		rate: 4,
	};
	ship.s = {
		forward: 15,
		reverse: 2,
		boost: 40,
	};
	ship.on = function(){
		ship.img = 'shipthrust.png';
	};
	ship.off = function(){
		ship.img = 'ship.png';
	},
	ship.render = function(ctx) {
		// Setup
		var img = new Image();
		img.src = 'img/' + ship.img;
		// Go
		ctx.save();
		ctx.translate(ship.x + ship.w/2, ship.y + ship.h/2);
    	ctx.rotate((ship.r.angle + 90) * Math.PI/180);
		ctx.translate(-ship.w/2, -ship.h/2);
		ctx.drawImage(img, 0, 0, ship.w, ship.h);
		ctx.restore();
	}
}