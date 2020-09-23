(function() {
	app.service('EventosService', [
		'Session', 'AjaxService',
		function(Session, AjaxService) {
			var getEventos = function(offset, type) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post?empreendimento=' + Session.empreendimento.id + '&offset=' + offset + '&post_type=evento&posts_per_page=5' + (type ? '&category='+type : '')
				}, 'Não foi possível recuperar os eventos');
			};

			var getEventosFiltrados = function(offset, filter_date) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post?empreendimento=' + Session.empreendimento.id + '&offset=' + offset + '&post_type=evento&posts_per_page=5&filter_date=' + filter_date + '&date=' + Date.now()
				}, 'Não foi possível recuperar os eventos');
			}

			var getCategorias = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'posttipo?post_type=evento&empreendimento=' + Session.empreendimento.id
				}, 'Não foi possível recuperar as categorias dos eventos');
			};

			var getEvento = function(id) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post/' + id
				}, 'Não foi possível recuperar informações do evento');
			}

			return {
				getEventos: getEventos,
				getEventosFiltrados: getEventosFiltrados,
				getCategorias: getCategorias,
				getEvento: getEvento
			};
		}
	]);
})();
