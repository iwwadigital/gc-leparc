(function() {
	'use strict';
	app.service('PerfilService', [
		'Session',
		'AjaxService',
		'$http',
		'LocalStorageService',
		function(Session, AjaxService, $http, LocalStorageService){
			var getOptions =function() {
				return [
					{
						title: 'Configurações',
						sref:'app.configuracoes',
						icon:'ion-gear-a',
						habilitado: false,
						click: () => {}
					},
					{
						title: 'Editar Perfil',
						sref:'app.editar_perfil',
						icon:'ion-edit',
						habilitado: true,
						click: () => {}
					},
					{
						title: 'Alterar Senha',
						sref:'app.alterar_senha',
						icon:'ion-key',
						habilitado: true,
						click: () => {}
					},
					{
						title: 'Notificações',
						sref:'app.notificacoes',
						icon:'ion-android-notifications',
						habilitado: Session.user.permissoes_usuario.ver_notificacao,
						click: () => {}
					},
					{
						title: 'Minhas Ocorrências',
						sref:'app.ocorrencias_usuario',
						icon:'ion-chatbubbles',
						habilitado: Session.user.permissoes_usuario.ver_chamado,
						click: () => {}
					},
					{
						title: 'Meus Visitantes',
						sref:'app.visitantes',
						icon:'ion-ios-people',
						habilitado: Session.user.permissoes_usuario.ver_visitante,
						click: () => {}
					},
					{
						title: 'Meus Agendamentos',
						sref:'app.agendamentos',
						icon:'ion-calendar',
						habilitado: Session.user.permissoes_usuario.ver_agendamento,
						click: () => {}
					},
					{
						title: 'Meus Classificados',
						sref:'app.classificados({user_id: ' + Session.user.id + '})',
						icon:'ion-social-usd',
						habilitado: Session.user.permissoes_usuario.ver_post_classificado,
						click: () => {}
					},
					{
						title: 'Sair',
						sref:'login',
						icon:'ion-log-out',
						habilitado: true,
						click: () => {
							LocalStorageService.clear();
						}
					}
				];
			};

			var changePassword = function(password) {
				return AjaxService.request({
					method: 'PATCH',
					url: apiURL + 'usuario/' + Session.user.id,
					data: {
						password: password,
					}
				}, 'Não foi possível alterar sua senha', 'Senha alterada com sucesso');
			}

			var updateUser = function(params) {
				return AjaxService.request({
					method: 'PATCH',
					url: apiURL + 'usuario/' + Session.user.id,
					data: params
				}, 'Não foi possível atualizar seus dados', 'Dados atualizados com sucesso');
			}

			var getUserUpdatedData = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'usuario/' + Session.user.id + '?update_data=true'
				}, 'Não foi possível atualizar os dados do usuário');
			}

			return {
				getOptions: getOptions,
				changePassword: changePassword,
				getUserUpdatedData: getUserUpdatedData,
				updateUser: updateUser
			};
		}
	]);
})();