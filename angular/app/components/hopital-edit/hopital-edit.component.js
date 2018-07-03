class HopitalEditController{
    constructor($stateParams, $state, API){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
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
            this.hopitaleditdata.put()
                .then(() => {
                    let alert = { type: 'success', 'title': 'Success!', msg: 'User has been updated.' }
                    $state.go($state.current, { alerts: alert})
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
