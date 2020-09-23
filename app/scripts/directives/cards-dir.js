(function() {
	'use strict';
	app.directive("card2rows", function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/components/card-2rows.html',
			scope: {
				content: '=',
				selected: '=',
				count: '=',
				imageDefault: '='
			}
		}
	});
	app.directive("card2rows2cols", function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/components/card-2rows-2cols.html',
			scope: {
				content: '=',
				selected: '=',
				count: '=',
				imageDefault: '=',
				user: '='
			}
		}
	});
	app.directive("circleCards", function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/components/circle-cards.html',
			scope: {
				set: '=',
				rule: '&'
			}
		}
	});
})();
