(function() {
	app.controller('OuvidoriaController', [
		'OuvidoriaService',
		function(OuvidoriaService) {
			var vm = this;
			vm.alreadyLoaded = false;
			vm.filter_status = null;
			vm.status = [
				{
					id : "Aberto",
					titulo : "Aberto",
					is_status : true 
				},
				{
					id : "Em andamento",
					titulo : "Em andamento" 
				},
				{
					id : "Finalizado",
					titulo : "Finalizado" 
				},
			]

			
			vm.onChange = function(){
				console.log('test');
				console.log(vm.filter_status)
				OuvidoriaService.getOcorrencias(vm.filter_status).then(response => {
					vm.chamados = response.data.chamados;
					vm.alreadyLoaded = true;
				});
			}
			vm.onChange();
			window.analytics && window.analytics.trackView('Ouvidoria Ocorrências');
		}
	]);
})();
