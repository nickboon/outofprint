
/* required diagrams, cubeGeomety, transformations, directedTransformations, bagua, baguaCube, cookDingsKnife */
(function (app) {
	// config
	var baguaCubeWidth = 200,
		baguaCubeRadius = app.createCubeGeometryObject()
			.getFaceDiagonal(baguaCubeWidth),	
		yinColour = '#00ff00',	// green
		yangColour = '#ff0000',	// red
		lineColour = '#000000',	// black
		fillColour = '#ffffff',	// white
		alpha = 0.8,
		landscapeGuaWidth = 40,
		portraitGuaWidth = 140,		
		guaLayoutMarginX = 120,
		guaLayoutMarginY = baguaCubeRadius + guaLayoutMarginX * 2,
		horizonOffsetForPortrait = -200,	
		rateOfChange = 1000;	
		
	function setUpKnife(point) {
		var transformations = app.createTransformationObject();
		
		transformations.rotatePointAboutY(point, Math.PI / 2);
		transformations.rotatePointAboutX(point, Math.PI * 0.4);
	}	
		
	function setInitialOrientationForKnife(knife) {
		knife.points.forEach(setUpKnife);		
	}	
							
	function createTransformingSolids(perspective) {
		var	cookDingsKnife = app.createCookDingsKnife(perspective, 
				lineColour, fillColour, alpha),
			baguaCube = app.createBaguaCube(
				perspective, baguaCubeWidth, landscapeGuaWidth,
				yinColour, yangColour
			);
			
		setInitialOrientationForKnife(cookDingsKnife);
		
		return [
			cookDingsKnife,		// 0
			baguaCube			// 1
		];	
	}
	
	function getRandomNumberBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}		
						
	app.run = function () {
		var diagram = app.createDefaultFullScreenDiagram(),
			stage = diagram.stage,
			perspective = diagram.perspective,
			transformingSolids = createTransformingSolids(perspective),		
			knife = transformingSolids[0],
			knifePoint = knife.getKnifePoint(),
			baguaCube = transformingSolids[1],				
			mapGua = baguaCube.mapGua,
			directedTransformations = 
				app.createDirectedRotationTransformerObject(),
			bagua,
			guaWidth,
			currentGuaPoint,
			nextGuaPoint,
			currentGua,
			nextGua,
			currentGuaIndex = 0;
			isScreenPortrait = (window.innerWidth < window.innerHeight);
	
		guaWidth = isScreenPortrait ? portraitGuaWidth : landscapeGuaWidth;	
		bagua = app.createBaguaObject(
			perspective, guaWidth, yinColour, yangColour, alpha
		),
		buildGua = bagua.buildGua;
 
 		currentGuaPoint = isScreenPortrait ?
			{x: -guaLayoutMarginX, y: guaLayoutMarginY, z: 0} :
			{x: -guaLayoutMarginY, y: 0, z: 0};
		nextGuaPoint = isScreenPortrait ? 
			{x: guaLayoutMarginX, y: guaLayoutMarginY, z: 0} :
			{x: guaLayoutMarginY, y: 0, z: 0};
					
		if (isScreenPortrait) {
			perspective.shiftVanishingPointY(horizonOffsetForPortrait);		
		}
				
		window.setInterval(function () {									
			var randomIndex = getRandomNumberBetween(0, 7),
				rotateBaguaTransformer = directedTransformations
					.createRotateToPointTransformer(
						[baguaCube], baguaCube.points[randomIndex],
						{x: 0, y: 0}
					),
				rotateKnifeTransformer = directedTransformations
					.createRotateToPointTransformer(
						[knife], knifePoint, baguaCube.points[randomIndex]
					);

			currentGua = buildGua(mapGua(currentGuaIndex), currentGuaPoint);
			currentGuaIndex = randomIndex;
			nextGua = buildGua(mapGua(randomIndex), nextGuaPoint);

			stage.setSolids(
				transformingSolids.concat([currentGua, nextGua])
			);
			
			stage.setTransformers(
				[rotateKnifeTransformer, rotateBaguaTransformer]
			);			  
		}, rateOfChange);
	}		
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
