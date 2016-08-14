
/* required diagrams, points, primitives, shapes, solids, fakeSpheres, cookDingsKnife */
(function (app) {
	var cube,
		radius = 141.42135623730950488016887242097;
	
	function getBagua() {
		return [
			'☰',	// front centre
			'☱',	// front right
			'☳',	// back right
			'☲',	// front bottom
			'☴',	// front left
			'☵',	// back top
			'☷',	// back centre
			'☶'	// back left
		];
	}
	
	function createLabelsForCubeVertices(points, primitives, shapes) {
		var solids = [],
			labels = getBagua(),
			i,
			copy = app.createPointsObject().copy;
			
		for (i = points.length - 1; i >= 0; i -= 1)
		{
			primitive = (
				shapes.createLabel(
					labels[i], 
					//copy(points[i]),
					points[i],
					'#000000',
					.5,
					null,
					true
				)
			);
			solids.push(primitives.toSolid(primitive))
		}
				
		return solids;
	}	

	function createSolidsList(perspective) {
		var drawing = app.createDrawingObject(perspective),
			shapes = app.createShapesObject(drawing),
			primitives = app.createPrimitivesObject(drawing),			
			solids = app.createSolidsObject(primitives),
			spheres = app.createFakeSpheresObject(perspective),
			createdSolids = [
				app.createCookDingsKnife(perspective),
				spheres.create({x: 0, y: 0, z: 0}, radius)
			];
		
		cube = solids.createHexahedron();		
			
		return createdSolids.concat(
			createLabelsForCubeVertices(cube.points, primitives, shapes)		
		);
	}
	
	function setCanvas(width, height) {
		var canvas = document.getElementById('canvas');
		canvas.width  = width;
		canvas.height = height
		return canvas;
	}
	
	app.run = function () {
		var diagram = app.createDefaultFullScreenDiagram(),
			perspective = diagram.perspective, 
			solidsList = createSolidsList(perspective);
			
		function getRandomNumberBetween(min, max) {
			return Math.floor(Math.random()*(max-min+1)+min);
		}		
				
		function changeGua() {
			var transformer,
			n;
			
			n = getRandomNumberBetween(0, 7);
			transformer = app.createDirectedRotationTransformer(cube.points[n]);
			diagram.stage.setTransformer(transformer);			
		}
		
		diagram.addSolids(solidsList);				
		window.setInterval(changeGua, 5000);		
	}		
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
