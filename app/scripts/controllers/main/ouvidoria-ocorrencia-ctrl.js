(function() {
	app.controller('OuvidoriaOcorrenciaController', [
		'$scope', 'OuvidoriaService', '$stateParams', 'Session', '$ionicModal','$ionicPopup','ToasterService',
		function($scope, OuvidoriaService, $stateParams, Session, $ionicModal, $ionicPopup, ToasterService) {
			var vm = this;

			OuvidoriaService.getOcorrencia($stateParams.id).then(response => {
				vm.ocorrencia = response.data.chamado;
      });

      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(modal => {
        $scope.modal = modal;
      });


      		vm.confirmarFinalizacao = function 	() {
      			 var confirmPopup = $ionicPopup.confirm({
		       		title: 'ATENÇÃO!',
		       		template: 'Deseja finalizar essa Ocorrência?',
		       		okText: 'Sim',
		       		cancelText:'Não'
     				});
		     		confirmPopup.then(function(res) {
		       		  if(res) {
		         		vm.alterarStatusOcorrencia();
		       		}
		     		});
      		}
		    vm.alterarStatusOcorrencia = function() {
		    	let ocorrenciaInterna  = {
		    		'usuario_finalizou_id': Session.user.id,
		    		'data_fechado': now(),
		    		'id': vm.ocorrencia.id
		    	} 
		    	
		    	OuvidoriaService.atualizarOcorrencia(ocorrenciaInterna).then(response => {
		    		vm.ocorrencia = response.data.chamado;
					});
		    }
			vm.comentar = function() {
				var params = {
					ocorrencia: vm.ocorrencia,
					content: vm.conteudo
				};

				OuvidoriaService.createComment(params).then(response => {
					var feedback = {
						autor: Session.user,
						chamado_id: vm.ocorrencia.id,
						conteudo: response.data.chamado_comentario.conteudo
					};

					vm.ocorrencia.feedbacks.push(feedback);
					vm.conteudo = "";
				});
			};

			window.analytics && window.analytics.trackView('Ouvidoria Ocorrência');
		}
	]);
})();
