/* requires points transformation */
(function (app) {
	var points = [],
		transformation = app.createTransformationObject(),
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
	
	function rotateUntillPointMovesToFront() {
		if (!isPointAtFront()) {
			setAngles();
			points.forEach(rotate);
			angleX = angleY = 0;
		}
	}
		
	function addPointsToTransformer(solid) {
		points = points.concat(solid.points);
	}

	app.createDirectedRotationTransformer = function (solids, pointToMove) {
			
		if (solids === 'undefined') {
			throw "You must an array of solids to be transformed when creating a transformer";
		}
			
		solids.forEach(addPointsToTransformer);
		mover = pointToMove;
		
		return {
			transform: rotateUntillPointMovesToFront
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
