'use strict';

angular.module('lopApp')
.directive('integer', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return parseInt(viewValue);
            });
        }
    };
    });

angular.module('lopApp')
.directive("removeWithFadeInDirective", function() {
    return function(scope, element, attrs) {
        element.bind('click', function() {
                $(element).parent().parent().fadeOut(1000, function() {
                scope.$apply(function() {
                    var obj = scope.$eval(attrs.removeWithFadeInDirective.split(",")[0]),
                        array = scope.$eval(attrs.removeWithFadeInDirective.split(",")[1]);
                    array.splice(obj, 1);
                });
            });
        });
    };
});
angular.module('lopApp')
.directive('hcPie', function () {
        return {
            restrict: 'C',
                replace: true,
                scope: {
            items: '='
                    },
                controller: function ($scope, $element, $attrs) {
            },
                template: '<div id="container" style="margin: 0 auto"></div>',
                link: function (scope, element, attrs) {
                var chart1 = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false
                                },
                            title: {
                        text: 'Sales by Type'
                                },
                            tooltip: {
                                },
                            xAxis:{categories: ['2011', '2012', '2013']},
                            plotOptions: {
                        
                        },
                            credits:{
                        enabled: false
                                },
                            series: [{
                            name: 'SUV',
                                    data: [scope.items["2011_suv"],scope.items["2012_suv"],scope.items["2013_suv"]]
                                    },
                                {
                                name: 'Sedan',
                                        data: [scope.items["2011_sedan"],scope.items["2012_sedan"], scope.items["2013_sedan"]]
                                        },
                                {
                                name: 'Hatchback',
                                        data: [scope.items["2011_hb"],scope.items["2012_hb"], scope.items["2013_hb"]]
                                        }
                                ]
                            });
                scope.$watch("items", function (newValue) {
                        if(chart1.series !==undefined){
                        $.each(chart1.series.reverse(), function(i) {
                                if(chart1.series[i] !== undefined)
                                    chart1.series[i].remove();
                            });
                        }
                        chart1.addSeries({
                            name: 'SUV',
                                    data: [newValue["2011_suv"],newValue["2012_suv"],newValue["2013_suv"]]
                                    },
                                {
                                name: 'Sedan',
                                        data: [newValue["2011_sedan"],newValue["2012_sedan"], newValue["2013_sedan"]]
                                        },
                                {
                                name: 'Hatchback',
                                        data: [newValue["2011_hb"],newValue["2012_hb"], newValue["2013_hb"]]
                                        });
                        chart1.redraw();
                    }, true);
            }
        }
    });



