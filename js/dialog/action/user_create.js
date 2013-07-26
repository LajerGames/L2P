define(['jquery', 'l2p'], function ($, L2P) {
	return (function ($dialog) {
		function login(e) {
			e.preventDefault();

			sessionStorage.removeItem('l2p_fb_autologin');

			L2P.facebook.login(function (user) {
				L2P.$modal.off('hide');
			});
		}
		$dialog.find('[name="facebook_button"]').on('click', login);
	});
});