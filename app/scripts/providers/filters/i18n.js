(function() {
	'use strict';
	app.filter('i18n', [
		'localizationFactory',
		function (localize) {

			function translate(text) {
				var translated;

				translated = localize.getLocalizedString(text);

				return translated
			}

			return function (text) {
				return translate(text);
			};
		}
	]);
})();
