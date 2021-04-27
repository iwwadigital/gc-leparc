(function() {
	app.service('AjaxService', [
		'$http', 'ToasterService', 'Session', '$state',
		function($http, ToasterService, Session, $state) {
      		const duration = 5000;
			return {
				request: request
			};

			function request(http, failure, success) {
				if (Session.token) {
					http.headers = {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + Session.token
					};
				}

				return $http(http)
				.success( response => {
					if (!response.success && response.error_message) {
						ToasterService.show(response.error_message, duration);
					}

					if (success) {
						ToasterService.show(success, duration);
					}

					if (response.hasOwnProperty('message') && response.message.length) {
						ToasterService.show(response.message, duration);
					}

					return response;
				})
				.error( error => {
					if (error && error.error === 'token_not_provided' || error && error.error === 'token_invalid' || error && error.error === 'token_expired') {
						ToasterService.show('Houve algum problema na validação de seu Token. Por favor, realize login e tente novamente!',duration);
						$state.go('login');
						return;
					}
					ToasterService.show(failure || 'Não foi possível realizar operação', duration);
				})
				.finally();
			}

		}
	]);
})();
