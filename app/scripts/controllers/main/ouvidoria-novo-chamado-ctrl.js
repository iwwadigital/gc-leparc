(function () {
  app.controller('OuvidoriaNovoChamadoController', [
    'OuvidoriaService', '$ionicHistory', 'Session', '$cordovaCamera', 'ToasterService', 'appConfig', '$ionicActionSheet',
    function (OuvidoriaService, $ionicHistory, Session, $cordovaCamera, ToasterService, appConfig, $ionicActionSheet) {
      var vm = this;

      vm.ocorrencia = {
        images: [],
        empreendimento_id: Session.empreendimento.id
      };

      OuvidoriaService.getTiposDeOcorrencia().then(response => {
        vm.tipos_ocorrencias = response.data.tipos_chamadas;
      });

      // OuvidoriaService.getAreasDeServico().then(response => {
      //   vm.area_servico = response.data.dependencias;
      // });

      OuvidoriaService.getAssuntos().then(response => {
        vm.assunto = response.data.assuntos_chamadas;
      });

      OuvidoriaService.getOcorrencias().then(response => {
        vm.chamados = response.data.chamados;
      });

      vm.select = () => {
        if (vm.ocorrencia.images.length >= appConfig.max_fotos_upload_ouvidoria) {
          ToasterService.show('O número máximo de fotos foi atingido');
          return;
        }

        vm.hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: 'Foto' },
            { text: 'Galeria' }
          ],
          cancelText: 'Cancelar',
          titleText: 'Selecione uma opção',
          buttonClicked: index => {
            var source = index === 1 ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA;

            $cordovaCamera.getPicture({
              quality: 100,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: source,
              encodingType: Camera.EncodingType.JPEG,
              allowEdit: true,
              targetWidth: 640,
              targetHeight: 640
            }).then(image => {
              vm.ocorrencia.images.push({
                id: 0,
                usuario_id: Session.user.id,
                arquivo: 'data:image/jpeg;base64,' + image
              });
            }, error => {
              console.log('$cordovaCamera->error', error);
            });
          }
        });
      };

      vm.deselect = index => {
        vm.ocorrencia.images.splice(index, 1);
      };

      vm.createOcorrencia = () => {
        OuvidoriaService.createOcorrencia(vm.ocorrencia).then(response => {
          $ionicHistory.goBack();
        });
      };

      window.analytics && window.analytics.trackView('Ouvidoria Nova Ocorrência');
    }
  ]);
})();
