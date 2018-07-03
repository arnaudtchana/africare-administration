class AllergieListsController{
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API,$translate){
        'ngInject';
        this.API = API
        this.$state = $state
        this.$translate = $translate
        $translate(['nom_francais','nom_anglais']).then(function (translation) {
            console.log('ici le resultat de la translation',translation)
            $scope.translation = translation
            //this.translation = translation
        },function (error) {
            console.log('error',error)
        })
        let Allergies = this.API.service('allergies')

        Allergies.getList()
            .then((response) => {
                let dataSet = response.plain()
                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('ID'),
                    DTColumnBuilder.newColumn('nom_en').withTitle($scope.translation.nom_anglais),
                    DTColumnBuilder.newColumn('nom_fr').withTitle($scope.translation.nom_francais),
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
                <a class="btn btn-xs btn-warning" ui-sref="app.allergieedit({allergieId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }
    }

    delete (allergieId) {
        let API = this.API
        let $state = this.$state
        this.$translate(['ete_vous_sur','data_non_recuperable','oui_supprimer','supprimer','allergie_delete']).then(function (translation) {
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
            API.one('allergies', allergieId).remove()
                .then(() => {
                    swal({
                        title: translation.supprimer,
                        text: translation.allergie_delete,
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

export const AllergieListsComponent = {
    templateUrl: './views/app/components/allergie-lists/allergie-lists.component.html',
    controller: AllergieListsController,
    controllerAs: 'vm',
    bindings: {}
}
