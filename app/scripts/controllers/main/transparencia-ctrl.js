(function () {
	app.controller('TransparenciaController', [
		'$scope', 'TransparenciasService', '$stateParams', 'appConfig','RelatorioAcessoService',
		function ($scope, TransparenciasService, $stateParams, appConfig,RelatorioAcessoService) {
			var vm = this;
			vm.slides = [];
			vm.anexos = [];
			vm.hasMoreItems = true;



			TransparenciasService.getTransparencia($stateParams.id)
				.then((response) => {
					vm.transparencia = response.data.post;

					if (vm.transparencia.imagem_destacada !== null && vm.transparencia.imagem_destacada !== "") {
            vm.transparencia.imagem_destacada = appConfig.url + '/' + vm.transparencia.imagem_destacada;
          }

					vm.transparencia.midias.forEach((element) => {
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

      RelatorioAcessoService.setRelatorioAcesso($stateParams.id);

			window.analytics && window.analytics.trackView('Transparência');
		}
	]);
})();
