(function () {
  app.service('LoginService', [
    'AjaxService',
    function (AjaxService) {
      var doLogin = function (loginCredentials) {
        return AjaxService.request({
          method: 'POST',
          url: apiURL + 'login',
          data: loginCredentials
        }, 'Usuário ou senha incorretos');
      };

      var getInformacoes = function (id) {
        return AjaxService.request({
          method: 'get',
          url: apiURL + 'informacoes/' + id
        }, 'Não foi possível recuperar informações sobre o empreendimento');
      };

      var recoverPassword = function (data) {
        return AjaxService.request({
          method: 'PATCH',
          url: apiURL + 'recuperarsenha',
          data: data
        }, 'Não foi possível solicitar recuperação de senha');
      };

      return {
        doLogin: doLogin,
        getInformacoes: getInformacoes,
        recoverPassword: recoverPassword
      };
    }
  ]);
})();
