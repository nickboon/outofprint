
/* required diagrams, shapes, bagua, fakeSpheres, cookDingsKnife */
(function (app) {
	var diagram,
		radius = 141.42135623730950488016887242097,
		baguaSphere;
		
	function createSolidsList(perspective) {
		var	spheres = app.createFakeSpheresObject(perspective);
		
		return [
			app.createCookDingsKnife(perspective),
			spheres.create({x: 0, y: 0, z: 0}, radius),
			baguaSphere = app.createBaguaSphere(perspective, 200)
		];	
	}
	
	function getRandomNumberBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}		
			
	app.run = function () {
		var diagram = app.createDefaultFullScreenDiagram();
			
		diagram.addSolids(createSolidsList(diagram.perspective));		
		window.setInterval(function () {
			var transformer,
				randomIndex = getRandomNumberBetween(0, 7);
			
			transformer = app.createDirectedRotationTransformer(baguaSphere.points[randomIndex]);
			diagram.stage.setTransformer(transformer);			
		}, 5000);		
	}		
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
