class MaladieEditController{
    constructor($stateParams, $state, API){
        'ngInject';

        //
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
        this.userRolesSelected = []

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        let maladieId = $stateParams.maladieId

        let MaladieData = API.service('maladies')
        MaladieData.one(maladieId).get()
            .then((response) => {
                console.log(response)
                //console.log(userResponse);
                this.maladieeditdata = API.copy(response)
            })
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            this.maladieeditdata.put()
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

export const MaladieEditComponent = {
    templateUrl: './views/app/components/maladie-edit/maladie-edit.component.html',
    controller: MaladieEditController,
    controllerAs: 'vm',
    bindings: {}
}
