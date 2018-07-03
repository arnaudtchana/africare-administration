class HopitalEditController{
    constructor($stateParams, $state, API,$translate){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
        this.$translate = $translate
        this.userRolesSelected = []

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        let hopitalId = $stateParams.hopitalId

        let HopitalData = API.service('hopitals')
        HopitalData.one(hopitalId).get()
            .then((response) => {
                //console.log(userResponse);
                this.hopitaleditdata = API.copy(response)
            })
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            let $translate = this.$translate
            this.hopitaleditdata.put()
                .then(() => {
                    $translate('update_reussi').then(function (translation) {
                        let alert = { type: 'success', 'title': 'Success!', msg: translation }
                        $state.go($state.current, { alerts: alert})
                    },function(error){
                        console.log('error',error)
                    })
                }, (response) => {
                    let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
                    $state.go($state.current, { alerts: alert})
                })
        } else {
            this.formSubmitted = true
        }
    }

    $onInit(){
    }
}

export const HopitalEditComponent = {
    templateUrl: './views/app/components/hopital-edit/hopital-edit.component.html',
    controller: HopitalEditController,
    controllerAs: 'vm',
    bindings: {}
}
