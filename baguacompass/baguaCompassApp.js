
/* required diagrams, bagua, fakeSpheres, cookDingsKnife */
(function (app) {
	var isDisplayVersion,
		radius = 141.42135623730950488016887242097,			
		baguaSphere,
		guaYinColour,
		guaYangColour;
		
	function createSolidsList(perspective) {
		var lineColour = isDisplayVersion ? '#ff0000': '#ff0000',
			fillColour = isDisplayVersion ? '#0000000': '#ffffff',
			bladeEdgeColour =  isDisplayVersion ? '#00ff00': '#000000',
			cookDingsKnife = app.createCookDingsKnife(perspective,
				lineColour, fillColour),
			spheres = app.createFakeSpheresObject(perspective);
			
		cookDingsKnife.primitives[0] = cookDingsKnife.createBladeEdge(
			bladeEdgeColour);	
		
		return [
			cookDingsKnife,
			//spheres.create({x: 0, y: 0, z: 0,}, radius, bladeEdgeColour, fillColour),
			baguaSphere = app.createBaguaSphere(perspective, 200,
				guaYinColour, guaYangColour)
		];	
	}
	
	function getRandomNumberBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}		
			
	app.run = function (i) {
		var diagram = app.createDefaultFullScreenDiagram(),
			guaDrawingFunctions,
			canvas = app.createCanvasObject(),
			center = canvas.getCenter(),
			guaWidth = 160,
			yOffset = radius + 100,
			currentGuaPoint = {x: center.x - 100, y: center.y + yOffset},
			nextGuaPoint = {x: center.x + 100, y: center.y + yOffset};
			
		isDisplayVersion = i;	
		guaYinColour =  isDisplayVersion ? '#00ff00': '#000000';
		guaYangColour = '#ff0000';
		guaDrawingFunctions = app.createGuaDrawingFunctionsArray(
			canvas, guaYinColour, guaYangColour, guaWidth);
		diagram.addSolids(createSolidsList(diagram.perspective));
		
				
		window.setInterval(function () {
			var transformer,
				randomIndex = getRandomNumberBetween(0, 7);
			
			transformer = app.createDirectedRotationTransformer(
				baguaSphere.points[randomIndex]
			);
			diagram.stage.setTransformer(transformer);
			diagram.stage.setAnimationFunctions([
				function() {
					guaDrawingFunctions[0](currentGuaPoint);				
				},
				function () {
					guaDrawingFunctions[1](nextGuaPoint);
				}
			]);
		}, 5000);		
	}		
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
