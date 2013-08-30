'use strict';
angular.module('lopApp')
.factory('Initiative',
         function(localStorage) {
             return{
             query: function(){
                     var obj={};
                     for(var k in localStorage){
                         obj[k]=JSON.parse(localStorage[k]);
                     }
                     return obj;
                 },
                     get: function(id){
                     return localStorage[id];
                 },
                     set: function(id,value){
                     localStorage[id]=JSON.stringify(value);
                 },
                     remove: function(id){
                     localStorage.removeItem(id);
                 }
                 
             }
});
