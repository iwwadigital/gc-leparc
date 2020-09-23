(function() {
  'use strict';
	app.controller('LoginInformacoesController', [
		'LoginService',
		'Session',
		'appConfig',
		function (LoginService, Session, appConfig) {
			var vm = this;

			LoginService.getInformacoes(THEME_CONFIG.empreendimentoId).then((response) => {
				vm.informacoes = response.data.informacoes;
			});

			if(window.analytics) {
	 			window.analytics.trackView('Login');
			}
		}
	]);
})();