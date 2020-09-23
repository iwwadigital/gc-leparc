(function() {
	'use strict';
	social.directive('socialSharing', [
		function() {
			console.log('dir');
			return {
				templateUrl: 'templates/social/social-sharing.html',
				restrict: 'AE',
				replace: true,
				scope: {
					config: '=',
				},
				controller: 'shareController',
				controllerAs: 'shareCtrl',
				bindToController: true,
				link: postLink
			};
		}
	]);

	function postLink() {

	};
})();