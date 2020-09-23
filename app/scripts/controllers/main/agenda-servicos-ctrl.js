(function() {
	app.controller('AgendaController', [
		'LoaderService', 'AgendamentosService','$ionicHistory', 'Session','$scope',
		function (LoaderService, AgendamentosService, $ionicHistory, Session, $scope) {
			var vm = this;
			vm.areas = [];
			vm.horariosDisponiveis = [];
			vm.user = Session.user;
			vm.agendamento = [];
			vm.horarioSelecionado = {};
			vm.getDependencias = getDependencias;
			$scope.onezoneDatepicker = {
				date: '',
				showDatepicker: true,				
				mondayFirst: true,
				calendarMode: true,
				disablePastDays: true,
				months : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
				daysOfTheWeek : ['Do','Seg','Ter','Quar','Qui','Sex','Sáb'],
			    callback: (t) => {			    	
			      vm.getHorariosDisponiveis(t);
			    }
			};

			
			if (vm.user.moradias.length == 1) {
				vm.agendamento.moradia = vm.user.moradias[0];
				getDependencias();
			}

			function getDependencias() {
		        LoaderService.show();
		        AgendamentosService.getDependencias(vm.agendamento.moradia)
		        .then( response => {
							vm.dependencias = response.data.dependencias;
		        })
		        .finally(LoaderService.hide);
			}

			vm.enviarSolicitacao = function() {	
				
		        AgendamentosService.enviarSolicitacaoDeAgendamento(vm.agendamento)
		        .then( response => {
		        			if(response.data.success){
								$ionicHistory.goBack();
		        			}
						});
			};

			vm.resetHorarios = function() {
				vm.getHorariosDisponiveis(now(new Date(), false),'true');			
				vm.horariosDisponiveis = [];
				
			}

			vm.getHorariosDisponiveis = function(data,showHours) {
				AgendamentosService.getDependenciaHorarios(vm.agendamento.dependencia.id, data, showHours)
        		.then( response => {
        			vm.horariosDisponiveis = response.data.data;
        			
				});
					
			};

			window.analytics && window.analytics.trackView('Agendamento de Serviços');
		}
	]);
})();
