/* requires points transformation */
(function (app) {
	var transformation = app.createTransformationObject(),
		rotatePointAboutX = transformation.rotatePointAboutX,
		rotatePointAboutY = transformation.rotatePointAboutY,
		angle = transformation.angle;
	
	function rotate(point) {
		rotatePointAboutY(point, angle);
	} 
	
	function autoYRotate(points) {
		points.forEach(rotate);
	}
	
	app.createAutoYRotationTransformer = function () {		
		return {
			transform: autoYRotate
		}
	}
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));