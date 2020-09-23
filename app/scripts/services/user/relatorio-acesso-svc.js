(function (){
  app.service('RelatorioAcessoService',[
    'Session', 'AjaxService',function(Session , AjaxService){
      var setRelatorioAcesso = function(idPost){
        var now = new Date();
        var relatorioAcesso = {
          usuario_id: Session.user.id,
          data_visualizacao : now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds(),
          post_id : idPost
        }
        return AjaxService.request({
          method : 'POST',
          url: apiURL+'relatorio-acesso',
          data: relatorioAcesso
        })
      }

      return {
        setRelatorioAcesso:setRelatorioAcesso
      }
    }
  ])
})();
