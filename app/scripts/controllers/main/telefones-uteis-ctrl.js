(function () {
	'use strict';
	app.controller('TelefonesController', [
		'TelefonesService',
		function (TelefonesService) {
			var vm = this;
			vm.hasMoreItems = true;

			TelefonesService.getContatos()
				.then(response => {
					vm.contatos = response.data.telefones_uteis;
					vm.hasMoreItems = false;
				});

			window.analytics && window.analytics.trackView('Telefones Úteis');
		}
	]);
})();