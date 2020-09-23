(function() {
	'use strict';
	app.service('TelefonesService', [
		'Session',
		'AjaxService',
		function(Session, AjaxService){
			var getContatos = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'telefone?empreendimento=' + Session.empreendimento.id + '&conjuntos=' + Session.getConjuntos()
				}, 'Não foi possível recuperar os telefones');
			}

			return {
				getContatos: getContatos,
			};
		}
	]);
})();