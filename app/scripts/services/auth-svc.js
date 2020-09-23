(function() {
  app.service('AuthService', [
    'Session', '$q',
    function(Session, $q) {

      return {
        waitForSignIn: waitForSignIn,
        requireSignIn: requireSignIn
      }

      // Retorna o status da auntenticacao
      function waitForSignIn() {
        return Session.user && Session.empreendimento ? true : false;
        // return localStorage.user && localStorage.empreendimento ? true : false;
      }

      // Retorna o status da autenticacao e caso nao haja gera um erro de acesso
      function requireSignIn() {
        var hasAuth = waitForSignIn();
        if (!hasAuth) {
          var error = 'AUTH_REQUIRED';
          return $q.reject(error);
        }
        return hasAuth;
      }

    }
  ]);
})();
