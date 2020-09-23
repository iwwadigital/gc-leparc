(function() {
	app.service('ClassificadosService', [
		'Session', 'AjaxService',
		function(Session, AjaxService) {

			var getClassificados = function({offset, user_id, type}) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post?empreendimento=' + Session.empreendimento.id + '&offset=' + offset + '&post_type=classificado&posts_per_page=5' + (user_id ? '&usuario=' + user_id : '') + (type ? '&category='+type : '')
				}, 'Não foi possível recuperar os classificados');
			};

			var getCategorias = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'posttipo?post_type=classificado&empreendimento='+Session.empreendimento.id
				}, 'Não foi possível recuperar as categorias dos classificados');
			};

			var getClassificado = function(id) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post/' + id
				}, 'Não foi possível recuperar o classificado');
			}

			var getTempoDeUtilizacao = function() {
				return [
					{id: 123, category:"Tempo de Utilização", description:"Menos de seis meses", type:"-6m"},
					{id: 123, category:"Tempo de Utilização", description:"Menos de um ano", type:"-1a"},
					{id: 123, category:"Tempo de Utilização", description:"Mais de um ano", type:"+1a"}
				];
			}

			var createClassificado = function(params) {
				console.log('from svc', params);
				return AjaxService.request({
					method: 'POST',
					url: apiURL + 'post',
					data: params
				}, 'Não foi possível cadastrar o classificado', 'Classificado cadastrado com sucesso');
			}

			var updateClassificado = function(params, id) {
				return AjaxService.request({
					method: 'PATCH',
					url: apiURL + 'post/' + id +'',
					data: params
				}, 'Não foi possível recuperar o classificado', 'Classificado atualizado com sucesso');
			}

			var deleteClassificado = function(id) {
				return AjaxService.request({
					method: 'DELETE',
					url: apiURL + 'post/' + id
				}, 'Não foi possível deletar o classificado', 'Classificado deletado com sucesso');
			}

			var deleteMidia = function(id) {
				console.log(id);
				return AjaxService.request({
					method: 'DELETE',
					url: apiURL + 'midia/' + id
				}, 'Imagem deletada com sucesso');
			}

			return {
				getClassificados: getClassificados,
				getClassificado: getClassificado,
				getCategorias: getCategorias,
				getTempoDeUtilizacao: getTempoDeUtilizacao,
				updateClassificado: updateClassificado,
				createClassificado: createClassificado,
				deleteMidia: deleteMidia,
				deleteClassificado: deleteClassificado
			};
		}
	]);
})();
