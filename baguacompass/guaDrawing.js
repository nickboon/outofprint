/* requires canvas */
(function (app) {
	// config
	var defaultWidth = 100,
		defaultAlpha = .5,
	// objects from dependancies			
		colours  = app.createColourObject(),		
	// module variables
		context,
		yinColour,
		yangColour,
		alpha,
		width,
		halfWidth,
		thirdWidth; 
	
	function drawYin(pointA) {
		
		context.moveTo(pointA.x, pointA.y -100);
		 
		var pointB = {x: pointA.x + thirdWidth, y: pointA.y},
			pointC = {x: pointA.x + width - thirdWidth, y: pointA.y},
			pointD = {x: pointA.x + width, y: pointA.y};			

		context.moveTo(pointA.x, pointA.y);
		context.lineTo(pointB.x, pointB.y);
		context.moveTo(pointC.x, pointC.y);
		context.lineTo(pointD.x, pointD.y);
	}
	
	function drawYang(pointA) {
		var pointB = {x: pointA.x + width, y: pointA.y};
		
		context.moveTo(pointA.x, pointA.y);
		context.lineTo(pointB.x, pointB.y);
	}

	function drawKun(point) {		
		context.save();
		context.strokeStyle = colours.toRgb(yinColour, alpha);
		context.beginPath();
		drawYin({x: point.x - halfWidth, y: point.y - halfWidth});
		drawYin({x: point.x - halfWidth, y: point.y});
		drawYin({x: point.x - halfWidth, y: point.y + halfWidth});
		context.stroke();
		context.restore();
	}

	function drawQian(point) {
		context.save();
		context.beginPath();
		context.strokeStyle = colours.toRgb(yangColour, alpha);
		drawYang({x: point.x - halfWidth, y: point.y - halfWidth});
		drawYang({x: point.x - halfWidth, y: point.y});
		drawYang({x: point.x - halfWidth, y: point.y + halfWidth});
		context.stroke();
		context.restore();		
	}

	// create and return API for this module
	app.createGuaDrawingFunctionsArray = function (canvas, n, g, w, a) {
		context = canvas.getDrawingContext();
		yinColour = n;
		yangColour = g;
		alpha = a || defaultAlpha;
		width = w || defaultWidth;
		halfWidth = width / 2;
		thirdWidth = width / 3; 
		
		return [
			drawKun,
			drawQian
		];
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
