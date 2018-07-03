class HopitalListsController{
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API,$translate){
        'ngInject';
        this.API = API
        this.$state = $state
        this.$translate = $translate
        $translate(['region','departement','arrondissement','nom_hopital']).then(function (translation) {
            console.log('ici le resultat de la translation',translation)
            $scope.translation = translation
            //this.translation = translation
        },function (error) {
            console.log('error',error)
        })
        let Hopitals = this.API.service('hopitals')

        Hopitals.getList()
            .then((response) => {
                let dataSet = response.plain()
                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('ID'),
                    DTColumnBuilder.newColumn('nom').withTitle($scope.translation.nom_hopital),
                    DTColumnBuilder.newColumn('region').withTitle($scope.translation.region),
                    DTColumnBuilder.newColumn('departement').withTitle($scope.translation.departement),
                    DTColumnBuilder.newColumn('localite').withTitle($scope.translation.arrondissement),
                    DTColumnBuilder.newColumn('latitude').withTitle('Latitude'),
                    DTColumnBuilder.newColumn('longitude').withTitle('Longitude'),
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
                <a class="btn btn-xs btn-warning" ui-sref="app.hopitaledit({hopitalId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }
    }

    delete (hopitalId) {
        let API = this.API
        let $state = this.$state
        this.$translate(['ete_vous_sur','data_non_recuperable','oui_supprimer','supprimer','hopital_delete']).then(function (translation) {
            console.log('ici le resultat de la translation',translation)
        swal({
            title: translation.ete_vous_sur,
            text: translation.data_non_recuperable,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: translation.oui_supprimer,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            html: false
        }, function () {
            API.one('hopitals', hopitalId).remove()
                .then(() => {
                    swal({
                        title: translation.supprimer,
                        text: translation.hopital_delete,
                        type: 'success',
                        confirmButtonText: 'OK',
                        closeOnConfirm: true
                    }, function () {
                        $state.reload()
                    })
                })
        })
        },function (error) {
            console.log('error',error)
        })
    }

    $onInit(){
    }
}

export const HopitalListsComponent = {
    templateUrl: './views/app/components/hopital-lists/hopital-lists.component.html',
    controller: HopitalListsController,
    controllerAs: 'vm',
    bindings: {}
}
