(function() {
	'use strict';
	app.controller('ForumRegrasController', [
		'$scope',
		'LoaderService',
		'ForumsService',
		'appConfig',
		function($scope, LoaderService, ForumsService, appConfig) {

			var vm = this;

			ForumsService.getRegras(THEME_CONFIG.empreendimentoId).then((response) => {
				vm.regras = response.data.regras_forum;
			});
		}
	]);
})();