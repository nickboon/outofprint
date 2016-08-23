
/* required diagrams, bagua, fakeSpheres, cookDingsKnife */
(function (app) {
	var tranformations,
		isDisplayVersion,
		radius = 141.42135623730950488016887242097,			
		baguaSphere,
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
		
	function createTransformingSolids(perspective) {
		var lineColour = isDisplayVersion ? '#ff0000': '#ff0000',
			fillColour = isDisplayVersion ? '#000000': '#ffffff',
			bladeEdgeColour =  isDisplayVersion ? '#00ff00': '#000000',
			cookDingsKnife = app.createCookDingsKnife(perspective,
				lineColour, fillColour),
			spheres = app.createFakeSpheresObject(perspective);
			
			
		cookDingsKnife.primitives[0] = cookDingsKnife.createBladeEdge(
			bladeEdgeColour);	
		
		setInitialOrientationsForKnife(cookDingsKnife);
		
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
			shiftHorizon = -200,
			knife,
			bagua,
			knifeKeyBoardTransformer;
			

		guaYinColour =  isDisplayVersion ? '#00ff00': '#000000';
		guaYangColour = '#ff0000';
		gua = app.createGuaObject(perspective, guaWidth, guaYinColour, guaYangColour);
		currentGua = gua.buildKun(currentGuaPoint);
		nextGua = gua.buildQian(nextGuaPoint);
		transformingSolids = createTransformingSolids(perspective);
		solids = transformingSolids.concat([currentGua, nextGua]);
		knife = solids[0];
		bagua = solids[2];				
		
		perspective.shiftVanishingPointY(shiftHorizon);		
		diagram.stage.addSolids(solids);

		//baguaTransformer = transformations.createKeyboardDrivenTransformer([bagua]);
		firstTransformer = transformations.createKeyboardDrivenTransformer([bagua]);
		diagram.stage.setTransformers([firstTransformer]);
		
		window.setInterval(function () {
						
			//change colour and alpha like this
			var solidsFromStage = diagram.stage.getSolids();
			
			solids[0].primitives.forEach(function (primitive) {
				//if(primitive.setColour) {
					//primitive.setColour('#00ff00');					
				//}
			});
			var randomIndex = getRandomNumberBetween(0, 7);
			 // directedTransformer = app.createDirectedRotationTransformer(
				 // transformingSolids, baguaSphere.points[randomIndex]
			  // );

			 // var directedKnifeTransformer = app.createDirectedRotationTransformer(
				  // [knife], baguaSphere.points[randomIndex]
			  // );


			//var secondTransformer = transformations.createKeyboardDrivenTransformer([knife]);
			//diagram.stage.setTransformers([secondTransformer]);			  
		}, 10000);		
	}		
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
