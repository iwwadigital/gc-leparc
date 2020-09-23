(function () {
	app.controller('InformacoesController', [
		'appConfig', '$scope', 'InformacoesService',
		function (appConfig, $scope, InformacoesService) {
			var vm = this;
			vm.informacoes = vm.categorias = [];
			vm.alreadyLoaded = false;
			vm.hasMoreItems = true;
      vm.loadMore = loadMore;
      var category;

			(function() {
				InformacoesService.getCategorias()
        .then( response => {
          vm.categorias = response.data.tipos_post;
        });
			})();

			vm.onChange = function(value) {
        category = value;
				vm.informacoes = [];
        vm.alreadyLoaded = false;
        vm.hasMoreItems = true;
        loadMore();
			};

			function loadMore() {
        var params = {
          offset: vm.informacoes.length,
          category: category
        };
				InformacoesService.getInformacoes(params)
        .then( response => {
          response.data.post.forEach( element => {
            if (element.imagem_destacada) {
              element.imagem_destacada = appConfig.url + '/' + element.imagem_destacada;
            }
          });

          vm.informacoes = vm.informacoes.concat(response.data.post);
          vm.hasMoreItems = response.data.post.length > 0;
          vm.alreadyLoaded = true;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
			}

			window.analytics && window.analytics.trackView('Informações');

		}
	]);
})();
