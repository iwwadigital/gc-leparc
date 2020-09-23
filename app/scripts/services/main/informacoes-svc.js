(function() {
	'use strict';
	app.service('InformacoesService', [
		'Session',
		'AjaxService',
		function(Session, AjaxService){
			var getInformacoes = function({offset, category}) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post?empreendimento=' + Session.empreendimento.id + '&offset=' + offset + '&post_type=informacao&posts_per_page=5' + (category ? '&category='+category : '')
				}, 'Não foi possível recuperar informações');
			};

			var getCategorias = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'posttipo?post_type=informacao&empreendimento='+Session.empreendimento.id
				}, 'Não foi possível recuperar as categorias de informações');
			};

			var getInformacao = function(id) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post/' + id
				}, 'Não foi possível recuperar o post');
			}

			return {
				getInformacoes: getInformacoes,
				getCategorias: getCategorias,
				getInformacao: getInformacao
			};
		}
	]);
})();
