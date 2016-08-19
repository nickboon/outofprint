/* requires points transformation */
(function (app) {
	var transformation = app.createTransformationObject(),
		rotateAboutX = transformation.rotatePointAboutX,
		rotateAboutY = transformation.rotatePointAboutY,
		angle = transformation.angle,
		angleX = 0,
		angleY = 0,
		margin = 2,
		mover;
	
	function setAngles() {			
		if (mover.y < -margin) {
			angleX = angle;
		} else if (mover.y > margin) {
			angleX = -angle;			
		}

		if (mover.x < -margin) {
			angleY = angle;
		} else if (mover.x > margin) {
			angleY = -angle;			
		}
	}
	
	function rotate(point) {		
		rotateAboutY(point, angleY);
		rotateAboutX(point, angleX);
	}
	
	function isPointAtFront() {
		return mover.x < -margin && mover.x > margin 
			&& mover.y < -margin && mover.y > margin
	}
	
	function rotateUntillPointMovesToFront(points) {
		if (!isPointAtFront()) {
			setAngles();
			points.forEach(rotate);
			angleX = angleY = 0;
		}
	}
		
	app.createDirectedRotationTransformer = function (pointToMove) {
		mover = pointToMove;

		return {
			transform: rotateUntillPointMovesToFront
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
