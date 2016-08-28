/* requires points transformation */
(function (app) {
	var points = [],
		transformation = app.createTransformationObject(),
		rotateAboutX = transformation.rotatePointAboutX,
		rotateAboutY = transformation.rotatePointAboutY,
		angle = transformation.angle,
		margin = 2;
	
	function rotateToFront(points, pointToMove) {
		var angleX = 0,
			angleY = 0,
			i;
			
		if (pointToMove.y < -margin) {
			angleX = angle;
		} else if (pointToMove.y > margin) {
			angleX = -angle;
		}

		if (pointToMove.x < -margin) {
			angleY = angle;
		} else if (pointToMove.x > margin) {
			angleY = -angle;
		}
		
		for (i = points.length - 1; i >= 0; i -= 1) {
			rotateAboutX(points[i], angleX);
			rotateAboutY(points[i], angleY);
		}
	}
	
	function getPointsFromSolids(solids) {
		var points = [],
			i;
		
		for(i = solids.length - 1; i >= 0; i -= 1) {
			points = points.concat(solids[i].points);
		}
		
		return points;
	}

	function isPointAtFront(point) {
		return point.x < -margin && point.x > margin 
			&& point.y < -margin && point.y > margin
	}
		
	function createTransformFunction(points, pointToMove) {
		return function () {
			if (!isPointAtFront(pointToMove)) {
				rotateToFront(points, pointToMove);
			}
		}
	}
	
	function createRotateToFrontTransformer(solids, pointToMoveToFront) {			
		var points;
					
		if (solids === 'undefined') {
			throw "You must pass in an array of solids to be transformed when creating a transformer";
		}
			
		points = getPointsFromSolids(solids);
		
		return {
			transform: createTransformFunction(points, pointToMoveToFront)
		};
	}
	
	app.createDirectedRotationTransformerObject = function () {
		return {
			createRotateToFrontTransformer: createRotateToFrontTransformer	
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
