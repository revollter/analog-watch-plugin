//Constants
var START_ANGLE = 270;
var SECOND_HAND_LENGTH = 0.8;
var MINUTE_HAND_LENGTH = 0.9;
var HOUR_HAND_LENGTH = 0.6;
var FULL_HOUR_ANGLE = 30;
var HOUR_ANGLE = 0.5;
var SECOND_ANGLE = 6;
var MINUTE_ANGLE = 6;

(function($) {
$.fn.clock = function (options) 
{

	var settings = $.extend({		
		numbersSize: '10px', 
		numbersColor: 'black', 
		numbersRoman: 'false',	
		faceSize: 200,
		faceColor: 'lightblue',
		borderSize: '5px', 
		borderColor: 'red',
		hourHandSize: 2,
		hourHandColor: 'black',
		minuteHandSize: 2, 
		minuteHandColor: 'black',
		secondHandSize: 2,
		secondHandColor: 'red'
	}, options);

	$(this).html("<canvas></canvas>");
	var canvas = $(this).children().get(0);
	var ctx = canvas.getContext("2d");
	ctx.canvas.width = settings.faceSize;
	ctx.canvas.height = settings.faceSize;
	ctx.canvas.style = `background-color: ${settings.faceColor}; 
						border: ${settings.borderSize} solid  ${settings.borderColor};
						border-radius: 50%`;

	setInterval(function(){
		var time = new Date();
		hour = time.getHours();
		minute = time.getMinutes();
		seconds = time.getSeconds();
		
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		drawPointsAndNumbers(ctx, settings.numbersSize);
		drawHand(ctx, calculateHourHandAngle(hour,minute), settings.hourHandColor, settings.HourHandSize, HOUR_HAND_LENGTH);
		drawHand(ctx, calculateMinuteHandAngle(minute), settings.minuteHandColor, settings.minuteHandSize, MINUTE_HAND_LENGTH);
		drawHand(ctx, calculateSecondAngle(seconds), settings.secondHandColor, settings.secondHandSize, SECOND_HAND_LENGTH);
	}, 1000);
};

})(jQuery);

function calculateHourHandAngle(hour, minute) {
	return hour * this.FULL_HOUR_ANGLE + minute * this.HOUR_ANGLE + this.START_ANGLE;
}

function calculateMinuteHandAngle(minute) {
	return minute * this.MINUTE_ANGLE + this.START_ANGLE;
}

function calculateSecondAngle(second) {
	return second * this.SECOND_ANGLE + this.START_ANGLE;
}

function drawPointsAndNumbers(ctx, numbersSize) {
	for (i = 1; i <= 60; i++) {
		angle = 270 + i * this.MINUTE_ANGLE;
		
		pointX = ctx.canvas.width/2 + ctx.canvas.width/2 * Math.cos(angle * Math.PI/180);
		pointY = ctx.canvas.width/2 + ctx.canvas.width/2 * Math.sin(angle * Math.PI/180);
		
		if (i%5 === 0 ) {
			x = ctx.canvas.width/2 + ctx.canvas.width/2 * 0.95 * Math.cos(angle * Math.PI/180) * 0.9;
			y = ctx.canvas.width/2 + ctx.canvas.width/2 * 0.95 * Math.sin(angle * Math.PI/180) * 0.9;

			ctx.beginPath();
			ctx.arc(pointX, pointY, 4, 0, 2 * Math.PI);
			ctx.fill();
			ctx.font = `${numbersSize} Arial`;
			ctx.textAlign = 'center';
			ctx.fillText(i/5, x, y);

		} else {	
			ctx.beginPath();
			ctx.arc(pointX, pointY, 2, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
}

function drawHand(ctx, angle, color, size, length) { 
	x = ctx.canvas.width/2 + ctx.canvas.width/2 * Math.cos(angle * Math.PI/180) * length;
	y = ctx.canvas.width/2 + ctx.canvas.width/2 * Math.sin(angle * Math.PI/180) * length;
	
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = size;
	ctx.lineCap = 'round';
	ctx.moveTo(ctx.canvas.width/2, ctx.canvas.width/2);
	ctx.lineTo(x,y);
	ctx.stroke();
	ctx.closePath;
	ctx.fill();
}
