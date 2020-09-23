(function() {
	'use strict';
	app.service('MidiaService', [
		'AjaxService',
		function(AjaxService){
			var createMidia = function(data) {
				return AjaxService.request({
					method: 'post',
					url: api + 'midia',
					data: data
				});
			};

			var deleteMidia = function(id) {
				return AjaxService.request({
					method: 'delete',
					url: api + 'midia/'+id
				});
			};

			return {
				createMidia : createMidia,
				deleteMidia : deleteMidia
			};
		}
	]);
})();