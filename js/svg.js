define(function () {
	var	nameSpace	= {
		svg:	'http://www.w3.org/2000/svg',
		xlink:	'http://www.w3.org/1999/xlink'
	};

	function createSVGElement(nodeName) {
		return document.createElementNS(nameSpace.svg, nodeName);
	}

	var	SVGElement	= function (node) {
		this.node;
		this.ref;

		this.setNode(node);
	};
	SVGElement.prototype.setNode	= function (node) {
		if(node && node.nodeName) {
			this.node	= node;
		} else if(node) {
			this.node	= createSVGElement(node);
		}
		if(this.node) {
			this.node.SVGElement	= this;
		}

		return this;
	};
	SVGElement.prototype.setRef	= function (ref) {
		this.ref	= ref;

		return this;
	};
	SVGElement.prototype.removeChildNodes = function () {
		var	that	= this;
		while(this.node.childElementCount !== 0) {
			this.node.removeChild(this.node.childNodes[0]);
		}
	};
	SVGElement.prototype.setPos	= function (x, y) {
		this.node.setAttributeNS(null, 'x', x);
		this.node.setAttributeNS(null, 'y', y);

		return this;
	};
	SVGElement.prototype.setDimensions	= function (width, height) {
		this.node.setAttributeNS(null, 'width', width);
		this.node.setAttributeNS(null, 'height', height);

		return this;
	};
	SVGElement.prototype.setLine	= function (x1, y1, x2, y2) {
		this.node.setAttributeNS(null, 'x1', x1);
		this.node.setAttributeNS(null, 'y1', y1);
		this.node.setAttributeNS(null, 'x2', x2);
		this.node.setAttributeNS(null, 'y2', y2);

		return this;
	};
	SVGElement.prototype.setCircle	= function (cx, cy, r) {
		this.node.setAttributeNS(null, 'cx', cx);
		this.node.setAttributeNS(null, 'cy', cy);
		this.node.setAttributeNS(null, 'r', r);

		return this;
	};
	SVGElement.prototype.setEllipse	= function (cx, cy, rx, ry) {
		this.node.setAttributeNS(null, 'cx', cx);
		this.node.setAttributeNS(null, 'cy', cy);
		this.node.setAttributeNS(null, 'rx', rx);
		this.node.setAttributeNS(null, 'ry', ry);

		return this;
	};
	SVGElement.prototype.setLink	= function (url) {
		this.node.setAttributeNS(nameSpace.xlink, 'xlink:href', url);

		return this;
	};
	SVGElement.prototype.setFill	= function (fill) {
		this.node.setAttributeNS(null, 'fill', fill);

		return this;
	};
	SVGElement.prototype.setStroke	= function (stroke, width) {
		this.node.setAttributeNS(null, 'stroke', stroke);
		if(width) {
			this.setStrokeWidth(width);
		}

		return this;
	};
	SVGElement.prototype.setStrokeWidth	= function (strokeWidth) {
		this.node.setAttributeNS(null, 'stroke-width', strokeWidth);

		return this;
	};
	SVGElement.prototype.setAttribute	= function (name, value) {
		this.node.setAttributeNS(null, name, value);

		return this;
	};
	SVGElement.prototype.setLinkAttribute	= function (name, value) {
		this.node.setAttributeNS(nameSpace.xlink, 'xlink:'+name, value);

		return this;
	};
	SVGElement.prototype.setPath	= function (path) {
		this.node.setAttributeNS(null, 'd', path);

		return this;
	};
	SVGElement.prototype.setInnerText	= function (text, fontSize, fontWeight) {
		var	textNode	= document.createTextNode(text);
		this.node.appendChild(textNode);

		if(fontSize) {
			this.setFontSize(fontSize);
		}
		if(fontWeight) {
			this.setFontWeight(fontWeight);
		}

		return this;
	};
	SVGElement.prototype.setFontSize	= function (size) {
		this.node.style.fontSize	= size + 'px';

		return this;
	};
	SVGElement.prototype.setFontWeight	= function (weight) {
		this.node.style.fontWeight	= weight;

		return this;
	};
	SVGElement.prototype.setBorderRadius	= function (rx, ry) {
		if(ry === undefined) {
			ry	= rx;
		}
		this.node.setAttributeNS(null, 'rx', rx);
		this.node.setAttributeNS(null, 'ry', ry);

		return this;
	};
	SVGElement.prototype.setText	= function (text) {
		this.node.textContent	= text;

		return this;
	}
	SVGElement.prototype.animateAbs	= function (x, y, duration) {
		this.node.style.webkitTransition	= 'all '+duration+'s linear';
		this.node.style.webkitTransform		= 'translate3d('+x+'px,'+y+'px,0px)';

		return this;
	};
	SVGElement.prototype.animateX	= function (x, duration, callback) {
		var	that		= this,
			secPrPx		= duration / x,
			relativeX	= x - this.getPos().x,
			relativeDuration	= secPrPx * relativeX;

		this.node.style.webkitTransition	= 'all '+relativeDuration+'s linear';
		this.node.style.webkitTransform		= 'translate3d('+x+'px,0px,0px)';

		if(callback) {
			$(this.node).on('webkitTransitionEnd', function (e) {
				$(that.node).off('webkitTransitionEnd');
				callback.call(this, e);
			});
		}

		return this;
	};
	SVGElement.prototype.animateStopX	= function () {
		this.node.style.webkitTransition	= 'all 0s linear';
		this.node.style.webkitTransform		= 'translateX('+this.getPos().x+'px)';

		return this;
	};
	SVGElement.prototype.animateY	= function (y, duration) {
		var	secPrPx		= duration / y,
			relativeY	= y - this.getPos().y,
			relativeDuration	= secPrPx * relativeY;

		this.node.style.webkitTransition	= 'all '+relativeDuration+'s linear';
		this.node.style.webkitTransform		= 'translateY('+y+'px)';

		return this;
	};
	SVGElement.prototype.getPos	= function () {
		var CTM	= this.node.getCTM();

		return {
			x:	CTM.e,
			y:	CTM.f
		};
	};
	SVGElement.prototype.getAbsolutePos	= function () {
		var BBox	= this.node.getBBox();

		return {
			x:	BBox.x,
			y:	BBox.y,
			xr:	BBox.x + BBox.width,
			yb:	BBox.y + BBox.height,
			xc:	BBox.x + BBox.width / 2,
			yc:	BBox.y + BBox.height / 2
		};
	};
	SVGElement.prototype.appendTo	= function (elem) {
		if(elem.constructor === SVGElement) {
			elem.node.appendChild(this.node);
		} else {
			elem.appendChild(this.node);
		}

		return this;
	};

	return SVGElement;
});