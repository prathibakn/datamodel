'use strict';

angular.module('lopApp')
.constant('lopSettings', {
    mapping: {forecast: ["overview", "attributes"], concept: ["specs"], marketstudy: ["costs", "sales"], finalization: ["opinion"]} 
});
angular.module('lopApp')
.controller('ListCtrl', function ($scope) {
    });
angular.module('lopApp')
.controller('EditCtrl', function ($scope, $routeParams, lopSettings, Initiative) {
        $scope.template="";
        $scope.currentPhase="";
        console.log(lopSettings.mapping);
        $scope.setTemplate = function(temp){
            $scope.template = "views/" + temp;
        }

        var obj = Initiative.get($routeParams.id);
        if(obj === undefined){
            $scope.currentPhase="forecast";
            $scope.setTemplate("overview.html");
        }
        else{
            $scope.currentPhase = JSON.parse(obj).phase;
            console.log(lopSettings.mapping);
            console.log($scope.currentPhase);
            $scope.setTemplate(lopSettings.mapping[$scope.currentPhase][0]);
        }
    });
angular.module('lopApp')
.controller('OverviewCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.overview = {};
        $scope.initiation = {};
        $scope.create = function(){
            $scope.initiation.overview = $scope.overview;
            $scope.inititation.phase = "forecast";
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
