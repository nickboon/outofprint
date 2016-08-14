/* required diagrams, points, primitives, shapes, solids, fakeSpheres, cookDingsKnife */
(function (app) {
	var cube;
	
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
					copy(points[i]),
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
				spheres.create({x: 0, y: 0, z: 0}, 141.42135623730950488016887242097)
			];
		
		cube = solids.createHexahedron();		
			
		return createdSolids.concat(
			createLabelsForCubeVertices(cube.points, primitives, shapes)		
		);
	}
	
	function setCanvas(width, height) {
		var canvas = document.getElementById('canvas');
		canvas.width  = width;
		canvas.height = height;
		return canvas;
	}
	
	app.run = function () {
		var diagram = app.createDefaultFullScreenDiagram(),
			perspective = diagram.perspective, 
			solidsList = createSolidsList(perspective)
			transformer = app.createAutoYRotationTransformer();
			
		diagram.addSolids(solidsList);
		diagram.stage.setTransformer(transformer);
	}	
	
	
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));

