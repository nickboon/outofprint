/* requires points perspective drawing colours */
(function (app) {
	// config
	var	defaultLineColour = '#000000',
		defaultFillColour = '#FFFFFF',
		defaultAlpha = 1//.8,
	
	// objects from dependancies			
		perspective,
		drawing,
		primitives,		
		colours  = app.createColourObject(),		
	// module variables	
		getNearestZFromArray = app.createPointsObject().getNearestZFromArray,
		createLine,
		createCurve,
		createFill,
		points = [
			{x: -50, y: 30, z: 0},		// 0 start curve
			{x: 80, y: 30, z: 0},		// 1 control 1
			{x: 130, y: 30, z: 0},		// 2 control 2
			{x: 180, y: -30, z: 0},		// 3 end curve;
			{x: -150, y: -30, z: 10},	// 4 front
			{x: -150, y: 0, z: 7},		// 5
			{x: -50, y: -10, z: 8},		// 6
			{x: -150, y: -30, z: -10},	// 7 back
			{x: -150, y: 0, z: -7},		// 8
			{x: -50, y: -10, z: -8},		// 9
			// move the end 1px away
			{x: -151, y: -30, z: 10},	// 10 front
			{x: -151, y: 0, z: 7},		// 11
			{x: -151, y: -30, z: -10},	// 12 back
			{x: -151, y: 0, z: -7}		// 13
		];

	function createBladeEdge(lineColour, alpha) {
		return createCurve(
			points[0],
			points[1],
			points[2],
			points[3], lineColour, alpha
		);
	}
		
	function createSideFill(handlePoints, colour, alpha)	{
		return {
			points: handlePoints.concat([points[0],points[1],points[2],points[3]]),
			
			getNearestZ: function getNearestZ() {
				return getNearestZFromArray(points);
			},
			
			draw: function (context) {
				
				context.save();
				context.fillStyle = colours.toRgb(colour, alpha);
				context.beginPath();
				context.moveTo(
					perspective.getScreenX(points[0]), 
					perspective.getScreenY(points[0]));
				context.bezierCurveTo(
					perspective.getScreenX(points[1]), 
					perspective.getScreenY(points[1]),
					perspective.getScreenX(points[2]), 
					perspective.getScreenY(points[2]),
					perspective.getScreenX(points[3]), 
					perspective.getScreenY(points[3])
				);			
				context.lineTo(
					perspective.getScreenX(handlePoints[0]), 
					perspective.getScreenY(handlePoints[0]));
				context.lineTo(
					perspective.getScreenX(handlePoints[1]), 
					perspective.getScreenY(handlePoints[1]));
				context.lineTo(
					perspective.getScreenX(handlePoints[2]), 
					perspective.getScreenY(handlePoints[2]));				
				context.closePath();
				context.fill();
				context.restore();
			} 	
		}		
	}
	
	function createPrimitives(lineColour, fillColour,  alpha) {
		lineColour = lineColour || defaultLineColour;
		fillColour = fillColour || defaultFillColour;
		alpha = alpha || defaultAlpha;
	
		return [			
			createBladeEdge(lineColour, alpha),
			createLine(points[3], points[4], lineColour, alpha),
			createLine(points[4], points[5], lineColour, alpha),
			createLine(points[5], points[6], lineColour, alpha),
			createLine(points[6], points[0], lineColour, alpha),
			createLine(points[7], points[8], lineColour, alpha),
			createLine(points[8], points[9], lineColour, alpha),
			createLine(points[9], points[0], lineColour, alpha),
			createLine(points[3], points[7], lineColour, alpha),
			createLine(points[4], points[7], lineColour, alpha),
			createLine(points[5], points[8], lineColour, alpha),
			createLine(points[6], points[9], lineColour, alpha),
			createLine(points[6], points[9], lineColour, alpha),
			createFill([points[12], points[10], points[11], points[13]], fillColour),
			createFill([points[3], points[7], points[4]], fillColour),
			createFill([points[8], points[5], points[6], points[9]], fillColour),
			createFill([points[9], points[6], points[0]], fillColour),
			createSideFill([
				points[4],
				points[5],
				points[6]
			], fillColour, alpha), // front
			createSideFill([
				points[7],
				points[8],
				points[9]
			], fillColour, alpha) // back		
		];
	}
		
	// create and return API for this module
	app.createCookDingsKnife = function (p, lineColour, fillColour, alpha) {		
		perspective = p;
		drawing = app.createDrawingObject(perspective);
		primitives = app.createPrimitivesObject(drawing);	
		createLine = primitives.createLine;
		createCurve = primitives.createCurve;
		createFill = primitives.createFill;

		return {
			points: points,
			primitives: createPrimitives(lineColour, fillColour, alpha),
			createBladeEdge: createBladeEdge			
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
