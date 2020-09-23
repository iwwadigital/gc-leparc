(function() {
	'use strict';
	app.controller('ConfiguracoesController', [
		'ConfigurationsService',
		function(ConfigurationsService) {

			var vm = this;

			vm.tags = ConfigurationsService.getConfigurationsList();

			//Salva as tags em caso de alterações
			vm.saveTags = function() {
				var configurations = {};

				angular.forEach(vm.tags, function(element, index) {
					configurations[element.key] = element.selected;
				});

				ConfigurationsService.changeConfigurations(configurations);
			}

			//Analytics
			if (window.analytics) {
				window.analytics.trackView('Configurações');
			}
		}
	]);
})();