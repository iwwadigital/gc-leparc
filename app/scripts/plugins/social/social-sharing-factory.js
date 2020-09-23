(function() {
	'use strict';
	social.factory('socialSharingFactory', [
		'$cordovaSocialSharing',
		function($cordovaSocialSharing) {
			console.log('fac');
			// Share via native share sheet
			function shareAnywhere(message, subject, file, link) {
				return $cordovaSocialSharing.share(message, subject, file, link);
			}

			// Share via Twitter
			function shareViaTwitter(message, image, link) {
				return $cordovaSocialSharing.shareViaTwitter(message, image, link);
			}

			// Share via Facebook
			function shareViaFacebook(message, image, link) {
				return $cordovaSocialSharing.shareViaFacebook(message, image, link);
			}

			// Share via WhatsApp
			function shareViaWhatsApp(message, image, link) {
				return $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
			}

			// Share via Email
			function shareViaEmail(message, subject, toArr, bccArr, ccArr, file) {
				return $cordovaSocialSharing.shareViaEmail(message, subject, toArr, bccArr, ccArr, file);
			}

			return {
				shareAnywhere: shareAnywhere,
				shareViaTwitter: shareViaTwitter,
				shareViaFacebook: shareViaFacebook,
				shareViaWhatsApp: shareViaWhatsApp,
				shareViaEmail: shareViaEmail
			}
		}
	]);
})();