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
                            //pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                        percentageDecimals: 1
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
                        console.log(newValue);
                        chart1.series[0].setData([newValue["2011_suv"],newValue["2012_suv"],newValue["2013_suv"]],true);
                        chart1.series[1].setData([newValue["2011_sedan"],newValue["2012_sedan"], newValue["2013_sedan"]], true);
                        chart1.series[2].setData([newValue["2011_hb"],newValue["2012_hb"], newValue["2013_hb"]], true);
                    }, true);
            }
        }
    });



