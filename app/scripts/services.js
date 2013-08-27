'use strict';
angular.module('lopApp')
.factory('Initiative',
         function(localStorage) {
             return{
             query: function(){
                     console.log(localStorage);
                     return localStorage;
                 },
                     get: function(id){
                     return localStorage[id];
                 },
                     set: function(id,value){
                     console.log("settt");
                     localStorage[id]=JSON.stringify(value);
                 }
             }
});
/*
angular.module('lopApp')
.factory('AllInitiativesLoader', ['Project', '$q',
    function(Initiaitve, $q) {
  return function() {
    var delay = $q.defer();
    Initiative.query(function(projects) {
      delay.resolve(initiatives);
    }, function() {
      delay.reject('Unable to fetch initiaitves');
    });
    return delay.promise;
  };
}]);

services.factory('InitiativeLoader', ['Initiative', '$route', '$q',
    function(Initiative, $route, $q) {
  return function() {
    var delay = $q.defer();
    Project.get({id: $route.current.params.initiativeId}, function(project) {
      delay.resolve(initiative);
    }, function() {
      delay.reject('Unable to fetch initiative '  + $route.current.params.initiativeId);
    });
    return delay.promise;
  };
  }]);


*/
