(function() {
	app.controller('ClassificadosController', [
		'$scope', 'LoaderService', 'ClassificadosService', '$stateParams', 'appConfig',
		function ($scope, LoaderService, ClassificadosService, $stateParams, appConfig) {
			var vm = this;
			vm.hasMoreItems = true;
			vm.alreadyLoaded = false;
			vm.classificados = [];
      vm.categorias = [];
      vm.hasUserId = $stateParams.user_id ? true : false;
      vm.title = vm.hasUserId ? 'Meus Classificados' : 'Classificados';

			vm.onChange = function(type) {
				vm.classificados = [];
        vm.alreadyLoaded = false;
        vm.loadMore(type);
			}

			ClassificadosService.getCategorias().then( response => {
				vm.categorias = response.data.tipos_post;
			});

			vm.loadMore = function(type) {
        var params = {
          offset: vm.classificados.length,
          user_id: $stateParams.user_id,
          type: type
        };

				ClassificadosService.getClassificados(params).then( response => {
					response.data.post.forEach( element => {
						if (element.imagem_destacada) {
							element.imagem_destacada = appConfig.url + '/' + element.imagem_destacada;
						} else {
							element.imagem_destacada = null;
						}

						if (element.autor.imagem) {
							element.autor.imagem = appConfig.url + '/' + element.autor.imagem;
						}

						vm.classificados.push(element);
					});

					vm.alreadyLoaded = true;
					vm.hasMoreItems = response.data.post.length > 0;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			}

			window.analytics && window.analytics.trackView('Classificados');
		}
	]);
})();
