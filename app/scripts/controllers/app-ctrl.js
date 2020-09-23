(function() {
  app.controller('ApplicationController', [
    '$scope', 'appConfig', 'MenuService', 'Session', 'LocalStorageService',
    function($scope, appConfig, MenuService, Session, LocalStorageService) {
      var vm = this;
      vm.showMenu = true; // Set initial showMenu flag
      vm.appConfig = appConfig;
      vm.Session = Session;

      LocalStorageService.getUser();

      vm.menus = MenuService.getMenus();

      function onHideMenu() {
        vm.showMenu = false;
      }

      vm.openBrowser = function(url) {
        window.open(url, '_system');
        return false; // Prevent execution of the default onClick handler
      };

      $scope.$on('hideMenu', onHideMenu);

    }
  ]);
})();
