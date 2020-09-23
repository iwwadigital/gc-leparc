(function() {
  app.controller('AgendamentoController', [
    'LoaderService', 'AgendamentosService', '$stateParams', '$ionicHistory','$scope',
    function(LoaderService, AgendamentosService, $stateParams, $ionicHistory, $scope) {
      var vm = this;
      vm.verifyIcon = AgendamentosService.verifyIcon;


      if ($stateParams.id) {
        AgendamentosService.getAgendamento($stateParams.id)
        .then( response => {
          vm.agendamento = response.data.agendamento;
          vm.isCancelable = vm.agendamento.agendamento_status.titulo != 'negado' && vm.agendamento.agendamento_status.titulo != 'cancelado';
        });
      }

      vm.cancelarAgendamento = function() {
        if (navigator && navigator.notification) {
          navigator.notification.confirm(
            'Você tem certeza que deseja cancelar o agendamento da dependência ' + vm.agendamento.dependencia.titulo + '?',
            confirmarCancelamento,
            'Confirmação', ['Sim', 'Não']
          );
        }
      };

      function confirmarCancelamento(buttonIndex) {
        if (buttonIndex === 1) {
          vm.agendamento.agendamento_status_id = 1;
          AgendamentosService.cancelarAgendamento(vm.agendamento)
          .then( response => {
            $ionicHistory.goBack();
          });
        }
      }

      window.analytics && window.analytics.trackView('Agendamento');

    }
  ]);
})();
