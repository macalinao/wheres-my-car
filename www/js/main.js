


var canvas = oCanvas.create({ 
    canvas: "#canvas", 
    background: "#FFFFFF", 
    fps: 60
});

var canvass = document.getElementById('canvas');
if(canvass.getContext){
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

function changeDistance(num){
	$('#distance').text(num.toString() + " ft");
}

function onCompassError(error){
	$('#distance').text("Cannot get location");
}
/*
setInterval(function(){ 
	navigator.compass.getCurrentHeading(function(){
		rotate(heading);
	}, onCompassError, compassOptions);
}, 1000);
*/
function onSuccess(heading) {
    alert('Heading: ' + heading.magneticHeading);
};

function onError(error) {
    alert('CompassError: ' + error.code);
};

navigator.compass.getCurrentHeading(onSuccess, onError);
/*
$('#distance').text(navigator.compass.getCurrentHeading(function(){
		rotate(heading);
	}, onCompassError, compassOptions);
}, 1000););
/*
Use rotate(rot) and changeDistance(num) to manipulate rotation of arrow and remaining distance
rot = value 0-360 to describe rotation (it starts at 270) to describe forward
num = distance until destination

*/