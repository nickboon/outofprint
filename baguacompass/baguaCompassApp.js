
/* required diagrams, bagua, fakeSpheres, cookDingsKnife */
(function (app) {
	var isDisplayVersion,
		baguaSphere;
		
	function createSolidsList(perspective) {
		var lineColour = isDisplayVersion ? '#ff0000': '#ff0000',
			fillColour = isDisplayVersion ? '#0000000': '#ffffff',
			guaColour =  isDisplayVersion ? '#00ff00': '#000000',
			bladeEdgeColour =  isDisplayVersion ? '#00ff00': '#000000',
			cookDingsKnife = app.createCookDingsKnife(perspective,
				lineColour, fillColour),
			radius = 141.42135623730950488016887242097,			
			spheres = app.createFakeSpheresObject(perspective);
			
		cookDingsKnife.primitives[0] = cookDingsKnife.createBladeEdge(
			bladeEdgeColour);	
		
		return [
			cookDingsKnife,
			//spheres.create({x: 0, y: 0, z: 0,}, radius, lineColour, fillColour),
			baguaSphere = app.createBaguaSphere(perspective, 200, guaColour)
		];	
	}
	
	function getRandomNumberBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}		
			
	app.run = function (i) {
		var diagram = app.createDefaultFullScreenDiagram();
			
		isDisplayVersion = i;	
		diagram.addSolids(createSolidsList(diagram.perspective));
				
		window.setInterval(function () {
			var transformer,
				randomIndex = getRandomNumberBetween(0, 7);
			
			transformer = app.createDirectedRotationTransformer(baguaSphere.points[randomIndex]);
			diagram.stage.setTransformer(transformer);			
		}, 5000);		
	}		
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
