class VaccinEditController{
    constructor($stateParams, $state, API){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
        this.userRolesSelected = []

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        let vaccinId = $stateParams.vaccinId

        let VaccinData = API.service('vaccins')
        VaccinData.one(vaccinId).get()
            .then((response) => {
                console.log(response)
                //console.log(userResponse);
                this.vaccineditdata = API.copy(response)
            })
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            this.vaccineditdata.put()
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

export const VaccinEditComponent = {
    templateUrl: './views/app/components/vaccin-edit/vaccin-edit.component.html',
    controller: VaccinEditController,
    controllerAs: 'vm',
    bindings: {}
}
