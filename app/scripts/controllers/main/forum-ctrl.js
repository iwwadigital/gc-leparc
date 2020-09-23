(function() {
	'use strict';
	app.controller('ForumController', [
		'$scope', 'ForumsService',
		function ($scope, ForumsService) {

			var vm = this;
			vm.hasMoreItems = true;
			vm.alreadyLoaded = false;
			vm.forum = [];

			vm.loadMore = function() {
				ForumsService.getPosts(vm.forum.length).then(response => {
					vm.forum = vm.forum.concat(response.data.post);
					vm.forum.map(el =>{
						if(el.autor !== undefined && el.autor !== null && el.autor.imagem !== undefined && el.autor.imagem !== null){
							if(el.autor.imagem.indexOf("sistema.globalcond") < 0 ){
							el.autor.imagem = "http://sistema.globalcond.com.br/"+el.autor.imagem;
							}
						}
					});
					vm.hasMoreItems = response.data.post.length > 0;
					vm.alreadyLoaded = true;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			}

			window.analytics && window.analytics.trackView('Fórum');
		}
	]);
})();
