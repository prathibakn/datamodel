'use strict';
angular.module('lopApp')
.controller('ListCtrl', function ($scope) {
    });
angular.module('lopApp')
.controller('EditCtrl', function ($scope) {
        $scope.template="";
    });
angular.module('lopApp')
.controller('OverviewCtrl', function ($scope, $routeParams, Initiative) {
        var id = $routeParams.id;
        $scope.overview = {};
        $scope.initiation = {};
        $scope.create = function(){
            $scope.initiation.overview = $scope.overview;
            Initiative.set(id,JSON.stringify($scope.initiation));
            $scope.$parent.template="views/attributes.html";
            console.log($scope.$parent.template);
        };
    });
/*
.controller('AttributesCtrl', function ($scope, $routeParams, $location, $timeout) {
    })
.controller('SpecsCtrl', function ($scope, $routeParams, $location, $timeout) {
    })
.controller('CostsCtrl', function ($scope, $routeParams, $location, $timeout) {
    })
.controller('SalesCtrl', function ($scope, $routeParams, $location, $timeout) {
    })
.controller('ExpertOpinionCtrl', function ($scope, $routeParams, $location, $timeout) {
    })
*/



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




            var json_object = JSON.parse(Initiative.get(5));
            console.log(JSON.parse(Initiative.get(5)));
            json_object.concept = $scope.overview;
            Initiative.set(5,JSON.stringify(json_object));


            console.log(JSON.parse(Initiative.get(5)));
