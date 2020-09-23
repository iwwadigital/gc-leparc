(function() {
  'use strict';
  app.directive('fileModel', [
    '$parse',
    '$rootScope',
    'MidiaService',
    'Session',
    '$http',
    function($parse, $rootScope, MidiaService, Session, $http) {
      return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          var dataset = element.context.dataset;

          element.bind('change', function(event) {
            scope.$apply(function() {
              var fd = new FormData();

              if (element[0].files.length === 0)
                return;

              angular.forEach(element[0].files, (element) => {
                fd.append('file[]', element);
              });
              fd.append('timestamp', $rootScope.timestamp);
              fd.append('usuario_id', Session.user.id);
              fd.append('type', dataset.type);

              $rootScope.$broadcast('ajaxStartLoad');

              $http.post(api + 'midia', fd, {
                  transformRequest: angular.identity,
                  headers: {
                    'Content-Type': undefined
                  }
                })
                .success(response => {
                  $rootScope.$broadcast('ajaxFinishLoad');
                  var modelValue = ngModel.$modelValue;

                  if (angular.isArray(modelValue)) {
                    response.midias.forEach(element => modelValue.push(element));
                  } else {
                    modelValue = response.midias[0];
                  }

                  ngModel.$setViewValue(modelValue);
                }).error(error => console.log(error));
            });
          });
        }
      };
    }
  ]);
})();