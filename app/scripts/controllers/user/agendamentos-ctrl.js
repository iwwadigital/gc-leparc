(function() {
	app.controller('AgendamentosController', [
		'AgendamentosService',
		function(AgendamentosService) {
			var vm = this;
			vm.agendamentos = vm.categorias = [];
			vm.alreadyLoaded = false;
			vm.verifyIcon = AgendamentosService.verifyIcon;

      AgendamentosService.getAgendamentos()
      .then( response => {
				vm.agendamentos = response.data.agendamentos;
				vm.alreadyLoaded = true;
			});

			vm.cancelar = function(element, index) {
				if (navigator && navigator.notification) {
					navigator.notification.confirm(
						'Você tem certeza que deseja cancelar a solicitação de ' + element.dependencia.titulo + '?',
						onSelected,
						'Deletar', ['Sim', 'Não']
					);
				}

				function onSelected(buttonIndex) {
					if (buttonIndex === 1) {
            AgendamentosService.cancelarAgendamento(element)
            .then( response => {
							if (response.data.success) {
								AgendamentosService.getAgendamentos().then((response) => {
									vm.agendamentos = response.data.agendamentos;
									vm.alreadyLoaded = true;
								});
								ToasterService.show('Solicitação cancelada com sucesso');
							} else {
								ToasterService.show('Não foi possível cancelar a solicitação.');
							}
						});
					}
				}
			};

			window.analytics && window.analytics.trackView('Agendamentos');
		}
	]);
})();
