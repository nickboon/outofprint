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
			vertices = cubeTransformations.getPoints(),
			points = [],
			primitives = [],
			frontPoint;		

		function addGua(gua) {
			points = points.concat(gua.points);
			primitives = primitives.concat(gua.primitives);
		}

		function rotateAboutY(angle) {	
			vertices.forEach(function (point) {
					cubeTransformations.rotateAboutY(point, angle);
			});
			points.forEach(function (point) {
					cubeTransformations.rotateAboutY(point, angle);
			});		
		}
				
		function tilt() {
			vertices.forEach(cubeTransformations.rotateTiltAngleAboutX);
			points.forEach(cubeTransformations.rotateTiltAngleAboutX);		
		}

		function tiltBack() {
			vertices.forEach(cubeTransformations.rotateMinusTiltAngleAboutX);
			points.forEach(cubeTransformations.rotateMinusTiltAngleAboutX);		
		}

		function rotateAlongEdge() {
			vertices.forEach(cubeTransformations.rotateCubeAlongEdgeAboutX);
			points.forEach(cubeTransformations.rotateAlongEdgeAboutX);		
		}

		function rotateAcrossFace() {
			vertices.forEach(cubeTransformations.rotateAlongFaceDiagonalAboutX);
			points.forEach(cubeTransformations.rotateAlongFaceDiagonalAboutX);
		}
		
		function bringVertex0ToFront() { 				
			rotateAboutY(Math.PI / 4);
			tilt();
			frontPoint = {x: vertices[0].x, y: vertices[0].y, z: vertices[0].z};
		}
		
		function bringVertex4Tofront() {
			rotateAcrossFace();
			tiltBack();
			rotateAboutY(Math.PI / 2);
			tilt();			
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
			vertices: vertices
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
