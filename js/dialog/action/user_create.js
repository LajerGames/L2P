define(['jquery', 'l2p'], function ($, L2P) {
	return (function ($dialog) {
		function login() {
			L2P.facebook.login(function (user) {
				console.log('got auth', user);
				console.log('get api');
				L2P.facebook.api('/me', function (me) {
					console.log('got api', me);
return;
					fM.link.navigate('/user/create/', 'Magic Tune', {
						data:	{
							email:		me.email,
							first_name:	me.first_name,
							last_name:	me.last_name,
							username:	me.username
						}
					});
				});
			});
		}
		$dialog.find('[name="facebook_button"]').on('click', login);
	});
});