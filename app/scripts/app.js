(function() {
  app.run(['$rootScope', '$ionicPlatform', 'ConfigurationsService', 'LocalStorageService', '$state', 'Session', 'NotificacoesService', 'PerfilService', '$ionicPopup',
    function($rootScope, $ionicPlatform, configSvc, LocalStorageService, $state, Session, NotificacoesService, PerfilService, $ionicPopup) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
          cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
          StatusBar.overlaysWebView(false);
          StatusBar.backgroundColorByHexString("#000");
        }

        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
          var networkPopup = $ionicPopup.show({
            title: "Atenção",
            template: "Você precisa estar conectado à internet para utilizar o aplicativo.",
            buttons: [{
              text: '<b>Ok</b>',
              type: 'button-positive'
            }]
          });
          networkPopup.then(result => {
            ionic.Platform.exitApp();
          });
          $timeout(() => networkPopup.close(), 4000);
        });
      });

      // Carregando todos dados do LocalStorage pra sessão
      if (LocalStorageService.getAll()) {
        PerfilService.getUserUpdatedData().then(response => {
          let user = response.data.usuario;

          if (user.imagem) {
            Session.user.imagem = url + '/' + user.imagem;
          }

          Session.user.telefone = user.telefone;
          Session.user.email = user.email;
          Session.user.moradias = user.moradias;
          Session.user.permissoes_usuario = user.permissoes_usuario;

          LocalStorageService.storeUser();
        });
      }

      // Pegar notificações
      if (Session.user) {
        NotificacoesService.getCountNotificacoes().then(response => {
          Session.notificacoes_nao_lidas = response.data.notificacoes_nao_lidas;
        });
      }

      // Iniciando listener de autenticação das rotas
      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
          window.plugins && window.plugins.toast.show('Para ter acesso a essa página, faça login', 'short', 'center');
          $state.go('login');
        }
      });

      // Initialize Google Analytics
      document.addEventListener('deviceready', function() {
        window.analytics && window.analytics.startTrackerWithId(THEME_CONFIG.googleAnalytics.trackerID);
      });

      // carregando configuracoes
      configSvc.applyConfigurations();
      configSvc.verifyCompatibility();

    }
  ]);
})();
