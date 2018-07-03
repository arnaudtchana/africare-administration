class UserListsController {
  constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API,$translate) {
    'ngInject'
    this.API = API
    this.$state = $state
/*je vais revenir a ce niveau plutard*/
      $translate(['region','departement','arrondissement','tel','tel_urgence']).then(function (translation) {
          console.log('ici le resultat de la translation',translation)
          $scope.translation = translation
          //this.translation = translation
      },function (error) {
          console.log('error',error)
      })
    let Users = this.API.service('user_personnes')

    Users.getList()
      .then((response) => {
        let dataSet = response.plain()

          this.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('data', dataSet)
              .withOption('createdRow', createdRow)
              .withOption('responsive', true)
              .withBootstrap()

          this.dtColumns = [
              DTColumnBuilder.newColumn('id').withTitle('ID'),
              DTColumnBuilder.newColumn('email').withTitle('Email'),
              DTColumnBuilder.newColumn('numero_tel').withTitle($scope.translation.tel),
              DTColumnBuilder.newColumn('region').withTitle($scope.translation.region),
              DTColumnBuilder.newColumn('departement').withTitle($scope.translation.departement),
              DTColumnBuilder.newColumn('arrondissement').withTitle($scope.translation.arrondissement),
              DTColumnBuilder.newColumn('numero_urgence').withTitle($scope.translation.tel_urgence),
              DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                  .renderWith(actionsHtml)
          ]

          this.displayTable = true
      })

    let createdRow = (row) => {
      $compile(angular.element(row).contents())($scope)
    }

    let actionsHtml = (data) => {
      return `
                <a class="btn btn-xs btn-warning" ui-sref="app.useredit({userId: ${data.user.id}})">
                    <i class="fa fa-edit"></i>
                </a>`
    }
  }

  delete (userId) {
    let API = this.API
    let $state = this.$state

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
      html: false
    }, function () {
      API.one('users').one('user', userId).remove()
        .then(() => {
          swal({
            title: 'Deleted!',
            text: 'User Permission has been deleted.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            $state.reload()
          })
        })
    })
  }

  $onInit () {}
}

export const UserListsComponent = {
  templateUrl: './views/app/components/user-lists/user-lists.component.html',
  controller: UserListsController,
  controllerAs: 'vm',
  bindings: {}
}
