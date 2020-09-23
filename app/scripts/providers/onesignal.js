(function() {
	angular.module('OneSignal', [])
		.run(['$ionicPlatform', 'appConfig', '$state', '$ionicPopup',
			function($ionicPlatform, appConfig, $state, $ionicPopup) {

				$ionicPlatform.ready(() => {
					if (window.plugins && window.plugins.OneSignal) {
						init();
						getIds();
					}
				});


				function getIds() {
					window.plugins.OneSignal.getIds(ids => {
						localStorage.oneSignalUserId = ids.userId;
						localStorage.oneSignalPushToken = ids.pushToken;
					});
				}


				function notificationOpenedCallback(data) {
					if (data.isAppInFocus) {
						var subtitle = data.payload.body.length > 75 ? data.payload.body.substring(0, 75) + '...' : data.payload.body;
						$ionicPopup.alert({
								title: appConfig.appTitle,
								subTitle: subtitle
							})
							.then(response => {
								$state.go('app.notificacao');
							});
					} else {
						$state.go('app.notificacao');
					}
				}


				function init() {
					window.plugins.OneSignal
						.startInit(THEME_CONFIG.oneSignal.appId, THEME_CONFIG.oneSignal.options.googleProjectNumber)
						.handleNotificationReceived(notificationOpenedCallback)
						.inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
						.endInit();
				}

			}
		]);

})();
