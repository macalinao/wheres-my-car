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
			duration:1000,
			easing: "ease-in-out-cubic"
		});
		innerArrow.animate({
			rotation: arrow.rotation - 270
		}, {
			duration:1000,
			easing: "ease-in-out-cubic"
		});
	}

	function updatePos() {
		navigator.geolocation.getCurrentPosition(function(pos) {
			$('#distance').text(pos.coords.latitude + "\n" + pos.coords.longitude);
			setTimeout(updatePos, 50);
		}, function(err) {
			$('#distance').text(err);
			setTimeout(updatePos, 50);
		});
	}
	updatePos();
});
