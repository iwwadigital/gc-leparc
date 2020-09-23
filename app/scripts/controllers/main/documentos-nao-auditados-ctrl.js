(function() {
	app.controller('DocumentosNaoAuditadosController', [
		'appConfig', '$scope', 'DocumentosNaoAuditadosService',
		function(appConfig, $scope, DocumentosNaoAuditadosService) {

			var vm = this;
			vm.documentos_nao_auditados = [];
			vm.categorias = [];
			vm.alreadyLoaded = false;
      vm.hasMoreItems = true;
      var category;

			DocumentosNaoAuditadosService.getCategorias()
				.then( response => {
					vm.categorias = response.data.tipos_post;
				});

			vm.onChange = function(value) {
        category = value;
				vm.documentos_nao_auditados = [];
        vm.alreadyLoaded = false;
        vm.loadMore();
			};

			vm.loadMore = function() {
        var params = {
          offset: vm.documentos_nao_auditados.length,
          category: category
        };
				DocumentosNaoAuditadosService.getDocumentos(params)
					.then( response => {
						response.data.post.forEach( element => {
							if (element.imagem_destacada) {
								element.imagem_destacada = appConfig.url + '/' + element.imagem_destacada;
							}
							vm.documentos_nao_auditados.push(element);
						});

						vm.alreadyLoaded = true;
						vm.hasMoreItems = response.data.post.length > 0;
						$scope.$broadcast('scroll.infiniteScrollComplete');
					});
			}

			window.analytics && window.analytics.trackView('Transparências');
		}
	]);
})();
