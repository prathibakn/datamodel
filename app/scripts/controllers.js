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
                    4: ["Costs", "costs.html"],
                    5: ["Sales", "sales.html"]},
                finalization: {1: ["Overview", "overview.html"],
                    2: ["Attributes","attributes.html"],
                    3: ["Specifications", "specs.html"],
                    4: ["Costs", "costs.html"],
                    5: ["Sales", "sales.html"],
                    6: ["Expert Opinion", "opinion.html"]}
        }
    });

angular.module('lopApp')
.controller('ListCtrl', function ($scope, $location, Initiative) {
        $scope.initiatives=Initiative.query();
        $scope.create = function(){
            $location.path("/initiative/"+(Object.keys($scope.initiatives).length+1));
        };
        $scope.edit = function(id){
            $location.path("/initiative/"+id);  
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
        };
        $scope.setPhase = function(phase){
            $scope.currentPhase=phase;
        };
        $scope.obj = (Initiative.get($routeParams.id) === undefined) ? undefined : JSON.parse(Initiative.get($routeParams.id));
        if($scope.obj === undefined){
            $scope.currentPhase="forecast";
        }
        else{
            $scope.currentPhase = $scope.obj.phase;
        }
        $scope.setViews($scope.currentPhase);
        $scope.setTemplate(lopSettings.map[$scope.currentPhase][0]);

    });
angular.module('lopApp')
.controller('OverviewCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.view=true;
        $scope.edit=false;
        $scope.obj = (Initiative.get($routeParams.id) === undefined) ? undefined : JSON.parse(Initiative.get($routeParams.id));
        $scope.overview = ($scope.obj === undefined) ? {} : $scope.obj.overview;
        $scope.setPhase("forecast");
        $scope.create = function(){
            $scope.initiation = {};
            $scope.initiation.overview = $scope.overview;
            console.log($scope.overview);
            $scope.initiation.phase= "forecast";
            Initiative.set(id,$scope.initiation);
            $scope.setTemplate("attributes.html");
        };
    });
angular.module('lopApp')
.controller('AttributesCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.obj = (Initiative.get($routeParams.id) === undefined) ? undefined : JSON.parse(Initiative.get($routeParams.id));
        $scope.attributes = ($scope.obj === undefined) ? {} : $scope.obj.attributes;
        $scope.setPhase("forecast");
        $scope.create = function(){
            var json_object = JSON.parse(Initiative.get(id));
            json_object["attributes"] = $scope.attributes;
            console.log($scope.attributes);
            Initiative.set(id,json_object);
            $scope.setTemplate("specs.html");
            $scope.setViews("concept");
            
        };
    });
angular.module('lopApp')
.controller('SpecsCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.obj = (Initiative.get($routeParams.id) === undefined) ? undefined : JSON.parse(Initiative.get($routeParams.id));
        $scope.specs = ($scope.obj === undefined) ? {} : $scope.obj.specs;
        $scope.setPhase("concept");
        $scope.create = function(){
            var json_object = JSON.parse(Initiative.get(id));
            json_object["specs"] = $scope.specs;
            console.log($scope.specs);
            json_object["phase"] = "concept";
            Initiative.set(id,json_object);
            $scope.setTemplate("costs.html");
            $scope.setViews("marketstudy");
            
        };
    });
angular.module('lopApp')
.controller('CostsCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.obj = (Initiative.get($routeParams.id) === undefined) ? undefined : JSON.parse(Initiative.get($routeParams.id));
        $scope.costs = ($scope.obj === undefined) ? {} : $scope.obj.costs;
        $scope.setPhase("marketstudy");
                    
        $scope.create = function(){
            var json_object = JSON.parse(Initiative.get(id));
            json_object["costs"] = $scope.costs;
            console.log($scope.costs);
            json_object["phase"] = "marketstudy";
            Initiative.set(id,json_object);
            $scope.setTemplate("sales.html");
            $scope.setViews("marketstudy");
        };
    });
angular.module('lopApp')
.controller('SalesCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.obj = (Initiative.get($routeParams.id) === undefined) ? undefined : JSON.parse(Initiative.get($routeParams.id));
        $scope.sales = ($scope.obj === undefined) ? {} : $scope.obj.sales;
        $scope.setPhase("marketstudy");
        $scope.create = function(){
            var json_object = JSON.parse(Initiative.get(id));
            json_object["sales"] = $scope.sales;
            console.log($scope.sales);
            json_object["phase"] = "marketstudy";
            Initiative.set(id,json_object);
            $scope.setTemplate("opinion.html");
            $scope.setViews("finalization");
        };
    });
angular.module('lopApp')
.controller('OpinionCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.obj = (Initiative.get($routeParams.id) === undefined) ? undefined : JSON.parse(Initiative.get($routeParams.id));
        $scope.opinion = ($scope.obj === undefined) ? {} : $scope.obj.opinion;
        $scope.setPhase("finalization");
        $scope.create = function(){
            var json_object = JSON.parse(Initiative.get(id));
            json_object["opinion"] = $scope.opinion;
            console.log($scope.opinion);
            json_object["phase"] = "finalization";
            Initiative.set(id,json_object);
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
