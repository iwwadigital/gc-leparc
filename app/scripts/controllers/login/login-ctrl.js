(function () {
  app.controller('LoginController', [
    '$state', 'LoginService', 'ToasterService', 'Session', 'LocalStorageService', 'PerfilService', 'NotificacoesService', 'LoaderService', '$ionicHistory',
    function ($state, LoginService, ToasterService, Session, LocalStorageService, PerfilService, NotificacoesService, LoaderService, $ionicHistory) {
      if ($state.current.name == 'login') {
        $ionicHistory.clearHistory();
      }

      var vm = this;
      vm.user = {};
      vm.user.empreendimento = { id: THEME_CONFIG.empreendimentoId };
      vm.back = () => $ionicHistory.goBack();

      vm.doLogin = () => {
        LoginService.doLogin(vm.user)
          .then(response => {
            var credentials = response.data;

            // if (response.data.usuario.usuario_tipo.titulo !== 'Morador') {
            //  ToasterService.show('Somente moradores tem acesso a este aplicativo');
            //  return;
            // }

            if (credentials.usuario.moradias.length) {
              credentials.usuario.moradias.forEach(element => {
                if (element.conjunto.empreendimento.id === THEME_CONFIG.empreendimentoId) {
                  Session.empreendimento = element.conjunto.empreendimento;
                  return;
                }
              });
            } else {
              Session.empreendimento = credentials.usuario.empreendimento;
            }

            if (Session.empreendimento !== null) {
              Session.setUser(credentials.usuario);
              Session.setToken(credentials.token);

              if (Session.user.imagem) {
                Session.user.imagem = url + '/' + Session.user.imagem;
              }

              LocalStorageService.storeUser();
              LocalStorageService.storeToken();
              LocalStorageService.storeEmpreendimento();
              LocalStorageService.getPlayerId();

              // Mandando Player ID para API
              if (Session.playerId && Session.user.player_id !== Session.playerId) {
                Session.user.player_id = Session.playerId;
                PerfilService.updateUser({ player_id: Session.user.player_id }).then(response => {
                  if (response.data.success) {
                    console.log('User\'s player ID was successfuly set');
                  }
                });
              }else {
                console.log('não entrou');
              }

              NotificacoesService.getCountNotificacoes().then(response => {
                Session.notificacoes_nao_lidas = response.data.notificacoes_nao_lidas;
              });

              $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true,
                historyRoot: true
              });
              $state.go('app.home');
            } else {
              ToasterService.show('Não foi possível autenticar usuário em empreendimento');
            }
          });
      };

      vm.recoverPassword = () => {
        LoaderService.show();
        var params = {
          email: vm.user.email,
          empreendimento: vm.user.empreendimento.id
        };
        LoginService.recoverPassword(params)
          .then(response => {
            if (response.data.success) {
              ToasterService.show('A senha foi encaminhada para seu e-mail');
              $ionicHistory.goBack();
            } else {
              ToasterService.show('Erro. Não foi possível encaminhar a senha para seu e-mail.');
            }
          }).finally(LoaderService.hide);
      };

      window.analytics && window.analytics.trackView('Login');
    }
  ]);
})();
