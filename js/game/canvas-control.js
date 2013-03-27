define(['game/options', 'image!img/game/g-key.png'], function (options, gkey) {
	var	CanvasControl	= function (canvas) {
		this.canvas				= canvas;
		this.ctx				= canvas.getContext('2d');
		this.startItemsWidth	= options.leftMargin;
		this.width				= canvas.width;
		this.height				= canvas.height;
		this.gkey				= gkey;
	}
	CanvasControl.prototype.drawBaseLine = function (y, width) {
		this.ctx.moveTo(0, y + options.topPos);
		this.ctx.lineTo(width, y + options.topPos);
	};
	CanvasControl.prototype.drawBaseLines = function (niveau) {
		var	start	= niveau === 0 ? 50 : 550;

		this.ctx.beginPath();
		this.ctx.lineWidth = 2;
		this.drawBaseLine(start, this.width);
		this.drawBaseLine(start += options.lineHeight, this.width);
		this.drawBaseLine(start += options.lineHeight, this.width);
		this.drawBaseLine(start += options.lineHeight, this.width);
		this.drawBaseLine(start += options.lineHeight, this.width);
		this.ctx.stroke();
		this.ctx.closePath();
	};
	CanvasControl.prototype.drawStartItems = function (niveau, sharps, flats) {
		var	start	= niveau === 0 ? 50 : 550;
		this.ctx.fillStyle	= '#FFF';
		this.ctx.fillRect(0,0,this.startItemsWidth,this.height);

		this.ctx.beginPath();
		this.ctx.lineWidth = 3;
		this.ctx.moveTo(this.startItemsWidth + 100, options.topPos + 25);
		this.ctx.lineTo(this.startItemsWidth + 100, options.topPos + 50 + options.lineHeight * 5);
		this.ctx.strokeStyle = '#090';
		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.lineWidth = 2;
		this.drawBaseLine(start, this.startItemsWidth);
		this.drawBaseLine(start += options.lineHeight, this.startItemsWidth);
		this.drawBaseLine(start += options.lineHeight, this.startItemsWidth);
		this.drawBaseLine(start += options.lineHeight, this.startItemsWidth);
		this.drawBaseLine(start += options.lineHeight, this.startItemsWidth);
		this.ctx.strokeStyle = '#000';
		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.drawImage(this.gkey, 10, 10 + options.topPos);

		var	tonePos	= {
			A:	[0,3],
			B:	[1,3],
			C:	[2,4],
			D:	[0,4],
			E:	[1,4],
			F:	[2,4],
			G:	[0,4]
		};
		for(var toneName in sharps) {
			this.insertSharp(80 + tonePos[toneName][0] * 30, options.topPos + (options.tones.names[tonePos[toneName][1]][toneName].pos + 2) * options.lineHeight/2 + 4);
		}
		for(var toneName in flats) {
			this.insertFlat(80 + tonePos[toneName][0] * 30, options.topPos + (options.tones.names[tonePos[toneName][1]][toneName].pos + 1) * options.lineHeight/2 + 8);
		}
	};
	CanvasControl.prototype.insertSharp = function (x, y) {
		this.ctx.fillStyle	= '#000';
		this.ctx.font	= '48px sans-serif';
		this.ctx.fillText('#', x, y);
	};
	CanvasControl.prototype.insertFlat = function (x, y) {
		this.ctx.fillStyle	= '#000';
		this.ctx.font	= '48px sans-serif';
		this.ctx.fillText("\u266D", x, y);
	};
	CanvasControl.prototype.clear = function () {
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0, 0, this.width, this.height);
	};

	return CanvasControl;
});