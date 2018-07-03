class MaladieGraphController{
    constructor($stateParams, $state, API,$localStorage,$scope,$translate){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
        this.API = API
        this.$localStorage = $localStorage
        let Maladies = this.API.service('maladies')
        Maladies.getList()
            .then(function (response) {
                /*ici en fonciton de la langue on afficher nom_en ou nom_fr*/
                $scope.maladies=[]
                if($translate.use()=="fr"){
                    angular.forEach(response,function (value,key) {
                        $scope.maladies.push({id:value.id,nom:value.nom_fr})
                    })
                }else{
                    angular.forEach(response,function (value,key) {
                        $scope.maladies.push({id:value.id,nom:value.nom_en})
                    })
                }
            },function (error) {
                console.log(error)
            })

        $scope.save = function (isValid) {
            /*fonction permettant de tracer le graphe des allergies*/
            if(isValid){
                let MaladiesData = API.service('graph_maladies')
                MaladiesData.one($scope.maladie_id).get()
                    .then((response) => {
                        //console.log(userResponse);
                        $scope.barChartLabelstest = []
                        $scope.barChartDatatest = []
                        $scope.rep = response[0];
                        angular.forEach(response[0].data,function (value,key) {
                            $scope.barChartLabelstest.push(value.region);
                            $scope.barChartDatatest.push(value.nbr_personne);
                        })
                        //$scope.barChartLabels = ['Januarys', 'February', 'March', 'April', 'May', 'June', 'July']
                        $scope.barChartLabels = $scope.barChartLabelstest
                        // this.barChartSeries = ['Series A', 'Series B']
                        $scope.barChartData = [
                            $scope.barChartDatatest
                            //[28, 48, 40, 19, 86, 27, 90]
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
                    })
            }


        }
    }

    $onInit(){
    }
}

export const MaladieGraphComponent = {
    templateUrl: './views/app/components/maladie-graph/maladie-graph.component.html',
    controller: MaladieGraphController,
    controllerAs: 'vm',
    bindings: {}
}
