class GroupeGraphController{
    constructor($stateParams, $state, API,$localStorage,$http,$scope,$filter){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
        this.API = API
        this.$localStorage = $localStorage
        $scope.camer={}
        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        /*on recupere le json cameroun*/
        console.log('je suis la')
        $http.get('camer.json').then(function (data) {
            $scope.camer = data.data;
            $scope.cameroun = data.data;
            console.log(data.data)
        },function (error) {
            console.log(error)
        })

        $scope.choix_region = function(region){
            $scope.dep = $filter('filter')($scope.cameroun,{name:region})[0].departements;
            console.log($scope.dep);
        }

        $scope.choix_departement = function(){
            $scope.listarrondissements=JSON.parse($scope.departement).arrondissements;

        }

        $scope.save = function (isValid) {
            /*fonction permettant de tracer le graphe des allergies*/
            if(isValid){
                let GroupeData = API.service('graph_groupe')
                /*ici on recupere le vrai departement si ca existe*/
                console.log($scope.departement)
                if($scope.departement !== undefined){
                    $scope.valeur_dep = JSON.parse($scope.departement).name
                }else{
                    $scope.valeur_dep = null
                }

                GroupeData.post({
                    'region': $scope.region,
                    'departement': $scope.valeur_dep,
                    'arrondissement': $scope.arrondissement
                }).then((response) => {
                        //console.log(userResponse);
                        $scope.barChartLabelstest = []
                        $scope.barChartDatatest = []
                        $scope.rep = response[0];
                        console.log(response)
                        angular.forEach(response.data,function (value,key) {
                            $scope.barChartLabelstest.push(value.groupe_sanguin);
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

export const GroupeGraphComponent = {
    templateUrl: './views/app/components/groupe-graph/groupe-graph.component.html',
    controller: GroupeGraphController,
    controllerAs: 'vm',
    bindings: {}
}
