(function () {
	app.controller('EventoController', [
		'EventosService', '$stateParams', 'appConfig', '$scope', 'RelatorioAcessoService',
		function (EventosService, $stateParams, appConfig, $scope, RelatorioAcessoService) {
			var vm = this;
			vm.anexos = [];
			vm.slides = [];
			vm.alreadyLoaded = false;
			vm.hasMoreItems = true;

			EventosService.getEvento($stateParams.id).then(response => {
        vm.evento = response.data.post;
        vm.dataInicio = vm.evento.post_meta[0].meta_value.dma;
        vm.dataTermino = vm.evento.post_meta[1].meta_value.dma;

				if (vm.evento.imagem_destacada) {
					vm.evento.imagem_destacada = appConfig.url + '/' + vm.evento.imagem_destacada;
				}

				vm.evento.midias.forEach(element => {
					if (element.type === 'file') {
						element.arquivo = appConfig.urlDownload + element.arquivo+'&token='+localStorage.getItem('token').replace(/"/g, '');
						vm.anexos.push(element);
					} else if (element.type === 'img') {
						vm.slides.push(appConfig.url + '/' + element.arquivo);
					}
				});

				vm.alreadyLoaded = true;
				vm.hasMoreItems = false;
				$scope.$broadcast('scroll.infiniteScrollComplete');
      });

      RelatorioAcessoService.setRelatorioAcesso($stateParams.id);

			window.analytics && window.analytics.trackView('Evento');
		}
	]);
})();
