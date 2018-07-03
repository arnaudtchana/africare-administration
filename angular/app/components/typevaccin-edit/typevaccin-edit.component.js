class TypevaccinEditController{
    constructor($stateParams, $state, API,$translate){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.$translate = $translate
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
            let $translate = this.$translate
            this.typevaccineditdata.put()
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

export const TypevaccinEditComponent = {
    templateUrl: './views/app/components/typevaccin-edit/typevaccin-edit.component.html',
    controller: TypevaccinEditController,
    controllerAs: 'vm',
    bindings: {}
}
