(function () {
  app.controller('ClassificadoNovoController', [
    'ClassificadosService', '$stateParams', '$cordovaCamera', 'appConfig', 'ToasterService', 'Session', '$ionicHistory', '$cordovaDialogs', '$ionicActionSheet', 'LoaderService', '$http', '$cordovaFileTransfer', '$q',
    function (ClassificadosService, $stateParams, $cordovaCamera, appConfig, ToasterService, Session, $ionicHistory, $cordovaDialogs, $ionicActionSheet, LoaderService, $http, $cordovaFileTransfer, $q) {
      var vm = this;
      vm.title = $stateParams.id ? 'Editar Classificado' : 'Novo Classificado';
      vm.images = [];
      vm.timestamp = Date.now();

      if ($stateParams.id) {
        ClassificadosService.getClassificado($stateParams.id).then((response) => {
          vm.classificado = response.data.post;
          vm.classificado.produtoNovo = vm.classificado.usado && vm.classificado.usado !== 'Novo' ? false : true;
          vm.images = vm.classificado.midias;
        });
      }

      ClassificadosService.getCategorias().then((response) => {
        vm.categorias = response.data.tipos_post;
      });

      vm.validate = function () {
        var error = false;

        if (!vm.classificado.titulo)
          error = "O nome do classificado é obrigatório";
        else if (!vm.classificado.preco)
          error = "O preço do classificado é obrigatório";
        //else if (!vm.classificado.produtoNovo && !vm.classificado.usado)
          //error = "Você precisa dizer quanto tempo de uso tem o produto";

        if (error)
          ToasterService.show(error);

        return error;
      }

      vm.salvarClassificado = function () {
        if (vm.validate() !== false) {
          document.querySelector('form').classList.remove('ng-pristine');
          document.querySelectorAll('.input.ng-pristine').forEach(element => element.classList.remove('ng-pristine'));
          return;
        }

        var classificado = {
          usuario_id: Session.user.id,
          empreendimento_id: Session.empreendimento.id,
          post_tipo_id: vm.classificado.tipo_post.id,
          titulo: vm.classificado.titulo,
          conteudo: vm.classificado.conteudo,
          post_type: "classificado",
          preco: vm.classificado.preco,
          usado: vm.usado,
          timestamp: vm.timestamp,
          imagens: vm.images
        };

        if (vm.images.length > 0 && !vm.classificado.imagem_destacada) {
          classificado['imagem_destacada'] = vm.images[0].arquivo;
        }

        if ($stateParams.id) {
          classificado['data_ultima_edicao'] = now();
          classificado['id'] = vm.classificado.id;
          ClassificadosService.updateClassificado(classificado, vm.classificado.id).then((response) => {
            if (response.data.success) {
              ToasterService.show('Classificado editado com sucesso');
              $ionicHistory.goBack();
            } else {
              ToasterService.show('Não foi possível editar classificado');
            }
          });
        } else {
          classificado['data_postagem'] = now();
          ClassificadosService.createClassificado(classificado).then((response) => {
            if (response.data.success) {
              ToasterService.show('Classificado criado com sucesso');
              $ionicHistory.goBack();
            } else {
              ToasterService.show('Não foi possível criar classificado');
            }
          });
        }
      }

      vm.select = function () {
        if (vm.images.length >= appConfig.max_fotos_upload_classificado) {
          ToasterService.show('O número máximo de fotos foi atingido');
          return;
        }

        vm.hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: 'Foto' },
            { text: 'Galeria' }
          ],
          cancelText: 'Cancelar',
          titleText: 'Selecione uma Opção',
          buttonClicked: (index) => {
            var source = index === 1 ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA;

            $cordovaCamera.getPicture({
              quality: 100,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: source,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 640,
              targetHeight: 640
            }).then((image) => {

              var options = new FileUploadOptions();
              options.fileKey = 'file[]';
              options.mimeType = 'image/jpeg';
              options.headers = {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/"/g, '')
              };
              options.transformRequest = angular.identity;
              options.fileName = Date.now() + '.jpg';
              options.params = {
                'timestamp': vm.timestamp,
                'usuario_id': Session.user.id,
                'type': 'img'
              };

              LoaderService.show();
              var ft = new FileTransfer();

              ft.upload(image, apiURL + 'midia', success => {
                console.log('FileTransfer->success:', success);
                var uploaded = JSON.parse(success.response);

                if (uploaded.success) {
                  uploaded = uploaded.midias[0];
                  vm.images.push(uploaded);
                  console.log(vm.images);
                  LoaderService.hide();
                }

                vm.hideSheet();

              }, fail => {
                console.log('FileTransfer->fail:', fail);
              }, options);

            }, error => { // $cordovaCamera -> error
              console.log('$cordovaCamera->error:', error);
              vm.hideSheet();
            });
          }
        });
      }

      vm.deselect = function (index) {
        var element = document.getElementById("preview-" + index);
        element.remove();

        var id = vm.images[index].id;

        if (id > 0) {
          ClassificadosService.deleteMidia(id).then((response) => { });
        }

        vm.images.splice(index, 1);
      }

      window.analytics && window.analytics.trackView('Classificado - Novo');
    }
  ]);
})();
