/* requires cubeTransformations, gua */
(function (app) {
	// create and return API for this module
	app.createBaguaCube = function (
		perspective, cubeWidth, guaWidth, yinColour, yangColour, alpha
	) {
		var bagua = app.createBaguaObject(
				perspective, guaWidth, yinColour, yangColour, alpha
			),
			cubeTransformations = app.createCubeTransformationsObject(cubeWidth),
			points = cubeTransformations.getPoints(),
			primitives = [],
			frontPoint;		

		function addGua(gua) {
			points = points.concat(gua.points);
			primitives = primitives.concat(gua.primitives);
		}

		function rotateAboutY(angle) {	
			points.forEach(function (point) {
					cubeTransformations.rotateAboutY(point, angle);
			});		
		}
				
		function tilt() {
			points.forEach(cubeTransformations.rotateTiltAngleAboutX);		
		}

		function tiltBack() {
			points.forEach(cubeTransformations.rotateMinusTiltAngleAboutX);		
		}

		function rotateAlongEdge() {
			points.forEach(cubeTransformations.rotateAlongEdgeAboutX);		
		}

		function rotateAcrossFace() {
			points.forEach(cubeTransformations.rotateAlongFaceDiagonalAboutX);
		}
		
		function bringVertex0ToFront() { 				
			rotateAboutY(Math.PI / 4);
			tilt();
			frontPoint = {x: points[0].x, y: points[0].y, z: points[0].z};
		}
		
		function bringVertex4Tofront() {
			rotateAcrossFace();
			tiltBack();
			rotateAboutY(Math.PI / 2);
			tilt();			
		}
	
		function mapGua(vertex) {
			if (vertex === 'undefined') {
				throw 'MapGua function must be passed a vertex index (0-7).';
			}
			
			switch(vertex) {
				case 0: 
					return 'kun';
				case 1: 
					return 'xun';
				case 2: 
					return 'gen';
				case 3: 
					return 'li';
				case 4: 
					return 'dui';
				case 5: 
					return 'kan';
				case 6: 
					return 'qian';
				case 7: 
					return 'zhen';				
			}
		}
		
		/* default vertices
		 * ================
		 * 		
		 *	0-------1
		 *	|\     /|
		 *	| 4---5 |
		 *	| |   | |
		 *	| 7---6 |
		 *	|/     \|
		 *	3-------2
		 */
		 		
		/* gua		vertex
		 * ===============
		 * ☷ kun	0
		 * ☵ li		3
		 * ☰ qian	6
		 * ☲ kan	5
		 * ☱ dui	4
		 * ☳ zhen	7
		 * ☶ gen	2
		 * ☴ xun	1
		 */

		if (!perspective) {
			throw 'You need to pass in a perspective object to create a bagua cube.';
		}

		bringVertex0ToFront();
		
		addGua(bagua.buildKun(frontPoint));
		rotateAlongEdge();
		addGua(bagua.buildLi(frontPoint));
		rotateAcrossFace();
		addGua(bagua.buildQian(frontPoint));
		rotateAlongEdge();
		addGua(bagua.buildKan(frontPoint));

		bringVertex4Tofront();
		
		addGua(bagua.buildDui(frontPoint));
		rotateAlongEdge();
		addGua(bagua.buildZhen(frontPoint));
		rotateAcrossFace();
		addGua(bagua.buildGen(frontPoint));
		rotateAlongEdge();
		addGua(bagua.buildXun(frontPoint));
		
		return {
			primitives: primitives,
			points: points,
			mapGua: mapGua
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
