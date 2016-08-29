
/* required diagrams, bagua, fakeSpheres, cookDingsKnife */
(function (app) {
	var tranformations,
		radius = 141.42135623730950488016887242097,			
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
			
			
	function setAlphaTo0(primitive) {
		if(primitive.setAlpha) {
			primitive.setAlpha(0);				
		}
	}		
			
	function hideSolid(solid) {
		solid.primitives.forEach(setAlphaTo0);
	} 
	
	function createTransformingSolids(perspective, isDisplayVersion) {
		var lineColour = isDisplayVersion ? '#ff0000': '#ff0000',
			fillColour = isDisplayVersion ? '#ffffff': '#ffffff',
			bladeEdgeColour =  isDisplayVersion ? '#00ff00': '#000000',
			cookDingsKnife = app.createCookDingsKnife(perspective,
				lineColour, fillColour, 0.8),
			spheres = app.createFakeSpheresObject(perspective),
			sphereStroke = spheres.createStroke(
				{x: 0, y: 0, z: 0,}, radius, bladeEdgeColour
			),
			baguaSphere = app.createBaguaSphere(
				perspective, 200, guaYinColour, guaYangColour
			);
			
		// give Cook Ding's knife edge a different colour				
		cookDingsKnife.primitives[0] = cookDingsKnife.createBladeEdge(
			bladeEdgeColour);	
	
		setInitialOrientationsForKnife(cookDingsKnife);
		
		return [
			cookDingsKnife,	// 0
			baguaSphere		// 1
			//sphereStroke,	// 2
		];	
	}
	
	function getRandomNumberBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}		
						
	app.run = function (i) {
		var isDisplayVersion = i,	
			diagram = app.createDefaultFullScreenDiagram(),
			perspective = diagram.perspective,
			canvas = app.createCanvasObject(),
			center = canvas.getCenter(),
			guaWidth = 140,
			guaDisplayMarginX = 120,
			guaDisplayMarginY = radius + 240,
			currentGuaPoint = {x: - guaDisplayMarginX, y: guaDisplayMarginY, z: 0},
			nextGuaPoint = {x:  + guaDisplayMarginX, y: guaDisplayMarginY, z: 0},
			currentGua,
			nextGua,
			currentGuaIndex = 0,
			shiftHorizon = -200,
			knife,
			bagua,
			knifeKeyBoardTransformer;
			

		guaYinColour =  isDisplayVersion ? '#00ff00': '#000000';
		guaYangColour = '#ff0000';
		gua = app.createGuaObject(
			perspective, guaWidth, guaYinColour, guaYangColour
		);
		transformingSolids = createTransformingSolids(
			perspective, isDisplayVersion
		);
		knife = transformingSolids[0];
		bagua = transformingSolids[1];				
		
		// Move stage centre up the canvas
		perspective.shiftVanishingPointY(shiftHorizon);
				
		diagram.stage.setSolids(transformingSolids);
		
		var directedTransformations = app.createDirectedRotationTransformerObject();
		
		
		window.setInterval(function () {									
			var randomIndex = getRandomNumberBetween(0, 7),
				rotateToFrontTransformer = directedTransformations
					.createRotateToPointTransformer(
						[bagua], bagua.centers[randomIndex], {x:0, y: 0}
					),
				rotateToBaguaTransformer = directedTransformations
					.createRotateToPointTransformer(
						[knife], knife.points[3], bagua.centers[randomIndex]
					);

			currentGua = gua.buildGua(currentGuaIndex, currentGuaPoint);
			currentGuaIndex = randomIndex;
			nextGua = gua.buildGua(randomIndex, nextGuaPoint);

			//hideSolid(knife);

			diagram.stage.setSolids(
				transformingSolids.concat([currentGua, nextGua])
			)
			diagram.stage.setTransformers(
				[rotateToFrontTransformer, rotateToBaguaTransformer]
			);			  
		}, 1000);		
	}		
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
