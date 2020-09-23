(function() {
  'use strict';
  app.controller('HomeController', [
		'$scope', 'MenuService', 'RecentPostsService', 'appConfig',
		function($scope, MenuService, RecentPostsService, appConfig) {
			var vm = this;
			vm.showCardSet = false;
			vm.hasMoreItems = true;

      vm.getDestaques = function() {
				RecentPostsService.getDestaques()
					.then(response => {
						response.data.post.forEach(element => {
							if (element.imagem_destacada)
								element.imagem_destacada = appConfig.url + '/' + element.imagem_destacada;
						});
						vm.recents = response.data.post;

						$scope.$broadcast('scroll.infiniteScrollComplete');
						vm.hasMoreItems = false;

						// Obter menus
						vm.menus = MenuService.getMenus().slice(1); // Retirar o item "Início"
					});
			};

			window.analytics && window.analytics.trackView('Principal');

		}
	]);
})();
