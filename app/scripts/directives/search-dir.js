(function() {
	app.directive("search", [function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/components/search.html',
			scope: {
				dataset: '=',
				datamodel: '=',
				father: '='
			},
			link: function(scope, el, attrs) {
				el.bind('change', function(event) {
					scope.father.onChange(scope.datamodel);
				});
			}
		};
	}]);
})();
