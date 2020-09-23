(function() {
	'use strict';
	app.controller('VisitanteController', [
		'$state', '$stateParams', '$ionicHistory', 'Session', 'VisitanteService', 'ToasterService',
		function($state, $stateParams, $ionicHistory, Session, VisitanteService, ToasterService) {
			var vm = this;

			vm.session = Session;

			VisitanteService.getVisitante($stateParams.id).then((response) => {
				if (response.data.success)
					vm.visitante = response.data.visitante;
				else
					ToasterService.show('Não foi possível apresentar os dados do visitante. Por favor, tente novamente mais tarde');
			});

			vm.deletar = function() {
        console.log('Deletar visitante');
				if (navigator && navigator.notification) {
					navigator.notification.confirm(
						'Você tem certeza que deseja deletar a visita de ' + vm.visitante.nome + '?',
						onSelected,
						'Deletar', ['Sim', 'Não']
					);
				}

				function onSelected(buttonIndex) {
					if (buttonIndex === 1) {
						VisitanteService.deleteVisitante(vm.visitante.id).then((response) => {
							ToasterService.show('Visita cancelada com sucesso');
							$ionicHistory.goBack();
						});
					}
				}
			}

      window.analytics && window.analytics.trackView('Visitante');
		}
	]);
})();
