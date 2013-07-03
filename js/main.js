if(typeof DEBUG === 'undefined') {
	var	DEBUG	= true;
}
if(DEBUG) {
	var	svgController,
		l2p,
		fm;
}
require.config({
	paths:	{
		'jquery':	'jquery-2.0.2.min',
		'tour':		'bootstrap-tour'
	},
	shim:	{
		highcharts:	{
			exports:	'Highcharts'
		},
		tour:		{
			exports:	'Tour'
		}
	}
});
require(['jquery', 'browserdetect'], function ($, AC) {
	var	$intro,
		wait	= 0;
	if(!AC.Detector.isChrome() || (AC.Detector.isWin() && !AC.Detector.winAtLeastVersion(6))) {
		require(['bootstrap.min'], function () {
			if(location.host !== 'l2p.fmads.dk') {
				$([
					'<div id="system_requirements">',
						'<h1>System Requirements</h1>',
						'<ul>',
							'<li>Windows Vista or newer</li>',
							'<li>Chrome version 27 or newer</li>',
						'</ul>',
					'</div>'
				].join('')).modal({
					backdrop:	'static',
					keyboard:	false,
					show:		true
				});
				return;
			}
		});
	}
	$intro	= $('#intro');

	if($intro.length > 0) {
		wait	= (new Date('2013-07-03 15:47:45 GMT')).getTime() - Date.now() - 1000;

		if(wait > 0) {
			$intro.addClass('show');

			setTimeout(function () {
				$intro.addClass('ready');

				l2p.countdown_test();
				setTimeout(function () {
					$intro.remove();
				}, 2000);
			}, wait);
		} else {
			$intro.addClass('ready');

			setTimeout(function () {
				$intro.remove();
			}, 2000);
		}
	}

	require(['fM', 'l2p'], function (fM, L2P) {
		if(wait < 0) {
			L2P.countdown_test();
		}
		l2p	= L2P;
		fm	= fM;
		switch(fM.link.fileName()) {
			case 'game.php':
				require(['fragments/game']);
				break;
		}

		$(function () {
			var	$CenteringContainer	= $('#CenteringContainer');
			L2P.click.set($CenteringContainer);

			$CenteringContainer.on('click', 'a[data-internal-navigation]', function (e) {
				e.preventDefault();
				var	$this		= $(this),
					navigateTo	= $this.attr('data-internal-navigation'),
					url			= $this.attr('href');

				fM.link.navigate(url, 'Magic Tune', {
					title:	'Magic Tune'
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
			var	hasFirstPopstate	= true; //false;
			$(window).on('popstate', function (e, a, b, c) {
				if(e.originalEvent) {
					return;
				}
				e.preventDefault();
				e.stopPropagation();
				DEBUG && console.log('a', e, a, b, c, location.pathname);
				if(L2P.$modal && L2P.$modal.is(':visible')) {
					L2P.$modal.modal('hide');
				}
				if(hasFirstPopstate) {
					popstateTitle(e);
				}

				switch(document.location.pathname) {
					case '/':
						L2P.navigate.home(e);
						break;
					default:
						if(hasFirstPopstate) {
							L2P.navigate.url(location.pathname);
						}
						break;
				}
				hasFirstPopstate	= true;
			});
			$(window).trigger('popstate', ['main.js']);

			L2P.form.inputValidation.error();
			$('form:first').each(function () {
				fM.form.autofocus(this);
			});
		});
	});
});