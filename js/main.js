var svgController,
	l2p,
	fm;
require.config({
	paths:	{
		'socket.io':	'/node/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.min'
	},
	shim:	{
		highcharts:	{
			exports:	'Highcharts'
		},
		'socket.io': {
			exports:	'io'
		}
	}
});
require(['jquery', 'fM', 'l2p'], function ($, fM, L2P) {
	l2p	= L2P;
	fm	= fM;
	switch(fM.link.fileName()) {
		case 'game.php':
			require(['fragments/game']);
			break;
	}

	$(document).ready(function () {

		var	$CenteringContainer	= $('#CenteringContainer');
		L2P.click.set($CenteringContainer);

		$CenteringContainer.on('click', 'a[data-internal-navigation]', function (e) {
			e.preventDefault();
			var	$this		= $(this),
				navigateTo	= $this.attr('data-internal-navigation'),
				url			= $this.attr('href');

			fM.link.navigate(url, 'Play.now', {
				title:	'Play.now'
			});

			return false;
		});
		function popstateTitle(e) {
			var	state;
			if(e && e.originalEvent && e.originalEvent.state) {
				state	= e.originalEvent.state;
				if(state.title === true) {
				} else if(state.title) {
					document.title	= state.title;
				} else {
					document.title	= $CenteringContainer.attr('data-default-title');
				}
			} else {
				document.title	= $CenteringContainer.attr('data-default-title');
			}
		}
		var	hasFirstPopstate	= false;
		$(window).on('popstate', function (e, a, b, c) {
			//console.log(e, a, b, c);
			if(L2P.$modal && L2P.$modal.is(':visible')) {
				L2P.$modal.modal('hide');
			}
			if(hasFirstPopstate) {
				popstateTitle(e);
			}
			switch(document.location.pathname) {
				case '/':
					L2P.navigate.home(e, false);
					break;
				default:
					if(hasFirstPopstate) {
						L2P.navigate.url(location.pathname, false);
					}
					break;
			}
			hasFirstPopstate	= true;
		});
		fM.link.navigate(document.location.pathname);

		$('#DialogContainer').each(function () {
			var	$this		= $(this),
				dialogType	= $this.attr('data-dialog');

			switch(dialogType) {
				case 'action':
					var	title		= $this.attr('data-dialog-title'),
						submitText	= $this.attr('data-dialog-submit-text'),
						color		= $this.attr('data-dialog-color'),
						html		= $this.html();

					L2P.dialog[dialogType](false, title, html, color, submitText, true);
					break;
				case 'info':
					var	title	= $this.attr('data-dialog-title'),
						buttons	= JSON.parse($this.attr('data-dialog-buttons')),
						color	= $this.attr('data-dialog-color'),
						script	= $this.attr('data-dialog-script'),
						html	= $this.html();

					L2P.dialog[dialogType](false, title, html, color, buttons, script);
					break;
				case 'game':
					var	gameData	= JSON.parse($this.attr('data-game-data')),
						title		= $this.attr('data-game-title'),
						type		= $this.attr('data-game-type');

					L2P.dialog[dialogType](false, title, gameData, type);
					break;
			}
		});

		L2P.form.inputValidation.error();
		$('form:first').each(function () {
			fM.form.autofocus(this);
		});
	});
});
function getQueryString() {
	var assoc  = {};
	var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
	var queryString = location.search.substring(1);

	return queryString;
}