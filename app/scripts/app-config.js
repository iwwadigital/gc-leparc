(function() {
	app.constant('appConfig', {
		appTitle: 'Global Cond',
		//URL do servidor
    url: url,
    //URL de Download
    urlDownload: url+'/api/v1/download/?file=',
		//Máximo de fotos para upload em Classificado
		max_fotos_upload_classificado: 5,
		//Máximo de fotos para upload em Ouvidoria
		max_fotos_upload_ouvidoria: 3,
		// URL da imagem padrão do usuário
		default_user: 'images/default_user.png',
		// URL da imagem padrão do post
		default_post: 'images/default_post.jpg',
		//Number of items to fetch from wordpress
		maxItemPaging: 5,
		//Number of slides to show
		slidesNumber: 5,
		//Max length to be visible in items. The calc is like: (VisibleLength320px * deviceWidth)/320px
		maxVisibleLength: parseInt((60 * window.innerWidth) / 320),
		//Minimum date for inputs
		minDate: new Date(),
	});
})();
