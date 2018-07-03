class VaccinAddController{
    constructor($stateParams, $state, API,$localStorage,$scope,$translate,$filter){
        'ngInject';
        this.$state = $state
        this.$translate = $translate
        this.formSubmitted = false
        this.alerts = []
        this.API = API
        this.$localStorage = $localStorage
        //
        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }
        //
        /*on recupere la liste de tous les types de vaccins ici*/

        let Type_vaccin = this.API.service('typevaccins')
        Type_vaccin.getList()
            .then(function (response) {
                /*ici en fonciton de la langue on afficher nom_en ou nom_fr*/
                console.log("fonctions de translate",$translate.use())
                //$scope.lang =
                $scope.lan = "nom_" + $translate.use()
                console.log(response);
                $scope.type_vaccin=[]
                if($translate.use()=="fr"){
                    angular.forEach(response,function (value,key) {
                        console.log(value,key)
                        /*on va recuperer l'attribut ici*/
                        $scope.type_vaccin.push({id:value.id,nom:value.nom_fr})
                    })
                }else{
                    angular.forEach(response,function (value,key) {
                        console.log(value,key)
                        /*on va recuperer l'attribut ici*/
                        $scope.type_vaccin.push({id:value.id,nom:value.nom_en})
                    })
                }

                /*console.log($scope.type_vaccin)
                $scope.type_vaccin = response*/
            },function (error) {
                console.log(error)
            })
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            let $trans = this.$translate
            let VaccinData = this.API.service('vaccins')
            console.log(this.$localStorage.user_id)
            VaccinData.post({
                'nom_en': this.nom_en,
                'nom_fr': this.nom_fr,
                'typevaccin_id':this.typevaccin_id,
                'medecin_id': this.$localStorage.user_id
            }).then(function (response) {
                if(response.success ==true){
                    $trans('vaccin_cree').then(function (translation) {
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
                let alert = { type: 'error', 'title': 'Error!', msg: response.message }
                $state.go($state.current, { alerts: alert})
            })
        }
    }

    $onInit(){

    }
}

export const VaccinAddComponent = {
    templateUrl: './views/app/components/vaccin-add/vaccin-add.component.html',
    controller: VaccinAddController,
    controllerAs: 'vm',
    bindings: {}
}
