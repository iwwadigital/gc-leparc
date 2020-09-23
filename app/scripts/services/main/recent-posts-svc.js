(function() {
	'use strict';
	app.service('RecentPostsService', [
		'Session', 'AjaxService',
		function(Session, AjaxService) {

			return {
				getDestaques: getDestaques
			}

			function getDestaques() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post?empreendimento=' + Session.empreendimento.id + '&except=classificado&is_destaque=1'
				}, 'Não foi possível recuperar destaques');
			}

			// function getDestaques() {
			// 	return AjaxService.request({
			// 		method: 'GET',
			// 		url: apiURL + 'post?empreendimento=' + JSON.parse(localStorage.empreendimento).id + '&except=classificado&is_destaque=1'
			// 	}, 'Não foi possível recuperar destaques');
			// }

		}
	]);
})();