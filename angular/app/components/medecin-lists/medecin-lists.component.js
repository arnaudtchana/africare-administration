class MedecinListsController{
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API,$translate){
        'ngInject';
        this.API = API
        this.$state = $state
        $translate(['region','departement','arrondissement','nom','specialite']).then(function (translation) {
            console.log('ici le resultat de la translation',translation)
            $scope.translation = translation
            //this.translation = translation
        },function (error) {
            console.log('error',error)
        })
        let Medecins = this.API.service('medecins')
        Medecins.getList()
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('ID'),
                    DTColumnBuilder.newColumn('nom').withTitle('Nom'),
                    DTColumnBuilder.newColumn('numero_tel').withTitle('Tel'),
                    DTColumnBuilder.newColumn('email').withTitle('Email'),
                    DTColumnBuilder.newColumn('nom_fr').withTitle($scope.translation.specialite),
                    DTColumnBuilder.newColumn('region').withTitle($scope.translation.region),
                    DTColumnBuilder.newColumn('departement').withTitle($scope.translation.departement),
                    DTColumnBuilder.newColumn('arrondissement').withTitle($scope.translation.arrondissement),
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
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }
    }

    delete (medecinId) {
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
            API.one('medecins', medecinId).remove()
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

    $onInit(){
    }
}

export const MedecinListsComponent = {
    templateUrl: './views/app/components/medecin-lists/medecin-lists.component.html',
    controller: MedecinListsController,
    controllerAs: 'vm',
    bindings: {}
}
