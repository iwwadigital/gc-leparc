(function() {
  'use strict';
    app.controller('SlideshowController', [
		'$ionicHistory',
		'$window',
		'$state',
		'$scope',
		'$ionicPlatform',
		function ($ionicHistory, $window, $state, $scope, $ionicPlatform) {

			var vm = this;

			vm.skipIntro = skipIntro;
			$ionicPlatform.ready(onIonicReady);

			function skipIntro() {
				$window.localStorage.setItem('showIntro', false);
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('app.index', {}, {location: "replace", reload: true});
			}

			function onIonicReady() {
				if ($window.localStorage.getItem('showIntro') !== 'true' && $state.params.forceShow === 'false') {
					skipIntro();
				} else if ($state.params.forceShow === 'false') {
					$scope.$emit('hideMenu', true);
				}
			}
		}
	]);
})();