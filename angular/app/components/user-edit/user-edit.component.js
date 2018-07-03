class UserEditController {
  constructor ($stateParams, $state, API,$translate) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.userRolesSelected = []
      this.$translate = $translate

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

    let userId = $stateParams.userId

    let Roles = API.service('roles_user_personne')
    Roles.getList()
      .then((response) => {
        let systemRoles = []
        let roleResponse = response.plain()

          //console.log(roleResponse)
        angular.forEach(roleResponse, function (value) {
          systemRoles.push({id: value.id, name: value.name})
        })

        this.systemRoles = systemRoles
      })

    let UserData = API.service('user_personnes')
    UserData.one(userId).get()
      .then((response) => {
          console.log(response)
        let userRole = []
        let userResponse = response.plain()
        //console.log(userResponse);
        angular.forEach(userResponse.roles, function (value) {
          userRole.push(value.id)
        })

        response.roles = userRole
        this.usereditdata = API.copy(response)
      })
  }

  save (isValid) {
    if (isValid) {
      let $state = this.$state
        let $translate = this.$translate
      this.usereditdata.put()
        .then(() => {
            $translate('role_update').then(function (translation) {
                let alert = { type: 'success', 'title': 'Success!', msg: translation }
                $state.go($state.current, { alerts: alert})
            })

        }, (response) => {
          let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
          $state.go($state.current, { alerts: alert})
        })
    } else {
      this.formSubmitted = true
    }
  }

  $onInit () {}
}

export const UserEditComponent = {
  templateUrl: './views/app/components/user-edit/user-edit.component.html',
  controller: UserEditController,
  controllerAs: 'vm',
  bindings: {}
}
