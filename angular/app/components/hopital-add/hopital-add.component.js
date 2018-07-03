class HopitalAddController{
    constructor($stateParams, $state, API,$localStorage,$http,$scope,$filter,ApiBaseUrl,Upload,$translate){
        'ngInject';
        this.$state = $state
        this.$translate = $translate
        this.formSubmitted = false
        this.alerts = []
        this.API = API
        this.$localStorage = $localStorage
        $scope.camer={}
        $scope.name_fichier=""

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        /*on recupere le json cameroun*/
        console.log('je suis la')
        $http.get('camer.json').then(function (data) {
            $scope.camer = data.data;
            $scope.cameroun = data.data;
            console.log(data.data)
        },function (error) {
            console.log(error)
        })

        $scope.choix_region = function(region){
            $scope.dep = $filter('filter')($scope.cameroun,{name:region})[0].departements;
            console.log($scope.dep);
        }

        $scope.choix_departement = function(){
            $scope.listarrondissements=JSON.parse($scope.departement).arrondissements;

        }

        $scope.save = function (isValid){
            if (isValid) {
                //let $state = this.$state
                console.log(JSON.parse($scope.departement).name)
                let HopitalData = API.service('hopitals')
                HopitalData.post({
                    'nom': $scope.nom,
                    'type': $scope.type,
                    'latitude': $scope.latitude,
                    'longitude': $scope.longitude,
                    'region': $scope.region,
                    'departement': JSON.parse($scope.departement).name,
                    'localite': $scope.arrondissement
                }).then(function (response) {
                    if(response.success ==true){
                        $translate('hopital_cree').then(function (translation) {
                            let alert = { type: 'success', 'title': 'Success!', msg: translation }
                            $state.go($state.current, { alerts: alert})
                        },function (error) {
                            console.log('error',error)
                        })

                    }else{
                        let alert = { type: 'error', 'title': 'Error!', msg: response.message }
                        $state.go($state.current, { alerts: alert})
                    }

                }, function (response) {
                    let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
                    $state.go($state.current, { alerts: alert})
                })
            }
        }

        $scope.fichier_present = function(){
            if($scope.file.name !==null){
                $scope.name_fichier=$scope.file.name;
                console.log($scope.file.name)
            }
            //$scope.$apply();
        }
        $scope.save_fichier = function() {

            //let $state = this.$state
            //console.log($scope.file)
            Upload.upload({
                url: ApiBaseUrl+'hopital_file',
                data: {file: $scope.file}
            }).then(function (response) {
                console.log(response)
                if(response.data[0].success ==true){
                    $translate('fichier_save').then(function (translation) {
                        let alert = { type: 'success', 'title': 'Success!', msg: translation }
                        $state.go($state.current, { alerts: alert})
                    },function (error) {
                        console.log('error',error)
                    })
                }else{
                    alert(response.data[0].message);
                }
            }, function (response) {
                let alert = { type: 'error', 'title': 'Error!', msg: response.data[0].message }
                $state.go($state.current, { alerts: alert})
            });
        }
    }



    $onInit(){
    }
}

export const HopitalAddComponent = {
    templateUrl: './views/app/components/hopital-add/hopital-add.component.html',
    controller: HopitalAddController,
    controllerAs: 'vm',
    bindings: {}
}
