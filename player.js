
// Player Object
var Player = function() {
	this.level = 1;
	this.hp = 100;
	this.currentHp = this.hp;
	this.mp = 100;
	this.currentMp = this.mp;
	this.gender = undefined;
	this.exp = {
		total: 0,
		current: 0,
	}
}

Player.prototype = {

	// Create a new player character
	create: function(callback) {
		// Setup
		var player = this;
		Overlay.show("#create-character");
		var $characterCreator = $('#create-character');
		var values = [];
		// Select Gender
		var $gender = $('#char-gender');
		$gender.find('.gender-selection').off('click.ui').on('click.ui', function() {
			$(this).addClass('selected');
			$characterCreator.addClass('selected');
			values['gender'] = $(this).attr('data-gender');
			characterWizard();
		});
		// Get Character Details
		var step = 1;
		var steps = 2;
		function characterWizard() {
			// Completion Case
			if (step > steps) {
				player.save(values);
				callback();
				return;
			} 
			// Setup and Elements
			var $step = $('#create-character .step' + step);
			var $next = $step.find('.step-next');
			var $back = $step.find('.step-back');
			$step.siblings().fadeOut(500).promise().done(function(){
				$next.removeClass('disabled');
				$step.fadeIn(500);
			});
			// Confirmation Case
			if (step == steps) {
				var $list = $characterCreator.find('.confirmation ul').empty();
				for (i in values) {
					var property = i.replace("_", " ").toProperCase();
					var value = values[i].replace("_", " ").toProperCase();
					var $listItem = '<li>'
						+ '<span class="property">' + property + '</span>'
						+ '<span class="value">' + value + '</span>'
						+ '</li>';
						$list.append($listItem);
				}
			}
			// Goto Previous Step
			$back.off('click.ui').on('click.ui', function(){
				if (step == 1) {
					$characterCreator.removeClass('selected').find('.selected').removeClass('selected');
				} else {
					step -= 1;
					characterWizard();
				}
			});
			// Goto Next Step
			var hasError = false;
			$next.off('click.ui').on('click.ui', function(){
				// Check Errors
				$step.find('input').each(function(){
					var field = {
						id: $(this).attr('id'),
						type : $(this).attr('type'),
						value : $(this).val(),
					}
					var result = validateField(field);
					if (result != true) {
						$(this).val('').parent().addClass('error').find(".error-message").text(result);
						hasError = true;
					} else {
						var index = idInArray(values, field.id);
						if (index !== false) {
							values[field.id] = field.value;
						}
						values[field.id] = field.value;
					}
				});
				// Check the result
				if (hasError == true) {
					// Bind event to clear errors
					$step.find('fieldset.error').on('focusin', function(){
						$(this).removeClass('error');
						hasError = false;
					});
				} else {
					step++;
					$next.addClass('disabled');
					characterWizard();
				}
			});
		}
	},

	// Save our chatacter
	save: function(values) {
		console.log(values);
		this.first_name = values.first_name;
		this.last_name = values.last_name;
		this.age = values.age;
		this.gender = values.gender;
		this.division = values.division;
	}
}
