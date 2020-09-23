(function() {
	'use strict';
	app.controller('VisitanteNovoController', [
		'$state',
		'Session',
		'$ionicHistory',
		'VisitanteService',
		'$stateParams',
		'ToasterService',
		function($state, Session, $ionicHistory, VisitanteService, $stateParams, ToasterService) {
			var vm = this;
			vm.visitante = {};

			// vm.terminoHasChanged = function() {
			// 	let inicio = vm.visitante.data_visita;
			// 	let fim = vm.visitante.data_visita_termino || vm.visitante.data_visita;

			// 	if(fim >= inicio) {
			// 		inicio = inicio.getTime();
			// 		fim = fim.getTime();

			// 		//A operação com Math.ceil calcula a diferença entre dias das datas de início e fim
			// 		vm.visitante.data_termino_invalida = Math.ceil((fim - inicio)/(1000 * 3600 * 24)) > 90;

			// 		if(vm.visitante.data_termino_invalida)
			// 			ToasterService.show("Só é possível agendar visitas com até 90 dias de diferença entre a data de início e fim");
			// 	} else {
			// 		ToasterService.show("A data de término da visita não pode ser anterior à data de início");
			// 	}
			// }

			vm.validate = function() {
				var error = false;

				if (!vm.visitante.nome)
					error = "O campo nome é obrigatório";
				else if (!vm.visitante.data_visita)
					error = "O campo data da visita é obrigatório";
				else if (!vm.visitante.moradia)
					error = "O campo moradia a ser visitada é obrigatório";
				else if (!vm.visitante.descricao)
					error = "O campo tipo de visita é obrigatório";
				// else if(vm.visitante.data_visita_termino && vm.visitante.data_visita_termino < vm.visitante.data_visita)
				// 	error = "A data de término da visita não pode ser anterior à data de início";
				// else if(vm.visitante.data_termino_invalida)
				// 	error = "Só é possível agendar visitas com até 90 dias de diferença entre a data de início e fim";

				if (error)
					ToasterService.show(error);

				return error;
			}

			vm.salvar = function() {
				if (vm.validate() !== false) {
					document.querySelector('form').classList.remove('ng-pristine');
					document.querySelectorAll('.input.ng-pristine').forEach(element => element.classList.remove('ng-pristine'));
					return;
				}

				var data = {
					nome: vm.visitante.nome,
					// telefone: vm.visitante.telefone,
					// email: vm.visitante.email,
					placa: vm.visitante.placa,
					qtd_pessoas: vm.visitante.qtd_pessoas,
					responsavel: Session.user.id,
					moradia_id: vm.visitante.moradia.id,
					descricao: vm.visitante.descricao,
					data_visita: now(vm.visitante.data_visita),
					data_visita_termino: now(vm.visitante.data_visita_termino || vm.visitante.data_visita),
				};

				if (vm.visitante.id)
					data['id'] = vm.visitante.id

				VisitanteService.createVisitante(data).then((response) => {
					if (response.data.success) {
						ToasterService.show('Visitante cadastrado com sucesso');
						$ionicHistory.goBack();
					}
				});
			}

			if ($stateParams.dupe) {
        vm.visitante = JSON.parse($stateParams.dupe);
			}

			window.analytics && window.analytics.trackView('Novo Visitante');
		}
	]);
})();
