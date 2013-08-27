'use strict';
var app = angular.module('lopApp', []);

app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                        templateUrl: 'views/list.html',
                        controller: 'ListCtrl'
                        })
            .when('/initiative/:id', {
                        controller: 'EditCtrl',
                        templateUrl: 'views/edit.html'
                        })
            .otherwise({redirectTo:'/'});
    });
