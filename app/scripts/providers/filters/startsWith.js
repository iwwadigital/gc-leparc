(function() {
	app.filter('startsWith', function() {
		return function(items, prefix) {
			var filtered = [];

			angular.forEach(items, function(item) {
				var description = item.description.toLowerCase();
				prefix = prefix.toLowerCase();
				if(description.startsWith(prefix)) {
					filtered.push(item);
				}
			});

			return filtered;
		};
	});
})();