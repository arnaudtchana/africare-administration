class AllergieEditController{
    constructor($stateParams, $state, API){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
        this.userRolesSelected = []

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        let allergieId = $stateParams.allergieId

        let AllergieData = API.service('allergies')
        AllergieData.one(allergieId).get()
            .then((response) => {
                console.log(response)
                //console.log(userResponse);
                this.allergieeditdata = API.copy(response)
            })
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            this.allergieeditdata.put()
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

export const AllergieEditComponent = {
    templateUrl: './views/app/components/allergie-edit/allergie-edit.component.html',
    controller: AllergieEditController,
    controllerAs: 'vm',
    bindings: {}
}
