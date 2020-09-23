(function() {
  app.controller('AlterarSenhaController', [
    'PerfilService', '$ionicHistory', 'ToasterService',
    function(PerfilService, $ionicHistory, ToasterService) {
      var vm = this;

      vm.changePassword = function() {
        PerfilService.changePassword(vm.newpass).then(response => {
          if (response.data.success) {
            ToasterService.show('Sua senha foi alterada com sucesso.');
            $ionicHistory.goBack();
          } else {
            ToasterService.show('Não foi possível alterar sua senha');
          }
        });
      };

      window.analytics && window.analytics.trackView('Alterar senha');
    }
  ]);
})();
