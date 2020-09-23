(function() {
	'use strict';
	app.controller('EditarPerfilController', [
		'PerfilService',
		'Session',
		'$ionicHistory',
		'ToasterService',
		'LocalStorageService',
		function(PerfilService, Session, $ionicHistory, ToasterService, LocalStorageService) {

			var vm = this;

			vm.user = angular.copy(Session.user);

			vm.updateUser = function() {
				var params = {
					email: vm.user.email,
					telefone: vm.user.telefone
				};

				PerfilService.updateUser(params).then((response) => {
					if (response.data.success) {
						ToasterService.show('Suas informações de perfil foram atualizadas com sucesso');
						//Atualiza os dados na sessão e local storage
						Session.user.email = response.data.usuario.email;
						Session.user.telefone = response.data.usuario.telefone;
						LocalStorageService.storeUser();
						//Retorna pra página de perfil
						$ionicHistory.goBack();
					}
				});
			}

			//Analytics
			if (window.analytics) {
				window.analytics.trackView('Configurações');
			}
		}
	]);
})();