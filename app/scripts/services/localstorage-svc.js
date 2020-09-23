(function() {
  'use strict';
  app.service('LocalStorageService', [
    'Session', '$window', '$state', '$rootScope', '$log',
    function(Session, $window, $state, $rootScope, $log) {

      var storageUser = 'user';
      var storageToken = 'token';
      var storageEmpreendimento = 'empreendimento';
      var storagePlayerId = 'oneSignalUserId';

      var get = function(key) {
        return $window.localStorage.getItem(key);
      }

      var store = function(key, value) {
        return $window.localStorage.setItem(key, value);
      }

      var clear = function() {
        var app_configurations = get('app-configurations');
        $window.localStorage.clear();
        store('app-configurations', app_configurations);
      }

      var getAll = function() {
        getUser();
        getToken();
        getEmpreendimento();
        getPlayerId();

        // if (Session.user && Session.empreendimento) {
        //   $state.go('app.home');
        //   return true;
        // } else {
        //   $state.go('login');
        //   return false;
        // }
      }

      var getUser = function() {
        var user = JSON.parse(get(storageUser));

        if (user !== null)
          Session.setUser(user);
      }

      var getPlayerId = function() {
        var playerId = get(storagePlayerId);

        if (playerId !== null)
          Session.setPlayerId(playerId);
      }

      var storeUser = function() {
        if (Session.user !== null)
          store(storageUser, JSON.stringify(Session.user));
      }

      var getEmpreendimento = function() {
        var empreendimento = JSON.parse(get(storageEmpreendimento));

        if (empreendimento !== null)
          Session.empreendimento = empreendimento;
      }

      var storeEmpreendimento = function() {
        if (Session.empreendimento !== null)
          store(storageEmpreendimento, JSON.stringify(Session.empreendimento));
      }

      var getToken = function() {
        var token = get(storageToken);

        if (token !== null)
          Session.token = token;
      }

      var storeToken = function() {
        if (Session.token !== null)
          store(storageToken, JSON.stringify(Session.token));
      }

      return {
        getAll: getAll,
        getUser: getUser,
        getPlayerId: getPlayerId,
        storeUser: storeUser,
        getToken: getToken,
        storeToken: storeToken,
        getEmpreendimento: getEmpreendimento,
        storeEmpreendimento: storeEmpreendimento,
        clear: clear,
        get: get,
        store: store
      };
    }
  ]);
})();