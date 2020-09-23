(function () {
	app.controller('DocumentoNaoAuditadoController', [
		'$scope', 'DocumentosNaoAuditadosService', '$stateParams', 'appConfig', 'RelatorioAcessoService',
		function ($scope, DocumentosNaoAuditadosService, $stateParams, appConfig, RelatorioAcessoService) {
			var vm = this;
			vm.slides = [];
			vm.anexos = [];
			vm.hasMoreItems = true;

			DocumentosNaoAuditadosService.getDocumento($stateParams.id)
				.then((response) => {
					vm.documento_nao_auditado = response.data.post;
          var tipo_post = response.data.post.tipo_post;
					if (vm.documento_nao_auditado.imagem_destacada !== null && vm.documento_nao_auditado.imagem_destacada !== "") {
            vm.documento_nao_auditado.imagem_destacada = appConfig.url + '/' + vm.documento_nao_auditado.imagem_destacada;
          }

					vm.documento_nao_auditado.midias.forEach((element) => {
						if (element.type === 'file') {
              element.arquivo = appConfig.urlDownload + element.arquivo+'&post_type=documento_nao_auditado&post_tipo_id='+tipo_post.id+'&token='+localStorage.getItem('token').replace(/"/g, '');
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
