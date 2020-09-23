(function() {
	'use strict';
	app.service('PhotoService', [
		'Session', 'PerfilService', '$state',
		function(Session, PerfilService, $state) {

			var takePhoto = function() {
				if (navigator && navigator.notification) {
					navigator.notification.confirm(
						'Selecione uma opção',
						onSelected,
						'Foto', ['Tirar foto', 'Carregar foto']
					);
				}
			};

			function onSelected(buttonIndex) {
				if (buttonIndex > 0) {
					if (navigator && navigator.camera) {
						var source = buttonIndex == 1 ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY;

						navigator.camera.getPicture(onSuccess, onFail, {
							quality: 70,
							destinationType: Camera.DestinationType.DATA_URL,
							sourceType: source,
							allowEdit: true,
							encodingType: Camera.EncodingType.JPEG,
							targetWidth: 480,
							targetHeight: 480,
							popoverOptions: CameraPopoverOptions,
							saveToPhotoAlbum: false,
							correctOrientation: true
						});
					}
				}
			}

			function onSuccess(fileURL) {
				var imagem = "data:image/jpeg;base64," + fileURL;

				PerfilService.updateUser({
					imagem: imagem
				}).then((response) => {
					if (response.data.success) {
						Session.user.imagem = imagem;
						$state.reload();
					}
				});
			}

			function onFail(message) {
				console.log(message);
			}

			return {
				takePhoto: takePhoto
			};
		}
	]);
})();