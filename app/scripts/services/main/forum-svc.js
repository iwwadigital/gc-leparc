(function() {
	'use strict';
	app.service('ForumsService', [
		'Session',
		'AjaxService',
		function(Session, AjaxService){
			var getPosts = function(offset) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post?empreendimento=' + Session.empreendimento.id + '&offset=' + offset + '&post_type=forum&posts_per_page=5'
				}, 'Não foi possível recuperar os posts');
			}

			var getPost = function(id) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'post/' + id
				}, 'Não foi possível recuperar o post');
			}

			var getCategorias = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'posttipo?post_type=forum&empreendimento=' + Session.empreendimento.id
				}, 'Não foi possível recuperar as categorias dos posts');
			}

			var createPost = function(params) {
				return AjaxService.request({
					method: 'POST',
					url: apiURL + 'post',
					data: params
				}, 'Não foi possível criar post','Post criado com sucesso');
			}

			var updatePost = function(params, id) {
				return AjaxService.request({
					method: 'PUT',
					url: apiURL + 'post/'+id,
					data: params
				}, 'Não foi possível editar post','Post editado com sucesso');
			}

			var createComment = function(params) {
				return AjaxService.request({
					method: 'POST',
					url: apiURL + 'postcomentario',
					data: params
				}, 'Não foi possível comentar neste post','Comentário cadastrado com sucesso');
			}

			var getRegras = function(id) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL +'regras_forum/'+ id
				}, 'Não foi possível recuperar as regras do fórum');
			}

			return {
				getPosts: getPosts,
				getPost: getPost,
				getCategorias: getCategorias,
				createPost: createPost,
				updatePost: updatePost,
				createComment: createComment,
				getRegras: getRegras
			};
		}
	]);
})();