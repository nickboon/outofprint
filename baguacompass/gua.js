/* requires perspective drawing */
(function (app) {
	// config
	var defaultWidth = 100,
	// objects from dependancies
		perspective,
		drawing,
		primitives,
	// module variables
		yinColour,
		yangColour,
		alpha,
		width,
		halfWidth,
		sixthWidth; 
	
	function createYin(point, colour) {
		var points = [
			{x: point.x - halfWidth, y: point.y, z: point.z},
			{x: point.x - sixthWidth, y: point.y, z: point.z},
			{x: point.x + sixthWidth, y: point.y, z: point.z},
			{x: point.x + halfWidth, y: point.y, z: point.z}
		]
		
		return {
			points: points,
			primitives: [
				createLine(points[0], points[1], colour, alpha),
				createLine(points[2], points[3], colour, alpha)				
			]
		};
	}

	function createYang(point, colour) {
		var points = [
			{x: point.x - halfWidth, y: point.y, z: point.z},
			{x: point.x + halfWidth, y: point.y, z: point.z}
		]
		
		return {
			points: points,
			primitives: [createLine(points[0], points[1], colour, alpha)]
		};
	}
	
	function createTop(point, isYin, colour) {
		return isYin ? createYin({x: point.x, y: point.y - halfWidth, z: point.z}, colour) :
			createYang({x: point.x, y: point.y - halfWidth, z: point.z}, colour);
	}
	
	function createMiddle(point, isYin, colour) {
		return isYin ? createYin({x: point.x, y: point.y, z: point.z}, colour) :
			createYin({x: point.x, y: point.y, z: point.z}, colour);
	}

	function createBottom(point, isYin, colour) {
		return isYin ? createYin({x: point.x, y: point.y + halfWidth, z: point.z}, colour) :
			createYin({x: point.x, y: point.y + halfWidth, z: point.z}, colour);
	}

	function buildKun(point) {
		var topLine = createTop(point, true, yinColour),
			middle = createMiddle(point, true, yinColour),		
			bottom = createBottom(point, true, yinColour),
			points = topLine.points.concat(middle.points).concat(bottom.points),
			primitives = topLine.primitives.concat(middle.primitives).concat(bottom.primitives);						
		return {
			points: points,
			primitives: primitives
		};
	}
	
	function buildQian(point) {
		var topLine = createTop(point, false, yangColour),
			middle = createMiddle(point, false, yangColour),		
			bottom = createBottom(point, false, yangColour),
			points = topLine.points.concat(middle.points).concat(bottom.points),
			primitives = topLine.primitives.concat(middle.primitives).concat(bottom.primitives);						
		return {
			points: points,
			primitives: primitives
		};		
	}
		
	// create and return API for this module
	app.createGuaObject = function (p, w, n, g, a) {
		perspective = p;
		drawing = app.createDrawingObject(perspective);
		primitives = app.createPrimitivesObject(drawing);	
		createLine = primitives.createLine;
		createCurve = primitives.createCurve;
		yinColour = n;
		yangColour = g;
		width = w || defaultWidth;
		halfWidth = width / 2;
		sixthWidth = width / 6; 
 
		return {
			buildKun: buildKun,
			buildQian: buildQian
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));