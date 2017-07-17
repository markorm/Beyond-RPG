"use strict"

// Canvas
//const canvas = document.getElementById("canvas");
var audio = true;

// Game Object
var Game = function() {
	var g = this;
	g.sceneId = 8;
	g.player = new Player();
	g.run = function() {
		// Get our Scene
		g.scene = new Scene(g);
		g.scene.run(function(nextScene) {
			// After the first scene we load or create player
			if (g.sceneId == 1) {
				if (g.player.first_name == undefined) {
					g.player.create(function(){
						Overlay.close();
						g.changeScene(nextScene);
					});
				}
			} else {
				g.changeScene(nextScene);
			}
		});
	}
	g.changeScene = function(nextScene) {
		g.sceneId = nextScene;
		g.run();
	}
}

// Overlay Object
var Overlay = {
	content: undefined,
	fadeTime: 500,
	show: function(content) {
		// Check if we have previous content loaded
		if (this.content !== content) {
			this.content = content;
			this.loadContent();
		}
		setTimeout(function(){
			$('#overlay').addClass('active');
		}, 0);
	},
	loadContent: function() {
		var o = this;
		if (!$('#overlay .active').length) {
			$(o.content).fadeIn(o.fadeTime).addClass('active');
		} else {
			$('#overlay .active').fadeOut(o.fadeTime, function(){
				$(o.content).fadeIn(o.fadeTime).addClass('active');
			}).removeClass('active');
		}
	},
	close: function(func) {
		$('#overlay').removeClass('active').find('active').removeClass('active');
		$('#overlay').on(transitionEnd, func);
	}
}

// Game init
var synth = window.speechSynthesis;
function go() {
	// Stop existing speechsynth
	synth.cancel();
	// Launch
	var game = new Game;
	game.run();
}

go();