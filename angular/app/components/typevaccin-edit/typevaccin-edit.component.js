class TypevaccinEditController{
    constructor($stateParams, $state, API){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        let typevaccinId = $stateParams.typevaccinId

        let TypevaccinData = API.service('typevaccins')
        TypevaccinData.one(typevaccinId).get()
            .then((response) => {
                console.log(response)
                //console.log(userResponse);
                this.typevaccineditdata = API.copy(response)
            })
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            this.typevaccineditdata.put()
                .then(() => {
                    let alert = { type: 'success', 'title': 'Success!', msg: 'Vaccin\'s type has been updated.' }
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

export const TypevaccinEditComponent = {
    templateUrl: './views/app/components/typevaccin-edit/typevaccin-edit.component.html',
    controller: TypevaccinEditController,
    controllerAs: 'vm',
    bindings: {}
}
