class HopitalGraphController{
    constructor($stateParams, $state, API,$localStorage,$scope){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
        this.API = API
        this.$localStorage = $localStorage
        //

        let Hopitals = this.API.service('graph_hopitals')
        Hopitals.getList()
            .then(function (response) {
                /*ici en fonciton de la langue on afficher nom_en ou nom_fr*/
                $scope.barChartLabelstest = []
                $scope.barChartDatatest = []
                $scope.rep = response[0];
                console.log(response)
                angular.forEach(response,function (value,key) {
                    $scope.barChartLabelstest.push(value.region);
                    $scope.barChartDatatest.push(value.nbr_hopitaux);
                })
                $scope.barChartLabels = $scope.barChartLabelstest
                $scope.barChartData = [
                    $scope.barChartDatatest
                ]
                $scope.barChartColours = [
                    {
                        fillColor: '#00A65A',
                        strokeColor: '#00A65A',
                        pointColor: '#2980b9',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(77,83,96,1)'
                    }
                ]
            },function (error) {
                console.log(error)
            })
    }

    $onInit(){
    }
}

export const HopitalGraphComponent = {
    templateUrl: './views/app/components/hopital-graph/hopital-graph.component.html',
    controller: HopitalGraphController,
    controllerAs: 'vm',
    bindings: {}
}
