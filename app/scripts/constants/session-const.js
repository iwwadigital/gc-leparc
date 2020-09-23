(function() {
  'use strict';
	app.constant('Session', {
		user : null,
		token: null,
		empreendimento: null,
		playerId: null,
		setUser: function(user) {
			this.user = user;
		},
		setPlayerId: function(playerId) {
			this.playerId = playerId;
		},
		setToken: function(token) {
			this.token = token;
		},
		getConjuntos: function() {
			var conjuntos = '';

			this.user.moradias.forEach((element, index) => {
				conjuntos += element.conjunto_id + ','
			});

			return conjuntos;
		}
	});
})();