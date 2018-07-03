class MedecinAddController{
    constructor(API, $state, $stateParams,Upload,$scope,ApiBaseUrl,$translate){
        'ngInject';
        this.$state = $state
        this.$translate = $translate
        //this.formSubmitted = false
        this.API = API
        this.alerts = []
        $scope.name_fichier=""
        //
        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        $scope.fichier_present = function(){
            if($scope.file.name !==null){
                $scope.name_fichier=$scope.file.name;
                console.log($scope.file.name)
            }
            //$scope.$apply();
        }
        $scope.save_fichier = function() {

            let Medecin_liste = API.service('medecin_file')
            console.log(Medecin_liste)
            console.log(Medecin_liste)
            //let $state = this.$state
            //console.log($scope.file)
            Upload.upload({
                url: ApiBaseUrl+'medecin_file',
                data: {file: $scope.file}
            }).then(function (response) {
                console.log(response)
                if(response.data[0].success ==true){
                    $translate('fichier_save').then(function (translation) {
                        console.log('ici le resultat de la translation',translation)
                        //$scope.translation = translation
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

    save_compte () {
        //this.$state.go(this.$state.current, {}, { alerts: 'test' })
        console.log(this.email,this.tel);
        /*on regarde si le tel est valide*/
        console.log(this.valide_num(this.tel));
            if(this.valide_num(this.tel)){
                let Compte_temporaire = this.API.service('compte_temporaires')
                let $state = this.$state
                let $trans = this.$translate
                Compte_temporaire.post({
                    'email': this.email,
                    'tel': this.tel
                }).then(function (response) {
                    console.log(response)
                    if(response[0].success == true){
                        $trans('compte_temp_cree').then(function (translation) {
                            console.log('ici le resultat de la translation',translation)
                        let alert = { type: 'success', 'title': 'Success!', msg: translation }
                        $state.go($state.current, { alerts: alert})
                        },function (error) {
                            console.log('error',error)
                        })
                    }else{
                        /*on affiche le message d'erreur*/
                        alert(response[0].message);
                    }


                }, function (response) {
                    let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
                    $state.go($state.current, { alerts: alert})
                })
            }else{
                this.phone_invalid = true;
                console.log(this.phone_error)
            }


    }

    valide_num (numero){
        var test = Math.floor(numero/100000000);
        if((test ===6 || test ===2 )&& numero.length ===9){
            return true;
        }else{
            return false;
        }
    }



    $onInit(){
        this.phone_invalid = false
    }

}

export const MedecinAddComponent = {
    templateUrl: './views/app/components/medecin-add/medecin-add.component.html',
    controller: MedecinAddController,
    controllerAs: 'vm',
    bindings: {}
}
