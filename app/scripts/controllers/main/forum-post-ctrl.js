(function() {
  'use strict';
  app.controller('ForumPostController', [
    'LoaderService',
    'ForumsService',
    '$stateParams',
    'Session',
    'RelatorioAcessoService',
    function(LoaderService, ForumsService, $stateParams, Session,RelatorioAcessoService) {

      var vm = this;

      ForumsService.getPost($stateParams.id).then((response) => {
        vm.post = response.data.post;
        if(vm.post.autor !== undefined && vm.post.autor !== null && vm.post.autor.imagem !== undefined && vm.post.autor.imagem !== null){
            if(vm.post.autor.imagem.indexOf("sistema.globalcond") < 0 ){
              vm.post.autor.imagem = "http://sistema.globalcond.com.br/"+vm.post.autor.imagem;
            }
        }
        vm.isAuthor = Session.user.id === vm.post.autor.id;
      });

      vm.comentar = function() {
        var params = {
          post_id: vm.post.id,
          usuario_id: Session.user.id,
          conteudo: vm.comment,
          data_postagem: now()
        };

        ForumsService.createComment(params).then((response) => {
          var comentario = response.data.comentario_post;
          comentario.autor = Session.user;
          vm.post.comentarios.push(comentario);
          vm.comment = '';
        });
      };

      if (window.analytics) {
        window.analytics.trackView('Principal');
      }

      RelatorioAcessoService.setRelatorioAcesso($stateParams.id);
    }
  ]);
})();
