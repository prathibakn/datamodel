'use strict';

angular.module('lopApp')
.constant('lopSettings', {
    map: {forecast: ["overview.html", "attributes.html"],
                concept: ["specs.html"],
                marketstudy: ["costs.html", "sales.html"],
                finalization: ["opinion.html"]
                } ,
            viewMap: {forecast: {1: ["Overview","overview.html"],2: ["Attributes","attributes.html"]},
                concept: {1: ["Overview", "overview.html"],
                    2: ["Attributes","attributes.html"],
                    3: ["Specifications", "specs.html"]},
                marketstudy: {1: ["Overview", "overview.html"],
                    2: ["Attributes","attributes.html"],
                    3: ["Specifications", "specs.html"],
                    4: ["Costs", "coss.html"],
                    5: ["Sales", "sales.html"]},
                finalization: {1: ["Overview", "overview.html"],
                    2: ["Attributes","attributes.html"],
                    3: ["Specifications", "specs.html"],
                    4: ["Costs", "coss.html"],
                    5: ["Sales", "sales.html"],
                    6: ["Expert Opinion", "opinion.html"]}
        }
    });

angular.module('lopApp')
.controller('ListCtrl', function ($scope, $location, Initiative) {
        $scope.initiatives=Initiative.query();
        $scope.create = function(){
            $location.path("/initiative/"+(Object.keys($scope.initiatives).length+1));
        }
    });
angular.module('lopApp')
.controller('EditCtrl', function ($scope, $routeParams, lopSettings, Initiative) {
        $scope.template="";
        $scope.currentPhase="";
        $scope.views="";
        $scope.setTemplate = function(temp){
            $scope.template = 'views/'+temp;
        };
        $scope.setViews = function(phase){
            $scope.views=lopSettings.viewMap[phase];    
        };
        $scope.selectView = function(view){
            $scope.setTemplate(view);
        }
        var obj = Initiative.get($routeParams.id);
        if(obj === undefined){
            $scope.currentPhase="forecast";
        }
        else{
            $scope.currentPhase = JSON.parse(obj).phase;
            console.log(lopSettings.map);
            console.log($scope.currentPhase);
        }
        $scope.setViews($scope.currentPhase);
        console.log($scope.views);
                                      
        $scope.setTemplate(lopSettings.map[$scope.currentPhase][0]);

    });
angular.module('lopApp')
.controller('OverviewCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.overview = {};
        $scope.create = function(){
            $scope.initiation = {};
            $scope.initiation.overview = $scope.overview;
            $scope.initiation.phase= "forecast";
            Initiative.set(id,$scope.initiation);
            $scope.setTemplate("attributes.html");
        };
    });
angular.module('lopApp')
.controller('AttributesCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.attributes = {};
        $scope.create = function(){
            var json_object = JSON.parse(Initiative.get(id));
            json_object["attributes"] = $scope.attributes;
            Initiative.set(id,json_object);
            $scope.setTemplate("specs.html");
            $scope.setViews("concept");
            
        };
    });
angular.module('lopApp')
.controller('SpecsCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.specs = {};
        $scope.create = function(){
            var json_object = JSON.parse(Initiative.get(id));
            json_object["attributes"] = $scope.attributes;
            json_object["phase"] = "phase2";
            Initiative.set(id,json_object);
            
            $scope.setTemplate("costs.html");

        };
    });
angular.module('lopApp')
.controller('CostsCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.costs = {};
        $scope.create = function(){
            $scope.setTemplate("sales.html");
        };
    });
angular.module('lopApp')
.controller('SalesCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.sales = {};
        $scope.create = function(){
            $scope.setTemplate("opinion.html");
        };
    });
angular.module('lopApp')
.controller('ExpertOpinionCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.opinion = {};
        $scope.create = function(){
            
        };
    });

                        //                        resolve: {
                        //                    initiatives: function(MultiInitiativeLoader) {
                        //                            return AllInitiativesLoader();
                        //                        }
                        //                    },


                        //                        resolve: {
                        //                    recipe: function(InitiativeLoader) {
                        //                            return InitiativeLoader();
                        //                        }
                        //                    },



/*
            var json_object = JSON.parse(Initiative.get(5));
            console.log(JSON.parse(Initiative.get(5)));
            json_object.concept = $scope.overview;
            Initiative.set(5,JSON.stringify(json_object));


            console.log(JSON.parse(Initiative.get(5)));
*/
