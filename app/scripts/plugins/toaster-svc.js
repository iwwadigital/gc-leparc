(function() {
	'use strict';
	app.service('ToasterService', [
		'$cordovaToast',
		function($cordovaToast) {
			var show = function(message, duration, position) {
				if (angular.isDefined($cordovaToast)) {
					duration = duration || 'short';
					position = position || 'bottom';

					try {
						$cordovaToast.show(message, duration, position);
					} catch (ex) {
						console.log(ex);
					}
				} else {
					console.log('The ToasterService is unavailable');
				}
			}

			return {
				show: show
			};
		}
	]);
})();
