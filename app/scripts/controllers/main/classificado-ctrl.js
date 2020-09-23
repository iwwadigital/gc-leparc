(function () {
	'use strict';
	app.controller('ClassificadoController', [
		'ClassificadosService', '$stateParams', 'Session', '$ionicHistory', 'appConfig', 'ToasterService','RelatorioAcessoService',
		function (ClassificadosService, $stateParams, Session, $ionicHistory, appConfig, ToasterService,RelatorioAcessoService) {

			var vm = this;
			vm.classificado = {};
			vm.isOwner = false;
			vm.slides = [];
			vm.anexos = [];
			vm.hasMoreItems = true;

			ClassificadosService.getClassificado($stateParams.id).then((response) => {
				if (response.data.success) {
					vm.classificado = response.data.post;

					vm.classificado.midias.forEach((element) => {
						vm.slides.push(appConfig.url + '/' + element.arquivo);
					});

					if (vm.classificado.imagem_destacada) {
						vm.classificado.imagem_destacada = appConfig.url + '/' + vm.classificado.imagem_destacada;
					}

					if (vm.classificado.autor.imagem) {
						vm.classificado.autor.imagem = appConfig.url + '/' + vm.classificado.autor.imagem;
					}

					vm.isOwner = Session.user.id == vm.classificado.usuario_id;
				} else {
					ToasterService.show('Não foi possível recuperar informações do classificado.');
				}
				vm.hasMoreItems = false;
			});

			vm.deletar = function () {
				if (navigator && navigator.notification) {
					navigator.notification.confirm(
						'Você tem certeza que deseja deletar?',
						onSelected,
						'Deletar',
						['Sim', 'Não']
					);
				}

				function onSelected(buttonIndex) {
					if (buttonIndex === 1) {
						ClassificadosService.deleteClassificado(vm.classificado.id).then((response) => {
							if (response.data.success) {
								$ionicHistory.goBack();
								ToasterService.show('Classificado deletado com sucesso');
							}
						});
					}
				}
			}
      RelatorioAcessoService.setRelatorioAcesso($stateParams.id);

			window.analytics && window.analytics.trackView('Classificado');
		}
	]);
})();
