<?php
echo '
<!DOCTYPE html>
<html>
	<svg height="500" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<g id="background">
			<line x1="0" y1="50" x2="100%" y2="50" stroke="black"/>
			<line x1="0" y1="75" x2="100%" y2="75" stroke="black"/>
			<line x1="0" y1="100" x2="100%" y2="100" stroke="black"/>
			<line x1="0" y1="125" x2="100%" y2="125" stroke="black"/>
			<line x1="0" y1="150" x2="100%" y2="150" stroke="black"/>
		</g>
		<g id="notes">
		</g>
		<g id="start">
			<image xlink:href="img/game/g-key.svg" x="0" y="0" width="63" height="190"/>
		</g>
	</svg>
	<script>
		var svgns		= "http://www.w3.org/2000/svg";
		var svglinkns	= "http://www.w3.org/1999/xlink";
		function createSVGElement(nodeType) {
			return document.createElementNS(svgns, nodeType);
		}
		function createSVGImage(url, x, y, width, height) {
			var	image	= createSVGElement("image");
			image.setAttributeNS(svglinkns, "xlink:href", url);
			image.setAttributeNS(null, "x", x);
			image.setAttributeNS(null, "y", y);
			image.setAttributeNS(null, "width", width);
			image.setAttributeNS(null, "height", height);

			return image;
		}
	</script>
</html>
';
?>