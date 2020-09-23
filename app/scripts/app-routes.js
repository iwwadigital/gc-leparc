(function() {
  app.config([
    '$stateProvider', '$ionicConfigProvider', '$urlRouterProvider',
    function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {

      $ionicConfigProvider.backButton.previousTitleText(false);
      $ionicConfigProvider.backButton.text('');

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('app', {
          cache: false,
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'ApplicationController as appCtrl'
        })
        .state('app.home', {
          cache: false,
          url: '/',
          views: {
            'menuContent': {
              templateUrl: 'templates/home.html',
              controller: 'HomeController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.informacoes', {
          cache: false,
          url: '/main/informacoes',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/informacoes.html',
              controller: 'InformacoesController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.informacao', {
          url: '/main/informacao/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/informacao.html',
              controller: 'InformacaoController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.transparencias', {
          cache: false,
          url: '/main/transparencias',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/transparencias.html',
              controller: 'TransparenciasController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.transparencia', {
          url: '/main/transparencia/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/transparencia.html',
              controller: 'TransparenciaController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.prestacao-contas', {
          cache: false,
          url: '/main/documentos-nao-auditados',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/documentos-nao-auditados.html',
              controller: 'DocumentosNaoAuditadosController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.documento_nao_auditado', {
          url: '/main/documento-nao-auditado/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/documento-nao-auditado.html',
              controller: 'DocumentoNaoAuditadoController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.eventos', {
          cache: false,
          url: '/main/eventos',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/eventos.html',
              controller: 'EventosController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.evento', {
          url: '/main/evento/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/evento.html',
              controller: 'EventoController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.classificados', {
          cache: false,
          url: '/main/classificados/:user_id',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/classificados.html',
              controller: 'ClassificadosController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.classificado', {
          cache: false,
          url: '/main/classificado/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/classificado.html',
              controller: 'ClassificadoController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.classificado_novo', {
          url: '/main/classificado-novo/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/classificado-novo.html',
              controller: 'ClassificadoNovoController as classificadoNovoCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.forum', {
          cache: false,
          url: '/main/forum',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/forum.html',
              controller: 'ForumController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.forum_regras', {
          url: '/main/forum-regras',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/forum-regras.html',
              controller: 'ForumRegrasController as forumRegraCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.forum_post', {
          url: '/main/forum-post/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/forum-post.html',
              controller: 'ForumPostController as forumPostCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.forum_novo_post', {
          url: '/main/forum-novo-post/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/forum-novo-post.html',
              controller: 'ForumNovoPostController as forumNovoPostCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.agenda_servicos', {
          cache: false,
          url: '/main/agenda_servicos',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/agenda-servicos.html',
              controller: 'AgendaController as agendaCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.agendamentos', {
          cache: false,
          url: '/main/agendamentos',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/agendamentos.html',
              controller: 'AgendamentosController as agendamentosCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.agendamento', {
          url: '/main/agendamento/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/agendamento.html',
              controller: 'AgendamentoController as agendamentoCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.ouvidoria', {
          url: '/main/ouvidoria',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/ouvidoria.html',
              controller: ['$scope', function($scope) {
                $scope.textoChamado = JSON.parse(localStorage.empreendimento).texto_chamado;
              }]
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.ocorrencia_nova', {
          url: '/main/ocorrencia_nova',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/ocorrencia-nova.html',
              controller: 'OuvidoriaNovoChamadoController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.ocorrencia_usuario', {
          cache: false,
          url: '/main/ocorrencia_usuario/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/ocorrencia-usuario.html',
              controller: 'OuvidoriaOcorrenciaController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.ocorrencias_usuario', {
          cache: false,
          url: '/main/ocorrencias_usuario',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/ocorrencias-usuario.html',
              controller: 'OuvidoriaController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.telefones_uteis', {
          url: '/main/telefones_uteis',
          views: {
            'menuContent': {
              templateUrl: 'templates/main/telefones-uteis.html',
              controller: 'TelefonesController as vm'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.perfil', {
          url: '/user/perfil',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/perfil.html',
              controller: 'PerfilController as perfilCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.editar_perfil', {
          url: '/user/editar-perfil',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/editar-perfil.html',
              controller: 'EditarPerfilController as editarPerfilCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.notificacoes', {
          cache: false,
          url: '/notificacoes',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/notificacoes.html',
              controller: 'NotificacoesController as notificacoesCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.configuracoes', {
          url: '/configuracoes',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/configuracoes.html',
              controller: 'ConfiguracoesController as configuracoesCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.alterar_senha', {
          url: '/alterar_senha',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/alterar-senha.html',
              controller: 'AlterarSenhaController as alterarSenhaCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.visitantes', {
          cache: false,
          url: '/visitantes',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/visitantes.html',
              controller: 'VisitantesController as visitanteCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.visitante', {
          url: '/visitante/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/visitante.html',
              controller: 'VisitanteController as visitanteCtrl'
            }
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('app.visitante-novo', {
          url: '/visitante-novo/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/visitante-novo.html',
              controller: 'VisitanteNovoController as visitanteNovoCtrl'
            }
          },
          params: {
            dupe: null
          },
          resolve: {
            "currentAuth": [
              "AuthService",
              function(AuthService) {
                return AuthService.requireSignIn();
              }
            ]
          }
        })
        .state('login', {
          cache: false,
          url: '/login',
          templateUrl: 'templates/login/login.html',
          controller: 'LoginController as vm'
        })
        .state('informacoes', {
          url: '/login/informacoes',
          templateUrl: 'templates/login/informacoes.html',
          controller: 'LoginInformacoesController as vm'
        })
        .state('recuperar_senha', {
          url: '/login/recuperar-senha',
          templateUrl: 'templates/login/recuperar-senha.html',
          controller: 'LoginController as vm'
        });
    }
  ]);
})();
