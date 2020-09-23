(function() {
	app.controller('EventosController', [
		'$scope', 'LoaderService', 'EventosService', 'appConfig',
		function ($scope, LoaderService, EventosService, appConfig) {
			var vm = this;
			vm.hasMoreItems = true;
			vm.alreadyLoaded = false;
			vm.eventos = vm.categorias = [];

			vm.onChange = function() {
				vm.eventos = [];
        vm.alreadyLoaded = false;
        vm.hasMoreItems = true;
        vm.loadMore();
			};

      function getEventosFiltrados() {
        return EventosService.getEventosFiltrados(vm.eventos.length, vm.date);
      };

      function getEventos() {
        return EventosService.getEventos(vm.eventos.length);
      }

      function setEventos(response) {
        response.data.post.forEach( element => {
          if (element.imagem_destacada) {
            element.imagem_destacada = appConfig.url + '/' + element.imagem_destacada;
          }
        });
        vm.eventos = vm.eventos.concat(response.data.post);
        vm.hasMoreItems = response.data.post.length > 0;
        vm.alreadyLoaded = true;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }

			vm.loadMore = function() {
        if ( !vm.date ) {
          getEventos().then( response => { setEventos(response) } );
        }
        else {
          getEventosFiltrados().then( response => { setEventos(response) } );
        }
			}

			window.analytics && window.analytics.trackView('Eventos');
		}
	]);
})();
