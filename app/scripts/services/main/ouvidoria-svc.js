(function() {
	app.service('OuvidoriaService', [
		'Session', 'AjaxService',
		function(Session, AjaxService) {
			return {
				getTiposDeOcorrencia: getTiposDeOcorrencia,
				// getAreasDeServico: getAreasDeServico,
				getAssuntos: getAssuntos,
				createComment: createComment,
				getOcorrencias: getOcorrencias,
				getOcorrencia: getOcorrencia,
				createOcorrencia: createOcorrencia,
				deleteMidia: deleteMidia,
				atualizarOcorrencia: atualizarOcorrencia
      };

			function getTiposDeOcorrencia() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'chamadotipo?empreendimento=' + Session.empreendimento.id
				}, 'Não foi possível recuperar os tipos de ocorrência');
			}

			// var getAreasDeServico = function() {
			// 	return AjaxService.request({
			// 		method: 'GET',
			// 		url: apiURL + 'dependencia?conjunto=' + Session.getConjuntos() + '&empreendimento=' + Session.empreendimento.id
			// 	}, 'Não foi possível recuperar as dependências do empreendimento');
			// };

			function getAssuntos() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'chamadoassunto?empreendimento=' + Session.empreendimento.id
				}, 'Não foi possível recuperar os assuntos');
			}

			function createOcorrencia(ocorrencia) {
				return AjaxService.request({
					method: 'POST',
					url: apiURL + 'chamado',
					data: {
						usuario_id: Session.user.id,
						// dependencia_id: ocorrencia.dependencia.id,
						chamado_tipo_id: ocorrencia.tipo_ocorrencia.id,
						chamado_assunto_id: ocorrencia.assunto.id,
						titulo: ocorrencia.tipo_ocorrencia.titulo + ' sobre ' + ocorrencia.assunto.titulo,
						data_ocorrencia: now(ocorrencia.data),
						data_aberto: now(),
						conteudo: ocorrencia.descricao,
						empreendimento_id: ocorrencia.empreendimento_id,
						images: ocorrencia.images
					}
				}, 'Não foi possível cadastrar a ocorrência', 'Ocorrência cadastrada com sucesso');
			}

			function atualizarOcorrencia(ocorrencia) {
				return AjaxService.request({
					method: 'PUT',
					url: apiURL + 'updateStatus/'+ocorrencia.id,
					data: ocorrencia
				}, 'Não foi possível finalizar a ocorrência', 'Ocorrência finalizada com Sucesso!');
			}

			function createComment(comment) {
				return AjaxService.request({
					method: 'POST',
					url: apiURL + 'chamadocomentario',
					data: {
						usuario_id: Session.user.id,
						chamado_id: comment.ocorrencia.id,
						data_postagem: now(),
						conteudo: comment.content
					}
				}, 'Não foi cadastrar a ocorrência', 'Ocorrência cadastrada com sucesso');
			}

			function getOcorrencias() {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'chamado?usuario=' + Session.user.id
				}, 'Não foi possível recuperar as ocorrências');
			}

			function getOcorrencia(id) {
				return AjaxService.request({
					method: 'GET',
					url: apiURL + 'chamado/' + id
				}, 'Não foi possível recuperar ocorrência');
			}

			function deleteMidia(id) {
				return AjaxService.request({
					method: 'DELETE',
					url: apiURL + 'midia/' + id
				}, 'Imagem deletada com sucesso');
			}
		}
	]);
})();
