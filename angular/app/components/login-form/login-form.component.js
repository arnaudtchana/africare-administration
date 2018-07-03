class LoginFormController {
  constructor ($rootScope,$localStorage, $auth, $state, $stateParams, API, AclService,$scope,$translate) {
    'ngInject'

    delete $rootScope.me

    this.$auth = $auth
    this.$state = $state
    this.$stateParams = $stateParams
    this.AclService = AclService
      this.$rootScope = $rootScope
      this.$localStorage = $localStorage

    this.registerSuccess = $stateParams.registerSuccess
    this.successMsg = $stateParams.successMsg
    this.loginfailederror = ''
    this.loginfailed = false
    this.unverified = false
      $scope.lang = "en"

      $scope.change_langue = function () {
          $translate.use($scope.lang)
      }
  }

  $onInit () {
    this.email = ''
    this.password = ''
  }

  login () {
    this.loginfailederror = ''
    this.loginfailed = false
    this.unverified = false

    let user = {
      login: this.email,
      password: this.password
    }

    this.$auth.login(user)
      .then((response) => {
          //console.log(response.data);
        //let data = response.data.data
        //let AclService = this.AclService

        /*angular.forEach(data.userRole, function (value) {
          AclService.attachRole(value)
        })*/
          /*AclService.attachRole('admin')
        AclService.setAbilities('manage.users')*/
        this.$auth.setToken(response.data.token)
          this.$localStorage.user_id = response.data.user_id;
        this.$state.go('app.landing')
      })
      .catch(this.failedLogin.bind(this))
  }

  failedLogin (res) {
    if (res.status == 401) {
      this.loginfailed = true
    } else {
      if (res.data.errors.message[0] == 'Email Unverified') {
        this.unverified = true
      } else {
        // other kinds of error returned from server
        for (var error in res.data.errors) {
          this.loginfailederror += res.data.errors[error] + ' '
        }
      }
    }
  }
}

export const LoginFormComponent = {
  templateUrl: './views/app/components/login-form/login-form.component.html',
  controller: LoginFormController,
  controllerAs: 'vm',
  bindings: {}
}
