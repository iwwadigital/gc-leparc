(function() {
	'use strict';
	app.service('NotificacoesService', [
		'AjaxService',
		'Session',
		function(AjaxService, Session){
			var getNotificacoes = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'notificacoes?usuario_id=' + Session.user.id
				}, 'Não foi possível recuperar notificações');
			}

			var getCountNotificacoes = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'count-notificacoes?usuario_id=' + Session.user.id
				}, 'Não foi possível recuperar a quantidade de notificações');
			}

			var marcarNotificacoesComoLidas = function(data) {
				return AjaxService.request({
					method: 'PATCH',
					url: apiURL + 'notificacoes/' + Session.user.id,
					data: data
				});
			}

			return {
				getNotificacoes: getNotificacoes,
				getCountNotificacoes: getCountNotificacoes,
				marcarNotificacoesComoLidas: marcarNotificacoesComoLidas
			};
		}
	]);
})();