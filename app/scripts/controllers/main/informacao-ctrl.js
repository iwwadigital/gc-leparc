(function() {
	'use strict';
	app.controller('InformacaoController', [
		'$scope', 'InformacoesService', '$stateParams', 'appConfig','RelatorioAcessoService',
		function($scope, InformacoesService, $stateParams, appConfig, RelatorioAcessoService) {

			var vm = this;
			vm.slides = [];
			vm.anexos = [];
			vm.hasMoreItems = true;

			vm.getInformacao = function() {
				InformacoesService.getInformacao($stateParams.id)
					.then(response => {
						vm.informacao = response.data.post;

						if (vm.informacao.imagem_destacada)
							vm.informacao.imagem_destacada = appConfig.url + '/' + vm.informacao.imagem_destacada;

						vm.informacao.midias.forEach(element => {
							if (element.type === 'file') {
								element.arquivo = appConfig.urlDownload + element.arquivo+'&token='+localStorage.getItem('token').replace(/"/g, '');
								vm.anexos.push(element);
							} else if (element.type === 'img') {
								vm.slides.push(appConfig.url + '/' + element.arquivo);
							}
						});

						$scope.$broadcast('scroll.infiniteScrollComplete');
						vm.hasMoreItems = false;
					});
			}

      RelatorioAcessoService.setRelatorioAcesso($stateParams.id);

			window.analytics && window.analytics.trackView('Informação');

		}
	]);
})();
