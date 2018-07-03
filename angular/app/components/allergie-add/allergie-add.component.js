class AllergieAddController{
    constructor($stateParams, $state, API,$localStorage,$translate){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.$translate = $translate
        this.alerts = []
        this.API = API
        this.$localStorage = $localStorage
        //
        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            let AllergieData = this.API.service('allergies')
            let $trans = this.$translate
            console.log(this.$localStorage.user_id)
            AllergieData.post({
                'nom_en': this.nom_en,
                'nom_fr': this.nom_fr,
                'medecin_id': this.$localStorage.user_id
            }).then(function (response) {
                if(response.success ==true){
                    $trans('allergie_cree').then(function (translation) {
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

export const AllergieAddComponent = {
    templateUrl: './views/app/components/allergie-add/allergie-add.component.html',
    controller: AllergieAddController,
    controllerAs: 'vm',
    bindings: {}
}
