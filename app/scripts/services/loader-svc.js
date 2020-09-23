(function() {
  'use strict';
  app.service('LoaderService', [
    '$ionicLoading',
    function($ionicLoading) {
      var isOpen = false;

      var show = function() {
        $ionicLoading.show({
          template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
          // noBackdrop: true
        });
        isOpen = true;
      };

      var hide = function() {
        setTimeout(() => {
          $ionicLoading.hide();
          isOpen = false;
        }, 500);
      };

      return {
        show: show,
        hide: hide,
        isOpen: isOpen
      };
    }
  ]);
})();
