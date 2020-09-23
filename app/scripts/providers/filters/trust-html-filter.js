(function() {
  'use strict';
	app.filter('trustHtml', [
		'$sce',
		function ($sce) {
			return function (input) {
				return $sce.trustAsHtml(input);
			};
		}
	]);
})();