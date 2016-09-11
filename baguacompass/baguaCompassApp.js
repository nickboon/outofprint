
/* required diagrams, bagua, fakeSpheres, cookDingsKnife */
(function (app) {
	var radius = 141.42135623730950488016887242097,			
		guaYinColour,
		guaYangColour,
		transformations = app.createTransformationObject(),
		rotateAboutX = transformations.rotatePointAboutX;
		rotateAboutY = transformations.rotatePointAboutY;
		
		
	function rotate(point) {
		rotateAboutY(point, Math.PI / 2);
		rotateAboutX(point, Math.PI * 0.4);
	}	
		
	function setInitialOrientationsForKnife(knife) {
		knife.points.forEach(rotate);		
	}	
							
	function createTransformingSolids(perspective, isDisplayVersion) {
		var lineColour = isDisplayVersion ? '#000000' : '#ff0000',
			fillColour = isDisplayVersion ? '#ffffff' : '#ffffff',
			bladeEdgeColour =  isDisplayVersion ? '#000000' : '#000000',
			cookDingsKnife = app.createCookDingsKnife(perspective,
				lineColour, fillColour, 0.8),
			spheres = app.createFakeSpheresObject(perspective),
			sphereStroke = spheres.createStroke(
				{x: 0, y: 0, z: 0,}, radius, bladeEdgeColour
			),
			baguaCube = app.createBaguaCube(
				perspective, 200, 40, guaYinColour, guaYangColour
			);
			
		// give Cook Ding's knife edge a different colour				
		cookDingsKnife.primitives[0] = cookDingsKnife.createBladeEdge(
			bladeEdgeColour);	
	
		setInitialOrientationsForKnife(cookDingsKnife);
		
		return [
			cookDingsKnife,		// 0
			baguaCube//,		// 1
			//sphereStroke		// 2
		];	
	}
	
	function getRandomNumberBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}		
						
	app.run = function (i) {
		var isDisplayVersion = i,	
			diagram = app.createDefaultFullScreenDiagram(),
			perspective = diagram.perspective,
			guaWidth = 0,
			guaDisplayMarginX = 120,
			guaDisplayMarginY = radius + 240,
			currentGuaPoint,
			nextGuaPoint,
			currentGua,
			nextGua,
			currentGuaIndex = 0,
			shiftHorizon = -200,
			knife,
			bagua,
			knifeKeyBoardTransformer,
			mapGua,
			buildGua,
			isScreenPortrait = (window.innerWidth < window.innerHeight);
		 
			
		if (isScreenPortrait) {
			currentGuaPoint = {x: -guaDisplayMarginX, y: guaDisplayMarginY, z: 0};
			nextGuaPoint = {x: guaDisplayMarginX, y: guaDisplayMarginY, z: 0};
			guaWidth = 140;
		} else {
			currentGuaPoint = {x: -guaDisplayMarginY, y: 0, z: 0};
			nextGuaPoint = {x: guaDisplayMarginY, y: 0, z: 0};
			guaWidth = 40;			
		} 

		guaYinColour =  isDisplayVersion ? '#00ff00': '#000000';
		guaYangColour = isDisplayVersion ? '#ff0000': '#ff0000';
		bagua = app.createBaguaObject(
			perspective, guaWidth, guaYinColour, guaYangColour
		);
		buildGua = bagua.buildGua;
		
		transformingSolids = createTransformingSolids(
			perspective, isDisplayVersion
		);
		
		knife = transformingSolids[0];
		baguaCube = transformingSolids[1];				
		mapGua = baguaCube.mapGua;
		
		if (isScreenPortrait) {
			// Move stage centre up the canvas
			perspective.shiftVanishingPointY(shiftHorizon);		
		}
				
		diagram.stage.setSolids(transformingSolids);
		
		var directedTransformations = 
			app.createDirectedRotationTransformerObject();
				
		window.setInterval(function () {									
			var randomIndex = getRandomNumberBetween(0, 7),
				rotateToFrontTransformer = directedTransformations
					.createRotateToPointTransformer(
						[baguaCube],
						baguaCube.points[randomIndex],
						{x: 0, y: 0}
					),
				rotateToBaguaTransformer = directedTransformations
					.createRotateToPointTransformer(
						[knife], knife.points[3], baguaCube.points[randomIndex]
					);

			currentGua = buildGua(mapGua(currentGuaIndex), currentGuaPoint);
			currentGuaIndex = randomIndex;
			nextGua = buildGua(mapGua(randomIndex), nextGuaPoint);

			diagram.stage.setSolids(
				transformingSolids.concat([currentGua, nextGua])
			)
			diagram.stage.setTransformers(
				[rotateToBaguaTransformer, rotateToFrontTransformer]
			);			  
		}, 1000);
	}		
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
