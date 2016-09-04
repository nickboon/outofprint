/* requires transformations */
(function (app) {
	// config
	var	defaultWidth = 200,
	// objects from dependancies
		transformations = app.createTransformationObject(),
		rotateAboutX = transformations.rotatePointAboutX,
		rotateAboutY = transformations.rotatePointAboutY,
	// module variables
		points = [];

	function buildCubeAtCentreWithFaceToFront(width) {
		var points = [];
		
		
		return points;
	}

	function getAngleBetweenYandCubeDiagonal(width) {
		
	}

	function rotate45DegreesAboutY(point) {
		rotatePointAboutY(point, Math.PI / 4);
	}

	function rotateCube45DegreesAboutY() {
		points.forEach(rotate45DegreesAboutY)
	}
		
	function tiltCubeAboutX() {
		
	}

	function getPoints() {
		return points;
	}

	// create and return API for this module
	app.createCubeTransformationsObject = function (w) {
		width = w || defaultWidth;
				
		points = buildCubeAtCentreWithFaceToFront();
		
		return {
			getPoints: getPoints,
			rotateCube45DegreesAboutY: rotateCube45DegreesAboutY,
			tiltCubeAboutX: tiltCubeAboutX
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
