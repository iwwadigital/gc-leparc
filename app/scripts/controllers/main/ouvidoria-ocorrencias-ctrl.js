(function() {
	app.controller('OuvidoriaController', [
		'OuvidoriaService',
		function(OuvidoriaService) {
			var vm = this;
      vm.alreadyLoaded = false;

			OuvidoriaService.getOcorrencias().then(response => {
				vm.chamados = response.data.chamados;
				vm.alreadyLoaded = true;
			});

			window.analytics && window.analytics.trackView('Ouvidoria Ocorrências');
		}
	]);
})();
