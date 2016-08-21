
/* required diagrams, bagua, fakeSpheres, cookDingsKnife */
(function (app) {
	var tranformations,
		isDisplayVersion,
		radius = 141.42135623730950488016887242097,			
		baguaSphere,
		guaYinColour,
		guaYangColour;
		
	function createTransformingSolids(perspective) {
		var lineColour = isDisplayVersion ? '#ff0000': '#ff0000',
			fillColour = isDisplayVersion ? '#000000': '#ffffff',
			bladeEdgeColour =  isDisplayVersion ? '#00ff00': '#000000',
			cookDingsKnife = app.createCookDingsKnife(perspective,
				lineColour, fillColour),
			spheres = app.createFakeSpheresObject(perspective);
			
		cookDingsKnife.primitives[0] = cookDingsKnife.createBladeEdge(
			bladeEdgeColour);	
		
		return [
			cookDingsKnife,
			spheres.create({x: 0, y: 0, z: 0,}, radius, bladeEdgeColour, fillColour),
			baguaSphere = app.createBaguaSphere(perspective, 200,
				guaYinColour, guaYangColour)
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
			shiftHorizon = -200

		guaYinColour =  isDisplayVersion ? '#00ff00': '#000000';
		guaYangColour = '#ff0000';
		gua = app.createGuaObject(perspective, guaWidth, guaYinColour, guaYangColour);
		currentGua = gua.buildKun(currentGuaPoint);
		nextGua = gua.buildQian(nextGuaPoint);
		transformingSolids = createTransformingSolids(perspective);
		solids = transformingSolids.concat([currentGua, nextGua]);
		transformations = app.createTransformationObject();
		autoTransformer = transformations.createAutoYRotationTransformer(transformingSolids);
		keyboardTransformer = transformations.createKeyboardIDrivenTransformer(transformingSolids);

		perspective.shiftVanishingPointY(shiftHorizon);
		
		diagram.stage.addSolids(solids);
		//diagram.stage.setTransformers([keyboardTransformer]);

				
		window.setInterval(function () {
			 //~ var randomIndex = getRandomNumberBetween(0, 7),
				 //~ directedTransformer = app.createDirectedRotationTransformer(
					 //~ transformingSolids, baguaSphere.points[randomIndex]
				 //~ );
			//~ 
			 //~ diagram.stage.setTransformers([directedTransformer]);
		}, 5000);		
	}		
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
