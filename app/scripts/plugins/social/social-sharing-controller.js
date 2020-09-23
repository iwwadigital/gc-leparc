(function() {
	'use strict';
	social.controller('shareController', [
		'$scope',
		'socialSharingFactory',
		'$cordovaSocialSharing',
		function($scope, Sharing, $cordovaSocialSharing) {
			var vm = this;
			vm.sharing = [];

			function init(data) {
				var sharing = [],
					sharingData = [{
						'htmlClass': 'share-facebook',
						'iconClass': 'ion-social-facebook',
						'shareData': {
							'network': 'facebook',
							'message': data.message,
							'file': data.file,
							'link': data.link
						}
					}, {
						'htmlClass': 'share-twitter',
						'iconClass': 'ion-social-twitter',
						'shareData': {
							'network': 'twitter',
							'message': data.message,
							'file': data.file,
							'link': data.link
						}
					}, {
						'htmlClass': 'share-whatsapp',
						'iconClass': 'ion-social-whatsapp',
						'shareData': {
							'network': 'whatsapp',
							'message': data.message,
							'file': data.file,
							'link': data.link
						}
					}, {
						'htmlClass': 'share-anywhere',
						'iconClass': 'ion-share',
						'shareData': {
							'network': 'anywhere',
							'message': data.message,
							'subject': data.subject,
							'file': data.file,
							'link': data.link
						}
					}, {
						'htmlClass': 'share-email',
						'iconClass': 'ion-email',
						'shareData': {
							'network': 'email',
							'message': data.message,
							'subject': data.subject,
							'toArr': data.toArr,
							'bccArr': data.bccArr,
							'ccArr': data.ccArr,
							'file': data.file
						}
					}];

				for (var index = 0, sLength = sharingData.length; index < sLength; index++) {
					if (data.networks.indexOf(sharingData[index].shareData.network) > -1) {
						sharing.push(sharingData[index]);
					}
				}

				vm.sharing = sharing;
			};

			vm.share = function(shareData) {
				console.log(shareData);
				var network = shareData.network,
					message = shareData.message,
					fileSrc = shareData.file,
					link = shareData.link,
					subject = shareData.subject,
					phone = shareData.phone,
					toArr = shareData.toArr,
					bccArr = shareData.bccArr,
					ccArr = shareData.ccArr;

				switch (network) {
					case 'anywhere':
						Sharing.shareAnywhere(message, subject, fileSrc, link);
						break;

					case 'twitter':
						Sharing.shareViaTwitter(message, null, (link + ""))
							.then(function(result) {}, function(err) {
								toast('Erro', 'Não foi possível compartilhar via Twitter.');
							});
						break;

					case 'facebook':
						Sharing.shareViaFacebook(message, null, link)
							.then(function(result) {}, function(err) {
								toast('Erro', 'Não foi possível compartilhar via Facebook.');
							})
						break;

					case 'whatsapp':
						Sharing.shareViaWhatsApp(message, null, link)
							.then(function(result) {}, function(err) {
								toast('Erro', 'Não foi possível compartilhar via WhatsApp.');
							})
						break;

					case 'email':
						Sharing.shareViaEmail(
								"Olá, </br> leia mais sobre esta no <a href='" + link + "'><b>Portal do IAF</b></a>.<br/><br/>Caso você não consiga acessar pelo link acima, copie e cole a URL a seguir: <br/><br/>" + link,
								subject, toArr, bccArr, ccArr, fileSrc)
							.then(function(result) {}, function(err) {
								toast('Erro', 'Não foi possível compartilhar via E-mail.');
							})
						break;
				}
			}

			$scope.$watch(
				function watchQuestions() {
					return vm.config;
				},
				function(config) {
					if (config) {
						init(config);
					}
				}, true
			);

		}
	]);
})();