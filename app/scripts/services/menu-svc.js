(function() {
	app.service('MenuService', [
		'Session',
		function(Session) {
			return {
				getMenus: getMenus
			};

			function getMenus() {
				return [
					{
						sref: 'app.home',
						title: 'Início',
						icon:'ion-android-home',
						habilitado: true
					},
					{
						sref: 'app.informacoes',
						title: 'Informações',
						icon:'ion-android-alert',
						habilitado:Session.user.permissoes_usuario.ver_post_informacao
					},
					{
						sref: 'app.transparencias',
						title: 'Transparência',
						icon:'ion-android-document',
						habilitado:Session.user.permissoes_usuario.ver_post_transparencia
          },
          {
						sref: 'app.prestacao-contas',
						title: 'Prestação de contas',
						icon:'ion-android-document',
						habilitado:Session.user.permissoes_usuario.ver_post_documento_nao_auditado
					},
					{
						sref: 'app.notificacoes',
						title: 'Notificações',
						icon:'ion-android-notifications',
						habilitado: Session.user.permissoes_usuario.ver_notificacao,
						is_notificacao: true
					},
					{
						sref: 'app.visitantes',
						title: 'Visitantes',
						icon:'ion-android-contacts',
						habilitado:Session.user.permissoes_usuario.ver_visitante
					},
					{
						sref: 'app.eventos',
						title: 'Eventos',
						icon:'ion-android-map',
						habilitado:Session.user.permissoes_usuario.ver_post_evento
					},
					{
						sref: 'app.forum',
						title: 'Fórum',
						icon:'ion-ios-browsers-outline',
						habilitado: Session.user.permissoes_usuario.ver_post_forum
					},
					{
						sref: 'app.classificados',
						title: 'Classificados',
						icon:'ion-social-usd',
						habilitado:Session.user.permissoes_usuario.ver_post_classificado
					},
					{
						sref: 'app.agendamentos',
						title: 'Agendamentos',
						icon:'ion-android-calendar',
						habilitado: Session.user.permissoes_usuario.ver_agendamento
					},
					{
						sref: 'app.ouvidoria',
						title: 'Ouvidoria',
						icon:'ion-person-stalker',
						habilitado:Session.user.permissoes_usuario.ver_chamado
					},
					{
						sref: 'app.telefones_uteis',
						title: 'Telefones Úteis',
						icon:'ion-android-call',
						habilitado:Session.user.permissoes_usuario.ver_telefone
					}
				];
			}
		}
	]);
})();
