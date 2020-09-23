(function() {
	app.controller('VisitantesController', [
		'$state', 'Session', 'VisitanteService', 'ToasterService',
		function($state, Session, VisitanteService, ToasterService) {
			var vm = this;

			vm.session = Session;
			vm.alreadyLoaded = false;
			vm.confirmado = 0;

			(vm.loadVisitantes = function() {
				VisitanteService.getVisitantes('&confirmado=' + vm.confirmado).then((response) => {
					vm.visitantes = response.data.visitantes;
					vm.alreadyLoaded = true;
				});
			})(vm);

			vm.duplicar = function(element) {
				var dupe = angular.copy(element);

				delete dupe.id;
				delete dupe.confirmado;
				delete dupe.responsavel_cadastro_id;
				delete dupe.responsavel_confirmacao;
				delete dupe.responsavel_confirmacao_id;
				delete dupe.chegada;
				delete dupe.codigo_acesso;
				delete dupe.local_visita;
				delete dupe.data_visita;
				delete dupe.data_cadastro;
				delete dupe.observacao;
				delete dupe.responsavel;
				delete dupe.rg;

				$state.go('app.visitante-novo', {
					dupe: JSON.stringify(dupe)
				});
			}

			vm.deletar = function(element, index) {
				if (navigator && navigator.notification) {
					navigator.notification.confirm(
						'Você tem certeza que deseja deletar a visita de ' + element.nome + '?',
						onSelected,
						'Deletar', ['Sim', 'Não']
					);
				}

				function onSelected(buttonIndex) {
					if (buttonIndex === 1) {
						VisitanteService.deleteVisitante(element.id).then((response) => {
							if (response.data.success) {
								vm.visitantes.splice(index, 1);
								ToasterService.show('Visitante removido com sucesso');
							} else {
								ToasterService.show('Não foi possível remover os dados do visitante ' + element.nome + '.');
							}
						});
					}
				}
			}

			window.analytics && window.analytics.trackView('Visitantes');
		}
	]);
})();
