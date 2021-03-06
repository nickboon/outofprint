/* requires perspective drawing primitives*/
(function (app) {
	// config
	var defaultWidth = 100;
	
	app.createBaguaObject = function (perspective, w, yinColour, yangColour, alpha) {
		var drawing = app.createDrawingObject(perspective),
			primitives = app.createPrimitivesObject(drawing),	
			createLine = primitives.createLine,
			width = w || defaultWidth,
			halfWidth = width / 2,
			sixthWidth = width / 6;
		
		function buildYin (point, colour) {
			var points = [
				{x: point.x - halfWidth, y: point.y, z: point.z},
				{x: point.x - sixthWidth, y: point.y, z: point.z},
				{x: point.x + sixthWidth, y: point.y, z: point.z},
				{x: point.x + halfWidth, y: point.y, z: point.z}
			]
			
			return {
				points: points,
				primitives: [
					createLine(points[0], points[1], colour, alpha),
					createLine(points[2], points[3], colour, alpha)				
				]
			};			
		}

		function buildYang(point, colour) {
			var points = [
				{x: point.x - halfWidth, y: point.y, z: point.z},
				{x: point.x + halfWidth, y: point.y, z: point.z}
			]
			
			return {
				points: points,
				primitives: [createLine(points[0], points[1], colour, alpha)]
			};
		}
		
		function createTop(point, isYin, colour) {
			return isYin ? buildYin(
					{x: point.x, y: point.y - halfWidth, z: point.z}, colour
				) : buildYang(
					{x: point.x, y: point.y - halfWidth, z: point.z}, colour
				);
		}
		
		function createMiddle(point, isYin, colour) {
			return isYin ? buildYin(
				{x: point.x, y: point.y, z: point.z}, colour
			) : buildYang(
				{x: point.x, y: point.y, z: point.z}, colour
			);
		}

		function createBottom(point, isYin, colour) {
			return isYin ? buildYin(
					{x: point.x, y: point.y + halfWidth, z: point.z}, colour
				) : buildYang(
					{x: point.x, y: point.y + halfWidth, z: point.z}, colour
				);
		}
				
		function buildKun(point) {
			var topLine = createTop(point, true, yinColour, halfWidth, sixthWidth, createLine),
				middle = createMiddle(point, true, yinColour, halfWidth, sixthWidth, createLine),		
				bottom = createBottom(point, true, yinColour, halfWidth, sixthWidth, createLine),
				points = topLine.points.concat(middle.points).concat(bottom.points),
				primitives = topLine.primitives.concat(middle.primitives).concat(bottom.primitives);						
			return {
				points: points,
				primitives: primitives
			};
		}                  
		
		function buildQian(point) {
			var topLine = createTop(point, false, yangColour),
				middle = createMiddle(point, false, yangColour),		
				bottom = createBottom(point, false, yangColour),
				points = topLine.points.concat(middle.points).concat(bottom.points),
				primitives = topLine.primitives.concat(middle.primitives).concat(bottom.primitives);						
			return {
				points: points,
				primitives: primitives
			};		
		}
			
		function buildKan(point) {
			var topLine = createTop(point, false, yangColour),
				middle = createMiddle(point, true, yangColour),		
				bottom = createBottom(point, false, yangColour),
				points = topLine.points.concat(middle.points).concat(bottom.points),
				primitives = topLine.primitives.concat(middle.primitives).concat(bottom.primitives);						
			return {
				points: points,
				primitives: primitives
			};		
		}

		function buildXun(point) {
			var topLine = createTop(point, false, yangColour),
				middle = createMiddle(point, false, yangColour),		
				bottom = createBottom(point, true, yangColour),
				points = topLine.points.concat(middle.points).concat(bottom.points),
				primitives = topLine.primitives.concat(middle.primitives).concat(bottom.primitives);						
			return {
				points: points,
				primitives: primitives
			};		
		}

		function buildDui(point) {
			var topLine = createTop(point, true, yangColour),
				middle = createMiddle(point, false, yangColour),		
				bottom = createBottom(point, false, yangColour),
				points = topLine.points.concat(middle.points).concat(bottom.points),
				primitives = topLine.primitives.concat(middle.primitives).concat(bottom.primitives);						
			return {
				points: points,
				primitives: primitives
			};		
		}

		function buildLi(point) {
			var topLine = createTop(point, true, yinColour),
				middle = createMiddle(point, false, yinColour),		
				bottom = createBottom(point, true, yinColour),
				points = topLine.points.concat(middle.points).concat(bottom.points),
				primitives = topLine.primitives.concat(middle.primitives).concat(bottom.primitives);						
			return {
				points: points,
				primitives: primitives
			};		
		}

		function buildGen(point) {
			var topLine = createTop(point, false, yinColour),
				middle = createMiddle(point, true, yinColour),		
				bottom = createBottom(point, true, yinColour),
				points = topLine.points.concat(middle.points).concat(bottom.points),
				primitives = topLine.primitives.concat(middle.primitives).concat(bottom.primitives);						
			return {
				points: points,
				primitives: primitives
			};		
		}

		function buildZhen(point) {
			var topLine = createTop(point, true, yinColour),
				middle = createMiddle(point, true, yinColour),		
				bottom = createBottom(point, false, yinColour),
				points = topLine.points.concat(middle.points).concat(bottom.points),
				primitives = topLine.primitives.concat(middle.primitives).concat(bottom.primitives);						
			return {
				points: points,
				primitives: primitives
			};		
		}

		function buildGua(name, point) {
			switch (name) {
				case 'kun':
					return buildKun(point);
				case 'qian':
					return buildQian(point);				
				case 'kan':
					return buildKan(point);
				case 'xun':
					return buildXun(point);
				case 'dui':
					return buildDui(point);
				case 'li':
					return buildLi(point);
				case 'gen':
					return buildGen(point);
				case 'zhen':
					return buildZhen(point);
			}		
		}
			
		if (!perspective) {
			throw 'You need to pass in a perspective object to draw the bagua in 3d.'
		}
			
		return {
			buildYin: buildYin,
			buildYang: buildYang,
			buildKun: buildKun,
			buildQian: buildQian,
			buildKan: buildKan,
			buildXun: buildXun,
			buildDui: buildDui,
			buildLi: buildLi,
			buildGen, buildGen,
			buildZhen: buildZhen,
			buildGua: buildGua
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
