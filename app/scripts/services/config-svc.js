(function() {
	'use strict';
	app.service('ConfigurationsService', [
		'$window',
		'AjaxService',
		'Session',
		function($window,AjaxService,Session) {
			var view = angular.element(document.querySelector('ion-nav-view'));

			var getConfigurationsList = function() {
				var tags = [
					{title: "Desabilitar todas as animações", key:"disable_animations", selected: false}
				];

				var configurations = getConfigurations();
				angular.forEach(tags, function(element, index) {
					element.selected = configurations[element.key];
				});

				return tags;
			}

			var verifyCompatibility = function() {
				if(ionic.Platform.platform() === 'android') {
					if(ionic.Platform.version() < 5) {
						view.addClass("regressive");
					}
				}
			};

			var applyConfigurations = function() {
				var configurations = getConfigurations();

				if(configurations.disable_animations) {
					view.addClass("disable_animations");
				}
			};

			var changeConfigurations = function(configurationsToApply) {
				var configurationsLS = $window.localStorage.getItem("app-configurations"),
					configurations = JSON.parse(configurationsLS);

				if(angular.isDefined(configurationsToApply.disable_animations)) {
					configurations.disable_animations = configurationsToApply.disable_animations;
					$window.localStorage.setItem('app-configurations', JSON.stringify(configurations));
				}

				applyConfigurations();
			};

			var getConfigurations = function() {
				var configurationsLS = $window.localStorage.getItem("app-configurations");
				var configurations = null;

				if(configurationsLS == null) {
					configurations = {
						"disable_animations" : false
					};

					$window.localStorage.setItem('app-configurations', JSON.stringify(configurations));
				} else {
					configurations = JSON.parse(configurationsLS);
				}

				return configurations;
			};

			var getConfiguracaoSvc = function() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'configuracao?empreendimento='+Session.empreendimento.id
				}, 'Não foi possível recuperar as configurações');
			};

			return {
				getConfigurationsList: getConfigurationsList,
				applyConfigurations: applyConfigurations,
				changeConfigurations: changeConfigurations,
				getConfigurations: getConfigurations,
				verifyCompatibility: verifyCompatibility,
				getConfiguracaoSvc : getConfiguracaoSvc
			};
		}
	]);
})();