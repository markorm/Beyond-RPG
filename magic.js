// String Title Case Method
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

var transitionEnd = "transitionend.ui webkitTransitionEnd.ui oTransitionEnd.ui MSTransitionEnd.ui";

function validateField(field) {
	if (!field.value.length) {
		return "This is a required field";
	}
	switch (field.type) {
		case "text":
			if (!field.value.match(/[a-z]/i)) {
				return "Not a valid string";
			}
			break;
		case "number":
			if (!parseInt(field.value) || field.value.includes('.')) {
				return "Not a valid int";
			}
			break;
		default:
			console.error('Field does not match specified type');
	}
	return true;
}

// Check value in array
function idInArray(array, value) {
	var match = false;
	array.forEach(function(e, i) {
		if (e.id == value) {
			match = i;
		}
	});
	if (match !== false) {return match}
	else {return false}
}
