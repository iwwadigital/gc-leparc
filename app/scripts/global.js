// App Modules
var app = angular.module('app', ['ionic', 'ngCordova', 'OneSignal', 'ui.utils.masks', 'ui.mask','onezone-datepicker']);
// var social = angular.module('socialSharing', []);

// App Base Urls
var url = 'http://sistema.globalcond.com.br';
// var url = 'http://sistema.globalcond.iwwa.local';
var apiURL = url + '/api/v1/';

// Date now function
function now(now,showMinuts) {
  now = now || new Date();
  if (!now instanceof Date) {
    now = new Date(now);
  }
  var retorno = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

  if(showMinuts == 'undefined' || showMinuts == 'true'){
  	retorno = + ' ' + now.getHours() + ':' + now.getMinutes();
  }

  return retorno;
}
