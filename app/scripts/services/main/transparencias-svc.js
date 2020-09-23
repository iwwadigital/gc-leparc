(function() {
	app.service('TransparenciasService', [
		'Session', 'AjaxService',
		function(Session, AjaxService) {

			var getTransparencias = function({offset, category}) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post?empreendimento=' + Session.empreendimento.id + '&offset=' + offset + '&posts_per_page=5&post_type=Transparencia&posts_per_page=5' + (category ? '&category=' + category : '')
				}, 'Não foi possível recuperar informações');
			};

			var getCategorias = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'posttipo?post_type=transparencia&empreendimento='+Session.empreendimento.id
				}, 'Não foi possível recuperar as categorias de informações');
			};

			var getTransparencia = function(id) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post/' + id
				}, 'Não foi possível recuperar o post');
			}

			return {
				getTransparencias: getTransparencias,
				getCategorias: getCategorias,
				getTransparencia: getTransparencia
			};
		}
	]);
})();
