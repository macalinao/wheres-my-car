// var home = {lat: 32.78108, lon: -96.79099};
var home = {lat: 33.21219, lon: -97.15112};

var RAD = Math.PI / 180;
var DEG = 180 / Math.PI;

document.addEventListener('deviceready', function() {
	var canvas = oCanvas.create({ 
	    canvas: "#canvas", 
	    background: "#FFFFFF", 
	    fps: 60
	});

	var eCanvas = document.getElementById('canvas');
	if (eCanvas.getContext) {
		canvas.width = $(document).width();
		canvas.height = $(document).height();
	}

	var arrow = canvas.display.polygon({
		x: canvas.width/2,
		y: canvas.height/2 - 100,
		origin: {x: "center", y: "center"},
		sides: 3,
		radius: canvas.height/4,
		rotation: 270,
		fill: "#DEDEDE",
		clickable_value: 0
	});
	var innerArrow = canvas.display.polygon({
		x: arrow.radius/2,
		y: 0,
		origin: {x: 0, y:0},
		sides: 3,
		radius: arrow.radius/2,
		rotation: 0,
		fill: "#5CD65C",
		zIndex: "front",
		clickable_value: 0
	});
	$('#distance').css("top", canvas.height-arrow.x/5);


	canvas.addChild(arrow);
	arrow.addChild(innerArrow);

	function rotate(rot){
		arrow.animate({
			rotation: rot
		}, {
			duration: 0,
			easing: "ease-in-out-cubic"
		});
		innerArrow.animate({
			rotation: arrow.rotation - 270
		}, {
			duration: 0,
			easing: "ease-in-out-cubic"
		});
	} 

	function distAndBear(p1, p2) {
		// Distance
		var R = 6371; // km of radius of earth
		var dLat = (p2.lat - p1.lat) * RAD;
		var dLon = (p2.lon - p1.lon) * RAD;
		var lat1 = p1.lat * RAD;
		var lat2 = p2.lat * RAD;

		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
		var d = R * c;

		// Bearing
		var y = Math.sin(dLon) * Math.cos(lat2);
		var x = Math.cos(lat1) * Math.sin(lat2) -
		        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
		var b = Math.atan2(y, x) * DEG;

		return {
			distance: d, // Km
			bearing: b // Deg
		};
	}

	function updatePos() {
		navigator.geolocation.getCurrentPosition(function(pos) {
			var dab = distAndBear({lat: pos.coords.latitude, lon: pos.coords.longitude}, home);

			var dist = dab.distance * 1000;
			var feet = Math.round(dist * 3.28084);

			$('#distance').text(feet + " ft");

			navigator.compass.getCurrentHeading(function(heading) {
				rotate(dab.bearing + heading.magneticHeading);
				setTimeout(updatePos, 1);
			}, function(err) {
				$('#distance').text(err);
				setTimeout(updatePos, 1);
			});
		}, function(err) {
			$('#distance').text(err);
			setTimeout(updatePos, 1);
		});
	}
	updatePos();
});
