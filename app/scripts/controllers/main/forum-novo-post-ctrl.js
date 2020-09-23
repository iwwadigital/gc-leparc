(function() {
	'use strict';
	app.controller('ForumNovoPostController', [
		'LoaderService',
		'ForumsService',
		'$stateParams',
    'Session',
		'$ionicHistory',
		function (LoaderService, ForumsService, $stateParams, Session, $ionicHistory) {

			var vm = this;
			vm.isEditing = false;

			ForumsService.getCategorias().then((response) => {
				vm.categorias = response.data.tipos_post;
			});

			if($stateParams.id) {
				ForumsService.getPost($stateParams.id).then((response) => {
					vm.post = response.data.post;
					vm.pageTitle = "Edição de Post";
				});
			} else {
				vm.pageTitle = "Novo Post";
			}

            vm.postar = function() {
				var success = true;
				var params = {
					post_tipo_id : vm.post.tipo_post.id,
					usuario_id: Session.user.id,
					empreendimento_id: Session.empreendimento.id,
					titulo: vm.post.titulo,
					conteudo: vm.post.conteudo,
					post_type: 'forum'
				};

                if(vm.post.id) {
					params['data_ultima_edicao'] = now();
					ForumsService.updatePost(params, vm.post.id).then((response) => {
						if(response.data.success)
							$ionicHistory.goBack();
					});
				} else {
					params['data_postagem'] = now();
					ForumsService.createPost(params).then((response) => {
						if(response.data.success)
							$ionicHistory.goBack();
					});
				}
            }

			if(window.analytics) {
	 			window.analytics.trackView('Principal');
			}
		}
	]);
})();