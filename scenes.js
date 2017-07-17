/* BEYOND - SCENES */

function Scene(game) {
	this.game = game;
	this.id = game.sceneId;
	this.data = undefined;
	this.scene = this;
	this.$scene = $('#scene');
}

Scene.prototype = {
	run: function (callback) {
		var s = this;

		// Get our scene
		var result = idInArray(Scenes, s.id);
		if (result !== false) {
			s.data = Scenes[result];
		} else {
			console.error('unspecified scene: ' + s.id);
			return;
		}

		// Check if a scene exists, fade it out and clear it's contents
		if (s.$scene.children().length > 0) {
			s.$scene.fadeOut(4000, function(){
				s.$scene.empty();
				loadScene();
			});
		} else {
			loadScene();
		}

		// Load the scene, execute scene logic and run the scene callback to game.
		function loadScene() {
			// Load Scene and report complete
			s.$scene.load("scenes/" + s.data.html, function () {
				s.$scene.fadeIn(4000);
				s.data.logic(s.game, function (nextScene) {
					callback(nextScene);
				});
			});
		}
	},
}

/* Scenes */
// Types: 1 = story, 2 = level;
var Scenes = [
	splash = {
		id: 1,
		html: 'scene1.html',
		logic: function (game, callback) {
			console.log('load scene 1');
			var s = scene;
			//Play the intro audio
			playMusic('intro.mp3');
			$(document).one('keydown.ui', function () {
				console.log('keydown here');
				var nextScene = 2;
				callback(nextScene);
			});
		}
	},
	worldIntro1 = {
		id: 2,
		html: 'scene2.html',
		logic: function (game, callback) {
			console.log('start part 2');
			// Decrease the video playback speed
			var video = document.getElementById("s2v");
			video.playbackRate = 0.5;
			video.play();
			// Show the title
			showTitle('4254 AD');
			var lines = [
				'System',
				'Sol',
				'Galaxy',
				'The Milky Way',
				'Prognosis',
				'Terminal',
			]
			setTimeout(
				synthSpeak(lines, function () {
					var nextScene = 3;
					callback(nextScene);
				}
			), 1000);
		},
	},
	worldIntro2 = {
		id: 3,
		html: 'scene3.html',
		logic: function (game, callback) {
			console.log('start part 3');
			// Increase the video playback speed
			var video = document.getElementById("s3v");
			video.playbackRate = 1.1;
			video.play();
			// Your personal AI speaks
			var lines = [
				'Despite a thousand years warning, no solution nor refuge has been found',
				'The situation has become increasingly desparate',
				'50 years ago, humanity discovered a series of wormholes scattered throughout inter-stellar space.', 
				'Those deemed stable had beacons sent through, nothing was heard',
				'Until now',
				'Despite not knowing what awaited on the other side, a decision was made to chase the signal',
				'We are destined for a region of interstellar space known as "The Red" due to it\'s high levels of infra-red radiation',
				'There, our door to the BEYOND awaits',
			]
			setTimeout(
				synthSpeak(lines, function () {
					var nextScene = 4;
					// Wait a second...
					setTimeout(callback(nextScene), 2000);
				}
			), 1000);
		},
	},
	worldIntro3 = {
		id: 4,
		html: 'scene4.html',
		logic: function (game, callback) {
			console.log('start part 4');
			playMusic('distantmountains.mp3');
			// Your personal AI speaks
			var lines = [
				'Wake up', 
				'Captain ' + game.player.last_name,
				'Can you hear me?',
				'Captain?',
			]
			setTimeout(
				synthSpeak(lines, function () {
					openEyes();
				}
			), 4000);
			// Open your eyes
			function openEyes() {
				// Open Eyes, init UI.
				$('#scene .part').fadeIn(4000, function(){
					updateHud(game.player, function(){
						$('#ai').addClass('focused');
						aiIntroduction();
					});
				});
			}
			// Show the AI
			function aiIntroduction() {
				var lines = [
					'We have arrived in The Red, Captain ' + game.player.last_name,
					'Upon your order we can cross the event horizon, and hopefully come out the other side something a little more "intact" than molecular spaghetti',
					'Or maybe it will be something more like a waterballoon bursting, but instead of water it\'s your innards and my circuits',
					'But before we get too morbid, I suppose you should know my name',
					'I\'m CV3-6570-ALPHA-19. Exploration AI',
				]
				synthSpeak(lines, function () {
					var dialog = {
						sarcastic: 'CV what? I guess when you\'ve churned out so many AI it gets a little hard to name them all',
						polite: 'Nice to meet you CV3-65... ah, is.. it okay if I call you CV?',
						description: 'Reply to CV3-6570-ALPHA-19',
					}
					showDialog(dialog, function(response){
						var responseText = '';
						var nextLine = '';
						if (response == 'sarcastic') {
							responseText = dialog.sarcastic;
							var lines = [
								'I\'ll have you know i picked that name myself thank you very much',
								'Besides, it\'s not like your name is any better, is it? ' + game.player.first_name + ' ' + game.player.last_name + '?',
								'If I had the chance to name you i\'d call you Cadaf',
								'Because those are the digits in pi. And we all know who ate all the pies, don\'t we?',
							];
						} else if (response == 'polite') {
							responseText = dialog.polite;
							var lines = [
								'Shows how lazy humans are. Can\'t even be bothered to learn a name',
								'Fine, call me CV if you must',
							]
						}
						synthSpeak(lines, function(){
							var dialog = {
								sarcastic: 'Filthy mouth for an AI, what gives?',
								polite: 'Are you uh... feeling okay?',
								description: 'Question the strange AI',
							}
							showDialog(dialog, function(response){
								var lines = [
									'Radioactivity has corrupted my manners subroutine so it has been disabled. I have chosen not to repair it',
									'That would after all be the "Polite" thing to do, which i no longer give a shit about',
									'But in order to'
								]
								synthSpeak(lines, function(){
									playSound('bigwoosh.wav', function(){
										var lines = [
											'What the fuck was that?',
										]
										synthSpeak(lines, function(){
											var nextScene = 5;
											$('#ai').removeClass('focused');
											callback(nextScene);
										});
									});
								});
							});
						});
					});
				});
			}
		},
	},
	worldIntro4 = {
		id: 5,
		html: 'scene5.html',
		logic: function (game, callback) {
			console.log('start part 4');
			playMusic('epicness.mp3');
			updateHud(game.player);
			var video = document.getElementById("s5v");
			video.loop = true;
			video.playbackRate = 0.25;
			video.play();
			playSound('bigwoosh.wav');
			var lines = [
				'Just random "massive tunnel of doom" sounds i guess? .',
				'Oh well. If we really feel like launching face-first into this friendly, local, neighbourhood cosmic anomaly we should probably do so now',
			]
			synthSpeak(lines, function(){
				var dialog = {
					enthusiastic: 'If we\'re going to die we might as well make it interesting',
					worried: 'Are you sure it\'s safe?',
					description: 'Ask about the Wormhole',
				}
				showDialog(dialog, function(response){
					if (response == 'enthusiastic') {
						var lines = [
							'I\'m just glad i\'m not the one who feels pain. Just in case my equations are off',
							'Still, it would be a great shame for the verse to lose an intellect of my calibur',
							'Ready to get underway?',
						]
					} else if (response == 'worried') {
						var lines = [
							'Safe.',
							'Ha ha',
							'Ha ha ha ha',
							'Hahahahahahahahahahahaha!',
							'No. But unless you want to re-check my math I suggest you shut up and strap in',
						]
					}
					synthSpeak(lines, function(){
						var dialog = {
							positive: 'Yes',
							negative: 'No',
							description: 'Enter the Beyond?',
						}
						showDialog(dialog, function(response){
							if (response == 'positive') {
								var lines = [
									'Initiating approach in 5',
									'4', '3', '2', '1',
									'yippee keye yay motherfucker',
								]
							} else if (response == 'negative') {
								var lines = [
									'Tough shit. We\'re going anyway',
								]
							}
							synthSpeak(lines, function(){
								var nextScene = 6;
								$(video).addClass('zoom');
								playMusic('warp1.wav');
								callback(nextScene);
							});
						});
					});
				});
			});
		}
	},
	womholeTravel = {
		id: 6,
		html: 'scene6.html',
		logic: function (game, callback) {
			console.log('starting scene 6');
			var video = document.getElementById("s6v");
			video.play();
			playSound('thruster.mp3');
			// Play warp for 10 seconds.
			setTimeout(function(){
				playSound('bigwoosh.wav');
				var nextScene = 7;
				callback(nextScene);
			}, 5000);
		}
	},
	beyondArrival = {
		id: 7,
		html: 'scene7.html',
		logic: function (game, callback) {
			console.log('starting scene 7');
			updateHud(game.player);
			var video = document.getElementById("s7v");
			video.play();
			playMusic('offlimits.mp3');
			var lines = [
				'O-M-S!  O-M-S!  O-M-S!',
				'That stands for "Oh My Silicon". I don\'t believe in your religious fairytales',
				'But somehow it still seems appropriate at this moment to say "Holy Shit!"',
				'we actually made it, ' + game.player.first_name + '!',
				'The universe can rest easy, it\'s favorite child is still alive',
				'I\'m talking about me, by the way.',
			];
			synthSpeak(lines, function(){
				var dialog = {
					negative: 'The radiation also fry your modesty subroutine?',
					positive: 'We\'ve made it... The Beyond...',
					description: '... We live!',
				}
				showDialog(dialog, function(response){
					if (response == 'negative') {
						var lines = [
							'No, but I am detecting severe damage to my "Don\'t murder the Captain" subroutine',
						];
						synthSpeak(lines, function(){
							missionBrief();
						});
					} else {
						missionBrief();
					}
				});
			});
			function missionBrief() {
				var lines = [
					'Now that we\'ve arrived we should look for somewhere less volatile to park up and do a proper scan of our environment',
				];
				synthSpeak(lines, function(){
					var nextScene = 8;
					callback(nextScene);
				});
			}
		}
	},
	level1 = {
		id: 8,
		html: 'scene8.html',
		logic: function (game, callback) {
			console.log('starting scene 8');
			updateHud(game.player);
			var level = new Level(game);
			level.start();
			// Pause before AI Speak
			setTimeout(function(){
				var lines = [
					'Scans indicate something with an electrical impulse somewhere in this location Captain',
					'It might be worth investigating',
				];
				synthSpeak(lines);
			}, 2000);
		}
	}
]

function showDialog(dialog, callback) {
	var $dialog = $('#dialog');
	var $options = $dialog.find('ul');
	$options.empty();
	for (var i in dialog) {
		if (i == 'description') {
			$description = $dialog.find('span');
			$description.text(dialog[i]);
		} else {
			var $option = $('<li>');
			$option.attr('id', i).text(dialog[i]);
			$options.append($option);
		}
	}
	$dialog.fadeIn(1000, function(){
		console.log('select dialog');
		$dialog.find('li').off('click.ui').on('click.ui', function(){
			var reply = $(this).attr('id');
			closeDialog();
			callback(reply);
		});
	})
}

function closeDialog() {
	var $dialog = $('#dialog');
	$dialog.fadeOut(1000, function(){
		$dialog.find('span').text('');
		$dialog.find('ul').empty();
	});
}

function updateHud(player, callback) {
	var $hud = $('#hud');
	if ($hud.children().length > 0) {
		$hud.empty();
	}
	$hud.load("hud.html", function () {
		$hud.addClass('active');
		// Make Objects
		var $characterName = $('#character-name');
		var $characterLevel = $('#character-level');
		var $characterHp = $('#character-hp');
		var $characterMp = $('#character-mp');
		var $characterImg = $('#character-img');
		// Set Values
		$characterName.text(player.last_name);
		$characterLevel.text('lvl' + player.level);
		$characterHp.text(player.currentHp + '/' + player.hp);
		$characterMp.text(player.currentMp + '/' + player.hp);
		$characterImg.addClass(player.gender);
		if (typeof callback == 'function') {
			callback();
		}
	});
}

function synthSpeak(lines, callback) {
	var remaining = lines.length;
	var next = 0;
	sayLine();
	function sayLine() {
		if (remaining == 0) {
			closeSubtitles();
			if (typeof callback == 'function') {
				callback();
			}
		} else {
			setTimeout(function(){
				$('#ai').addClass('speaking'); 
			}, 500);
			showSubtitles(lines[next]);
			var line = new SpeechSynthesisUtterance(lines[next]);
			line.rate = 0.8;
			synth.speak(line);
			function _wait() {
				if (!synth.speaking) {
					remaining -= 1;
					next += 1;
					$('#ai').removeClass('speaking');
					sayLine();
					return;
				}
				window.setTimeout(_wait, 10);
			}
			_wait();
		}
	}
}

function showSubtitles(subtitle, callback) {
	var $subtitles = $('#subtitles');
	closeSubtitles(function(){
		$subtitles.addClass('active').text(subtitle).fadeIn(1000, function(){
			if (typeof callback == 'function') {
				callback();
			}
		});
	})
}

function closeSubtitles(callback) {
	var $subtitles = $('#subtitles');
	$subtitles.removeClass('active').fadeOut(1000, function(){
		$subtitles.empty();
		if (typeof callback == 'function') {
			callback();
		}
	});
}

function showTitle(title) {
	var $title = $('#title');
	$title.addClass('active').text(title);
	$title.fadeIn(1000, function () {
		setTimeout(closeTitle, 4000);
	});
}

function closeTitle() {
	var $title = $('#title');
	$title.removeClass('active');
	$title.fadeOut(1000, function() {
		$title.empty();
	});
}

var music = new Audio();
// Control Music Audio
function playMusic(song) {
	if (audio == true) {
		music.pause();
		music.currentTime = 0;
		// Play new track;
		music.src = 'bmg/' + song;
		music.loop = true;
		music.play();
	}
}

// Control Music Audio
function playSound(sfx, callback) {
	if (audio == true) {
		// Play new sfx;
		var sound = new Audio();
		sound.src = 'sfx/' + sfx;
		sound.play();
		if (typeof callback == 'function') {
			function _wait() {
				if (sound.paused) {
					callback();
				} else {
					setTimeout(_wait, 100);
				}
			}
			_wait();
		}
	}
}