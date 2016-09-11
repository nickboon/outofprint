/* requires points transformation */
(function (app) {
	// config
	var margin = 2;
	
	function rotateToTarget(points, pointToMove, target) {
		var transformation = app.createTransformationObject(),
			rotateAboutX = transformation.rotatePointAboutX,
			rotateAboutY = transformation.rotatePointAboutY,
			incrementAngle = transformation.incrementAngle,
			angleX = 0,
			angleY = 0,
			i;
			
		if (pointToMove.y < target.y - margin) {
			angleX = -incrementAngle;
		} else if (pointToMove.y > target.y + margin) {
			angleX =  incrementAngle;
		}

		if (pointToMove.x < target.x - margin) {
			angleY = -incrementAngle;
		} else if (pointToMove.x > target.y + margin) {
			angleY = incrementAngle;
		}
		
		for (i = points.length - 1; i >= 0; i -= 1) {
			rotateAboutY(points[i], angleY);
			rotateAboutX(points[i], angleX);
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

	function isPointAtTarget(point, target) {
		return point.x < target.x - margin && point.x > target.x + margin 
			&& point.y < target.y - margin && point.y > target.y + margin
	}
		
	function createTransformFunction(points, pointToMove, target) {
		return function () {
			if (!isPointAtTarget(pointToMove, target)) {
				rotateToTarget(points, pointToMove, target);
			}
		}
	}
	
	function createRotateToPointTransformer(solids, pointToMove, targetPoint) {			
		var points;
					
		if (solids === 'undefined') {
			throw "You must pass in an array of solids to be transformed when creating a transformer";
		}
			
		points = getPointsFromSolids(solids);
		
		return {
			transform: createTransformFunction(points, pointToMove, targetPoint)
		};
	}
	
	function createRotateToFrontTransformer(solids, pointToMove) {			
		return createRotateToPointTransformer(solids, pointToMove, {x: 0, y: 0});
	}

	function getMargin () {
		return margin;
	}
	
	app.createDirectedRotationTransformerObject = function () {
		return {
			createRotateToFrontTransformer: createRotateToFrontTransformer,
			createRotateToPointTransformer:	createRotateToPointTransformer,
			getMargin: getMargin
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
