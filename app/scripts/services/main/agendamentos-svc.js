(function() {
	'use strict';
	app.service('AgendamentosService', [
		'Session',
		'AjaxService',
		function(Session, AjaxService){
			var verifyIcon = function(status) {

				switch(status) {
					case 'analise' : return 'ion-clock';
					case 'confirmado' : return 'ion-checkmark-round';
					case 'negado' 	  : return 'ion-close';
					case 'cancelado'  : return 'ion-close';
				}
			}

			var cancelarAgendamento = function(agendamento) {
				return AjaxService.request({
					method: 'PATCH',
					url: apiURL + 'agendamento/' + agendamento.id,
					data: {
						agendamento_status_id : 1
					}
				}, 'Não foi possível cancelar o agendamento', 'Agendamento cancelado com sucesso');
			}

			var getAgendamentos = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'agendamento?usuario=' + Session.user.id
				}, 'Não foi possível recuperar os agendamentos');
			}

			var getAgendamento = function(id) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'agendamento/' +id
				}, 'Não foi possível recuperar os agendamento');
			}

			
			var getDependencias = function(offset) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'dependencia?empreendimento=' + Session.empreendimento.id + "&conjunto=" +offset.conjunto_id
				}, 'Não foi possível recuperar as dependências');
			};

			var getDependenciaHorarios = function(id, data, showHours) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'dependencias/horarios/' + id + "/" +data+ "/" +showHours
				}, 'Não foi possível recuperar as dependências');
			};

			var enviarSolicitacaoDeAgendamento = function(agendamento) {
				return AjaxService.request({
					method: 'POST',
					url: apiURL + 'agendamento',
					data: {
						dependencia_id: agendamento.dependencia.id,
						moradia_id: agendamento.moradia.id,
						usuario_id: Session.user.id,
						descricao: agendamento.descricao,
						data_inicio: agendamento.datas.dataInicio,
						data_fim: agendamento.datas.dataFim,
						periodicidade_ao_criar: agendamento.dependencia.periodicidade,

						agendamento_status_id: 2
					}
				});
			}

			return {
				verifyIcon: verifyIcon,
				enviarSolicitacaoDeAgendamento: enviarSolicitacaoDeAgendamento,
				getAgendamentos: getAgendamentos,
				getAgendamento: getAgendamento,
				getDependencias: getDependencias,
				cancelarAgendamento: cancelarAgendamento,
				getDependenciaHorarios: getDependenciaHorarios
			};
		}
	]);
})();
