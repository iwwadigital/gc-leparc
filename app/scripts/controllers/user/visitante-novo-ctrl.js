(function() {
	'use strict';
	app.controller('VisitanteNovoController', [
		'$scope',
		'$state',
		'Session',
		'$ionicHistory',
		'VisitanteService',
		'$stateParams',
		'ToasterService',
		function($scope,$state, Session, $ionicHistory, VisitanteService, $stateParams, ToasterService) {
			var vm = this;
			vm.visitante = {};
			var date = new Date();
			var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
			var daysOfTheWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
			$scope.onezoneDatepicker = {
				date: date, // MANDATORY            
				startDate : date,         
				mondayFirst: false,                              
				disablePastDays: false,
				months: months, 
				daysOfTheWeek: daysOfTheWeek,
				disableSwipe: false,
				disableWeekend: false,
				showDatepicker: false,
				showTodayButton: true,
				calendarMode: false,
				hideCancelButton: false,
				hideSetButton: false,
				callback: function(value){
					// your code
				}
			};

			
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
				if($scope.onezoneDatepicker.date != null || $scope.onezoneDatepicker.date != undefined || $scope.onezoneDatepicker.date != ''){
					vm.visitante.data_visita = $scope.onezoneDatepicker.date;
				}

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
