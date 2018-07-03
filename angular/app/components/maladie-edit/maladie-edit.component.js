class MaladieEditController{
    constructor($stateParams, $state, API,$translate){
        'ngInject';

        //
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
        this.$translate = $translate
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
            let $translate = this.$translate
            this.maladieeditdata.put()
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

export const MaladieEditComponent = {
    templateUrl: './views/app/components/maladie-edit/maladie-edit.component.html',
    controller: MaladieEditController,
    controllerAs: 'vm',
    bindings: {}
}
