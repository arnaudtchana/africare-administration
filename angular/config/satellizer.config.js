export function SatellizerConfig ($authProvider) {
  'ngInject'

  $authProvider.httpInterceptor = function () {
    return true
  }

  $authProvider.loginUrl = 'http://africare_server.local/api/authenticate_admin'
  $authProvider.signupUrl = '/api/auth/register'
  $authProvider.tokenRoot = 'data' // compensates success response macro
}
