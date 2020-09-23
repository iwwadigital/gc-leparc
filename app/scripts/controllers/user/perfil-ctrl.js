(function() {
	app.controller('PerfilController', [
		'PhotoService', '$state', 'PerfilService', 'Session', '$scope', '$ionicPopup', '$ionicActionSheet', '$cordovaCamera', 'LoaderService', 'LocalStorageService',
		function(PhotoService, $state, PerfilService, Session, $scope, $ionicPopup, $ionicActionSheet, $cordovaCamera, LoaderService, LocalStorageService) {
			var vm = this;

			vm.options = PerfilService.getOptions();
			vm.session = Session;
			vm.timestamp = Date.now();

			vm.updateAvatar = function() {
				vm.hideSheet = $ionicActionSheet.show({
					buttons: [{
						text: 'Foto'
					}, {
						text: 'Galeria'
					}],
					cancelText: 'Cancelar',
					titleText: 'Selecione uma Opção',
					buttonClicked: (index) => {
						var source = index === 1 ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA;

						$cordovaCamera.getPicture({
							quality: 100,
							destinationType: Camera.DestinationType.FILE_URI,
							sourceType: source,
							allowEdit: true,
							encodingType: Camera.EncodingType.JPEG,
							targetWidth: 500,
							targetHeight: 500,
							popoverOptions: CameraPopoverOptions,
							saveToPhotoAlbum: false,
							correctOrientation: true
						}).then( image => {
							var options = new FileUploadOptions();
							options.fileKey = 'file[]';
							options.mimeType = 'image/jpeg';
							options.headers = {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/"/g, '')
							};
							options.transformRequest = angular.identity;
							options.fileName = Date.now() + '.jpg';
							options.params = {
								'timestamp': vm.timestamp,
								'usuario_id': Session.user.id,
								'type': 'img'
							};

							LoaderService.show();
							var ft = new FileTransfer();

							ft.upload(image, apiURL + 'midia', success => {
								var uploaded = JSON.parse(success.response);

								if (uploaded.success) {
									PerfilService.updateUser({
										imagem: uploaded.midias[0].arquivo,
										timestamp: vm.timestamp
									}).then( response => {
										if (response.data.success) {
											Session.user.imagem = url + '/' + response.data.usuario.imagem;
											LocalStorageService.storeUser();
										} else {
											console.log('falha', response);
										}
									}).finally( () => {
                    vm.hideSheet();
                    LoaderService.hide();
                  });
								}

							}, failure => {
								console.log(failure);
							}, options);

						}, error => {
							console.log(error);
							vm.hideSheet();
              LoaderService.hide();
						});
					}
				});
			}

			window.analytics && window.analytics.trackView('Perfil');
		}
	]);
})();
