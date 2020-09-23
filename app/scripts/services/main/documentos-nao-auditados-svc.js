(function() {
	app.service('DocumentosNaoAuditadosService', [
		'Session', 'AjaxService',
		function(Session, AjaxService) {

			var getDocumentos = function({offset, category}) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post?empreendimento=' + Session.empreendimento.id + '&offset=' + offset + '&posts_per_page=5&post_type=documento_nao_auditado&posts_per_page=5' + (category ? '&category=' + category : '')
				}, 'Não foi possível recuperar informações');
			};

			var getCategorias = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'posttipo?post_type=documento_nao_auditado&empreendimento='+Session.empreendimento.id
				}, 'Não foi possível recuperar as categorias de informações');
			};

			var getDocumento = function(id) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post/' + id
				}, 'Não foi possível recuperar o post');
			}

			return {
				getDocumentos: getDocumentos,
				getCategorias: getCategorias,
				getDocumento: getDocumento
			};
		}
	]);
})();
