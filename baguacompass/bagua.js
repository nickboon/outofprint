/* requires perspective drawing points transformations */
(function (app) {
	// config
	var	width = 40,
		halfWidth = width / 2,
		thirdWidth = width /3,
		zDistance,
		fullZDistance,
	// objects from dependancies			
		perspective,
		drawing,
		primitives,		
		transformations = app.createTransformationObject(),
		copyAndShift = transformations.copyPointAndShift,
		copyAndRotate = transformations.copyPointAndRotate,
		copy = app.createPointsObject().copy,
	// module variables	
		getNearestZFromArray = app.createPointsObject().getNearestZFromArray,
		createLine,
		points = [],
		cubeWidth,
		spaceDiagonal,
		faceDiagonal,
		radiusOfCircumscripedSphere,
		angleBetweenWidthAndSpaceDiagonal,
		tilt;
	
	function getFrontPoint() {
		return {x: 0, y: 0, z: -zDistance };
	}
	
	function createPrimitives(lineColour,  alpha) {
		var kun,
			qian,
			kan,
			xun,
			dui,
			li,
			gen,
			zhen,
			lines = [],
			newLines = [],
			i,
			farMiddleLeft,
			farMiddleRight,
			yinMiddleLeft,
			yinMiddleRight,
			yinTopLeft,
			yinTopRight,
			yinBottomLeft,
			yinBottomRight,
			yangMiddle,
			yangTop,
			yangBottom,
			yangLineTranslationAngle,
			yinLineTRanslationAngles;
		
		
		
		function setKunAtFront() {
			farMiddleLeft = copyAndShift(kun, 'x', -halfWidth);
			farMiddleRight = copyAndShift(farMiddleLeft, 'x', width);

			yinMiddleLeft = createLine(
				farMiddleLeft,
				copyAndShift(farMiddleLeft, 'x', thirdWidth),
				lineColour,  alpha
			);					
			yinMiddleRight = createLine(
				farMiddleRight,
				copyAndShift(farMiddleRight, 'x', -thirdWidth),
				lineColour,  alpha
			);					
			yinTopLeft = createLine(
				copyAndShift(yinMiddleLeft.points[0], 'y', -halfWidth),
				copyAndShift(yinMiddleLeft.points[1], 'y', -halfWidth),
				lineColour,  alpha
			);					
			yinTopRight = createLine(
				copyAndShift(yinMiddleRight.points[0], 'y', -halfWidth),
				copyAndShift(yinMiddleRight.points[1], 'y', -halfWidth),
				lineColour,  alpha
			);
			yinBottomLeft = createLine(
				copyAndShift(yinMiddleLeft.points[0], 'y', halfWidth),
				copyAndShift(yinMiddleLeft.points[1], 'y', halfWidth),
				lineColour,  alpha
			);	
			yinBottomRight = createLine(
				copyAndShift(yinMiddleRight.points[0], 'y', halfWidth),
				copyAndShift(yinMiddleRight.points[1], 'y', halfWidth),
				lineColour,  alpha
			);				
		}
		
		function setQianAtBack() {
			yangMiddle = createLine(
				copyAndShift(farMiddleLeft, 'z', fullZDistance),
				copyAndShift(farMiddleRight, 'z', fullZDistance),
				lineColour,  alpha
			);	
			yangTop = createLine(
				copyAndShift(yangMiddle.points[0], 'y', halfWidth),
				copyAndShift(yangMiddle.points[1], 'y', halfWidth),
				lineColour,  alpha
			);	
			yangBottom = createLine(
				copyAndShift(yangMiddle.points[0], 'y', -halfWidth),
				copyAndShift(yangMiddle.points[1], 'y', -halfWidth),
				lineColour,  alpha
			);
		}
				
		yangLineTranslationAngle = Math.asin(cubeWidth / spaceDiagonal) * 2;
		yinLineTRanslationAngle = yangLineTranslationAngle + Math.PI;			
		kun = getFrontPoint();
		setKunAtFront();
		setQianAtBack();	
		
		// ☷ front centre	
		lines.push(yinMiddleLeft);
		lines.push(yinMiddleRight);
		lines.push(yinTopLeft);
		lines.push(yinTopRight);
		lines.push(yinBottomLeft);
		lines.push(yinBottomRight);

		// ☰ back centre
		lines.push(yangMiddle);
		lines.push(yangTop);
		lines.push(yangBottom);
		
		// ☲ back top
		
		lines.push(createLine(
			copyAndRotate(yangTop.points[0], 'x', yangLineTranslationAngle),
			copyAndRotate(yangTop.points[1], 'x', yangLineTranslationAngle),
				lineColour,  alpha)
		);
		lines.push(createLine(
			copyAndRotate(yinMiddleLeft.points[0], 'x', yinLineTRanslationAngle),
			copyAndRotate(yinMiddleLeft.points[1], 'x', yinLineTRanslationAngle),
				lineColour,  alpha)
		);
		lines.push(createLine(
			copyAndRotate(yinMiddleRight.points[0], 'x', yinLineTRanslationAngle),
			copyAndRotate(yinMiddleRight.points[1], 'x', yinLineTRanslationAngle),
				lineColour,  alpha)
		);
		lines.push(createLine(
			copyAndRotate(yangBottom.points[0], 'x', yangLineTranslationAngle),
			copyAndRotate(yangBottom.points[1], 'x', yangLineTranslationAngle),
				lineColour,  alpha)
		);
		
		
		// ☵ front bottom
		lines.push(createLine(
			copyAndRotate(yinTopLeft.points[0], 'x', yangLineTranslationAngle),
			copyAndRotate(yinTopLeft.points[1], 'x', yangLineTranslationAngle),
				lineColour,  alpha)
		);
		lines.push(createLine(
			copyAndRotate(yinTopRight.points[0], 'x', yangLineTranslationAngle),
			copyAndRotate(yinTopRight.points[1], 'x', yangLineTranslationAngle),
				lineColour,  alpha)
		);
		lines.push(createLine(
			copyAndRotate(yangMiddle.points[0], 'x', yinLineTRanslationAngle),
			copyAndRotate(yangMiddle.points[1], 'x', yinLineTRanslationAngle),
				lineColour,  alpha)
		);
		lines.push(createLine(
			copyAndRotate(yinBottomLeft.points[0], 'x', yangLineTranslationAngle),
			copyAndRotate(yinBottomLeft.points[1], 'x', yangLineTranslationAngle),
				lineColour,  alpha)
		);
		lines.push(createLine(
			copyAndRotate(yinBottomRight.points[0], 'x', yangLineTranslationAngle),
			copyAndRotate(yinBottomRight.points[1], 'x', yangLineTranslationAngle),
			lineColour,  alpha)
		);
		
		qian = copyAndRotate(kun, 'x', Math.PI);
		kan = copyAndRotate(qian, 'x', yangLineTranslationAngle);
		li = copyAndRotate(kan, 'x', Math.PI);
		points.push(qian);	// ☷ front centre
		points.push(li)		// ☵ front bottom
		points.push(kan);	// ☲ back top
		points.push(kun);	// ☰ back centre
		
		function rotateToNextEdge(point) {
			transformations.rotatePointAboutX(point, -tilt); 			
			transformations.rotatePointAboutY(point, Math.PI / 2); 			
			transformations.rotatePointAboutX(point, tilt); 			
		}
				
		for (i = lines.length - 1; i >= 0; i -= 1) {
			points = points.concat(lines[i].points);
		}


		setKunAtFront();
		setQianAtBack();	
		points.forEach(rotateToNextEdge);

		
		// ☶ front centre
		newLines.push(createLine(
			 copyAndShift(yangBottom.points[0], 'z', -fullZDistance),
			 copyAndShift(yangBottom.points[1], 'z', -fullZDistance),
			 lineColour,  alpha)
			
		);
		newLines.push(createLine(
			copy(yinMiddleLeft.points[0]),
			copy(yinMiddleLeft.points[1]),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copy(yinMiddleRight.points[0]),
			copy(yinMiddleRight.points[1]),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copy(yinBottomLeft.points[0]),
			copy(yinBottomLeft.points[1]),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copy(yinBottomRight.points[0]),
			copy(yinBottomRight.points[1]),
			lineColour,  alpha)
		);
				
		// ☱ back centre
		newLines.push(createLine(
			copyAndShift(yinTopLeft.points[0], 'z', fullZDistance),
			copyAndShift(yinTopLeft.points[1], 'z', fullZDistance),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copyAndShift(yinTopRight.points[0], 'z', fullZDistance),
			copyAndShift(yinTopRight.points[1], 'z', fullZDistance),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copy(yangMiddle.points[0]),
			copy(yangMiddle.points[1]),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copy(yangTop.points[0]),
			copy(yangTop.points[1]),
			lineColour,  alpha)
		);

		// ☳ top back
		newLines.push(createLine(
			copyAndRotate(yangTop.points[0], 'x', yangLineTranslationAngle),
			copyAndRotate(yangTop.points[1], 'x', yangLineTranslationAngle),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copyAndRotate(yinMiddleLeft.points[0], 'x', yinLineTRanslationAngle),
			copyAndRotate(yinMiddleLeft.points[1], 'x', yinLineTRanslationAngle),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copyAndRotate(yinMiddleRight.points[0], 'x', yinLineTRanslationAngle),
			copyAndRotate(yinMiddleRight.points[1], 'x', yinLineTRanslationAngle),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copyAndRotate(yinBottomLeft.points[0], 'x', yinLineTRanslationAngle),
			copyAndRotate(yinBottomLeft.points[1], 'x', yinLineTRanslationAngle),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copyAndRotate(yinBottomRight.points[0], 'x', yinLineTRanslationAngle),
			copyAndRotate(yinBottomRight.points[1], 'x', yinLineTRanslationAngle),
			lineColour,  alpha)
		);
		
		
		// ☴ front bottom		
		newLines.push(createLine(
			copyAndRotate(yangTop.points[0], 'x', yinLineTRanslationAngle),
			copyAndRotate(yangTop.points[1], 'x', yinLineTRanslationAngle),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copyAndRotate(yangMiddle.points[0], 'x', yinLineTRanslationAngle),
			copyAndRotate(yangMiddle.points[1], 'x', yinLineTRanslationAngle),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copyAndRotate(yinBottomLeft.points[0], 'x', yangLineTranslationAngle),
			copyAndRotate(yinBottomLeft.points[1], 'x', yangLineTranslationAngle),
			lineColour,  alpha)
		);
		newLines.push(createLine(
			copyAndRotate(yinBottomRight.points[0], 'x', yangLineTranslationAngle),
			copyAndRotate(yinBottomRight.points[1], 'x', yangLineTranslationAngle),
			lineColour,  alpha)
		);
		
		gen = getFrontPoint();
		dui = copyAndShift(gen, 'z', fullZDistance);
		zhen = copyAndRotate(dui, 'x', yangLineTranslationAngle);
		xun = copyAndRotate(gen, 'x', Math.PI);
		points.push(zhen);
		points.push(gen);
		points.push(dui);
		points.push(xun);
			
		for (i = newLines.length - 1; i >= 0; i -= 1) {
			points = points.concat(newLines[i].points);
		}
			
		return  lines.concat(newLines);
	}

		
	// create and return API for this module
	app.createBaguaSphere = function (p, c, lineColour, alpha) {		
		cubeWidth = c;
		spaceDiagonal = Math.sqrt(3) * cubeWidth,
		faceDiagonal = Math.sqrt(2) * cubeWidth,
		radiusOfCircumscripedSphere = Math.sqrt(3) * cubeWidth / 2,
		angleBetweenWidthAndSpaceDiagonal = Math.atan(faceDiagonal / 200),
		tilt = (Math.PI / 2) - angleBetweenWidthAndSpaceDiagonal;
		radius = Math.sqrt(3) * cubeWidth / 2;
		perspective = p;
		drawing = app.createDrawingObject(perspective);
		primitives = app.createPrimitivesObject(drawing);	
		createLine = primitives.createLine;
		zDistance = Math.sqrt(Math.pow(radius, 2) - Math.pow(halfWidth, 2));
		fullZDistance = zDistance * 2;
		
		return {
			primitives: createPrimitives(lineColour, alpha),
			points: points
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
