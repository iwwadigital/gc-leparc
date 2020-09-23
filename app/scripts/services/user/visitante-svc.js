(function () {
  app.service('VisitanteService', [
    'Session', 'AjaxService',
    function (Session, AjaxService) {
      var getVisitantes = function (filters) {
        return AjaxService.request({
          method: 'GET',
          url: apiURL + 'visitantes?empreendimento=' + Session.empreendimento.id + '&usuario_id=' + Session.user.id + (filters ? filters : '')
        }, 'Não foi possível recuperar seus dados de visitantes');
      }

      var getVisitante = function (id) {
        return AjaxService.request({
          method: 'GET',
          url: apiURL + 'visitantes/' + id
        }, 'Não foi possível recuperar visitante');
      }

      var deleteVisitante = function (id) {
        return AjaxService.request({
          method: 'DELETE',
          url: apiURL + 'visitantes/' + id
        }, 'Não foi possível deletar visitante');
      }

      var createVisitante = function (data) {
        return AjaxService.request({
          method: 'POST',
          url: apiURL + 'visitantes',
          data: data
        });
      }

      var updateVisitante = function (data) {
        return AjaxService.request({
          method: 'PATCH',
          url: apiURL + 'visitantes/' + data.id,
          data: data
        });
      }

      return {
        getVisitantes: getVisitantes,
        deleteVisitante: deleteVisitante,
        getVisitante: getVisitante,
        createVisitante: createVisitante,
        updateVisitante: updateVisitante
      };
    }
  ]);
})();
