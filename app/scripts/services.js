'use strict';

var services = angular.module('lopApp.services');

services.factory('Project',
                 function(localStorage) {
                     query = function(){
                         return localStorage;
                     }
                     get = function(id){
                         return localStorage[id];
                     }
                     set = function(id,value){
                         localStorage[id]=value;
                     }
});

services.factory('AllProjectsLoader', ['Project', '$q',
    function(Recipe, $q) {
  return function() {
    var delay = $q.defer();
    Project.query(function(projects) {
      delay.resolve(projects);
    }, function() {
      delay.reject('Unable to fetch projcts');
    });
    return delay.promise;
  };
}]);

services.factory('ProjectLoader', ['Project', '$route', '$q',
    function(Project, $route, $q) {
  return function() {
    var delay = $q.defer();
    Project.get({id: $route.current.params.projectId}, function(project) {
      delay.resolve(project);
    }, function() {
      delay.reject('Unable to fetch project '  + $route.current.params.projectId);
    });
    return delay.promise;
  };
}]);
