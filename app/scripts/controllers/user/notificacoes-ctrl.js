(function() {
	app.controller('NotificacoesController', [
		'NotificacoesService', '$scope', 'Session',
		function(NotificacoesService, $scope, Session) {
			var vm = this;
			vm.alreadyLoaded = false;
      vm.lidas = false;

			Session.notificacoes_nao_lidas = 0;

			NotificacoesService.getNotificacoes().then( response => {
				vm.notificacoes = response.data.notificacoes;

				var data = {
					data_leitura: now(),
					notificacoes: getIDs()
				};

				// if (data.notificacoes.length === 0) {
				// 	vm.lidas = true;
				// } else {
				// 	vm.lidas = false;
				// 	NotificacoesService.marcarNotificacoesComoLidas(data);
				// }

				vm.alreadyLoaded = true;
			});

			function getIDs() {
				var ids = [];

				vm.notificacoes.forEach((element) => {
					if (!element.data_recebimento)
						ids.push(element.id);
				});

				return eliminateDuplicates(ids);
			}

			function eliminateDuplicates(arr) {
				var i,
					len = arr.length,
					out = [],
					obj = {};

				for (i = 0; i < len; i++) {
					obj[arr[i]] = 0;
				}
				for (i in obj) {
					out.push(i);
				}

				return out;
			}

			window.analytics && window.analytics.trackView('Notificações');
		}
	]);
})();
