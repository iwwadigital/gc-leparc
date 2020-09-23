(function() {
	app.controller('TransparenciasController', [
		'appConfig', '$scope', 'TransparenciasService',
		function(appConfig, $scope, TransparenciasService) {

			var vm = this;
			vm.transparencias = [];
			vm.categorias = [];
			vm.alreadyLoaded = false;
      vm.hasMoreItems = true;
      var category;

			TransparenciasService.getCategorias()
				.then( response => {
					vm.categorias = response.data.tipos_post;
				});

			vm.onChange = function(value) {
        category = value;
				vm.transparencias = [];
        vm.alreadyLoaded = false;
        vm.loadMore();
			};

			vm.loadMore = function() {
        var params = {
          offset: vm.transparencias.length,
          category: category
        };
				TransparenciasService.getTransparencias(params)
					.then( response => {
						response.data.post.forEach( element => {
							if (element.imagem_destacada) {
								element.imagem_destacada = appConfig.url + '/' + element.imagem_destacada;
							}
							vm.transparencias.push(element);
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
