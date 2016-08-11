'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ExpensesCtrl
 * @description
 * # ExpensesCtrl
 * Controller of the clientApp
 */
// angular.module('clientApp')
//   .controller('ExpensesCtrl', function ($scope, Expense) {
//     $scope.expenses = Expense.getList().$object;
    
//     // filter according to area
//     $scope.AnhuiExpenses = function(){
//       return $scope.expenses.filter(function (expense) {
//         return (expense.area === "Anhui");  
//       });
//     };


angular.module('clientApp')
  .controller('ExpensesCtrl', function ($scope, Expense, $timeout) {
  	// $scope.expenses = Expense.getList().$object;
  	// console.log($scope.expenses);

  	// lodash: use _.groupBy to split all the objects by area into different arrays, 
  	//         use _.forEach to invokes iteratee for each element in the collection,
  	//         use _.meanBy to caculate the avg in different arrays according to properties.
    Expense.getList().then(function(data){
      // $scope.expensesActive = true;	
      $scope.expenses = data;
      $scope.total = {};
      var a = _.groupBy(data,'area');
      var b = Object.keys(a);
      var i = 0;
      _.forEach(a, function(n){
      	n.foodAvg = parseInt(_.meanBy(n,'food'));
      	n.housingAvg = parseInt(_.meanBy(n,'housing'));
      	n.gasAvg = parseInt(_.meanBy(n,'transportation.gas'));
      	n.public_transportationAvg = parseInt(_.meanBy(n,'transportation.public_transportation'));
      	n.essentialAvg = parseInt(_.meanBy(n,'shopping.essential'));
      	n.clothesAvg = parseInt(_.meanBy(n,'shopping.clothes'));
      	n.other_thingsAvg = parseInt(_.meanBy(n,'shopping.other_things'));
      	n.entertainmentAvg = parseInt(_.meanBy(n,'entertainment'));
      	n.medicalAvg = parseInt(_.meanBy(n,'medical_care'));
      	n.othersAvg = parseInt(_.meanBy(n,'others'));
      	n.totalAvg = parseInt(_.meanBy(n,'total'));
      	n.percentageAvg = parseInt(_.meanBy(n,'basic_expenses_percentage'));
      	$scope.total[b[i]] = n.totalAvg;
        i++;
      });
      $scope.groupExpenses = a;
      console.log($scope.total);
      $scope.totalAry = function () {
        var ary = [];
        _.forEach($scope.total, function (val, key) {
          ary.push({key: key, val: val});
        });
        return ary;
      };
      $scope.sorted_totalAry = _.orderBy($scope.totalAry(), ['val'], ['desc']);



      var east_foodAvg = parseInt((a.Jiangsu.foodAvg + a.Zhejiang.foodAvg + a.Anhui.foodAvg + a.Fujian.foodAvg + a.Jiangxi.foodAvg + a.Shandong.foodAvg + a.Shanghai.foodAvg) / 7);
      var south_foodAvg = parseInt((a.Guangdong.foodAvg + a.Guangxi.foodAvg + a.Hainan.foodAvg) / 3);
      var north_foodAvg = parseInt((a.Hebei.foodAvg + a.Shaanxi.foodAvg + a.Beijing.foodAvg + a.Tianjing.foodAvg + a["Inner Mongol"].foodAvg) / 5);
      var central_foodAvg = parseInt((a.Hubei.foodAvg + a.Hunan.foodAvg + a.Henan.foodAvg) / 3);
      var north_east_foodAvg = parseInt((a.Liaoning.foodAvg + a.Jilin.foodAvg + a.Heilongjiang.foodAvg) / 3);
      var south_west_foodAvg = parseInt((a.Sichuan.foodAvg + a.Yunnan.foodAvg + a.Guizhou.foodAvg + a.Chongqing.foodAvg + a.Xizang.foodAvg) / 5);
      var north_west_foodAvg = parseInt((a.Ningxia.foodAvg + a.Xinjiang.foodAvg + a.Qinghai.foodAvg + a.Shanxi.foodAvg + a.Gansu.foodAvg) / 5);
      
      var east_housingAvg = parseInt((a.Jiangsu.housingAvg + a.Zhejiang.housingAvg + a.Anhui.housingAvg + a.Fujian.housingAvg + a.Jiangxi.housingAvg + a.Shandong.housingAvg + a.Shanghai.housingAvg) / 7);
      var south_housingAvg = parseInt((a.Guangdong.housingAvg + a.Guangxi.housingAvg + a.Hainan.housingAvg) / 3);
      var north_housingAvg = parseInt((a.Hebei.housingAvg + a.Shaanxi.housingAvg + a.Beijing.housingAvg + a.Tianjing.housingAvg + a["Inner Mongol"].housingAvg) / 5);
      var central_housingAvg = parseInt((a.Hubei.housingAvg + a.Hunan.housingAvg + a.Henan.housingAvg) / 3);
      var north_east_housingAvg = parseInt((a.Liaoning.housingAvg + a.Jilin.housingAvg + a.Heilongjiang.housingAvg) / 3);
      var south_west_housingAvg = parseInt((a.Sichuan.housingAvg + a.Yunnan.housingAvg + a.Guizhou.housingAvg + a.Chongqing.housingAvg + a.Xizang.housingAvg) / 5);
      var north_west_housingAvg = parseInt((a.Ningxia.housingAvg + a.Xinjiang.housingAvg + a.Qinghai.housingAvg + a.Shanxi.housingAvg + a.Gansu.housingAvg) / 5);

      var east_gasAvg = parseInt((a.Jiangsu.gasAvg + a.Zhejiang.gasAvg + a.Anhui.gasAvg + a.Fujian.gasAvg + a.Jiangxi.gasAvg + a.Shandong.gasAvg + a.Shanghai.gasAvg) / 7);
      var south_gasAvg = parseInt((a.Guangdong.gasAvg + a.Guangxi.gasAvg + a.Hainan.gasAvg) / 3);
      var north_gasAvg = parseInt((a.Hebei.gasAvg + a.Shaanxi.gasAvg + a.Beijing.gasAvg + a.Tianjing.gasAvg + a["Inner Mongol"].gasAvg) / 5);
      var central_gasAvg = parseInt((a.Hubei.gasAvg + a.Hunan.gasAvg + a.Henan.gasAvg) / 3);
      var north_east_gasAvg = parseInt((a.Liaoning.gasAvg + a.Jilin.gasAvg + a.Heilongjiang.gasAvg) / 3);
      var south_west_gasAvg = parseInt((a.Sichuan.gasAvg + a.Yunnan.gasAvg + a.Guizhou.gasAvg + a.Chongqing.gasAvg + a.Xizang.gasAvg) / 5);
      var north_west_gasAvg = parseInt((a.Ningxia.gasAvg + a.Xinjiang.gasAvg + a.Qinghai.gasAvg + a.Shanxi.gasAvg + a.Gansu.gasAvg) / 5);

      var east_public_transportationAvg = parseInt((a.Jiangsu.public_transportationAvg + a.Zhejiang.public_transportationAvg + a.Anhui.public_transportationAvg + a.Fujian.public_transportationAvg + a.Jiangxi.public_transportationAvg + a.Shandong.public_transportationAvg + a.Shanghai.public_transportationAvg) / 7);
      var south_public_transportationAvg = parseInt((a.Guangdong.public_transportationAvg + a.Guangxi.public_transportationAvg + a.Hainan.public_transportationAvg) / 3);
      var north_public_transportationAvg = parseInt((a.Hebei.public_transportationAvg + a.Shaanxi.public_transportationAvg + a.Beijing.public_transportationAvg + a.Tianjing.public_transportationAvg + a["Inner Mongol"].public_transportationAvg) / 5);
      var central_public_transportationAvg = parseInt((a.Hubei.public_transportationAvg + a.Hunan.public_transportationAvg + a.Henan.public_transportationAvg) / 3);
      var north_east_public_transportationAvg = parseInt((a.Liaoning.public_transportationAvg + a.Jilin.public_transportationAvg + a.Heilongjiang.public_transportationAvg) / 3);
      var south_west_public_transportationAvg = parseInt((a.Sichuan.public_transportationAvg + a.Yunnan.public_transportationAvg + a.Guizhou.public_transportationAvg + a.Chongqing.public_transportationAvg + a.Xizang.public_transportationAvg) / 5);
      var north_west_public_transportationAvg = parseInt((a.Ningxia.public_transportationAvg + a.Xinjiang.public_transportationAvg + a.Qinghai.public_transportationAvg + a.Shanxi.public_transportationAvg + a.Gansu.public_transportationAvg) / 5);

      var east_essentialAvg = parseInt((a.Jiangsu.essentialAvg + a.Zhejiang.essentialAvg + a.Anhui.essentialAvg + a.Fujian.essentialAvg + a.Jiangxi.essentialAvg + a.Shandong.essentialAvg + a.Shanghai.essentialAvg) / 7);
      var south_essentialAvg = parseInt((a.Guangdong.essentialAvg + a.Guangxi.essentialAvg + a.Hainan.essentialAvg) / 3);
      var north_essentialAvg = parseInt((a.Hebei.essentialAvg + a.Shaanxi.essentialAvg + a.Beijing.essentialAvg + a.Tianjing.essentialAvg + a["Inner Mongol"].essentialAvg) / 5);
      var central_essentialAvg = parseInt((a.Hubei.essentialAvg + a.Hunan.essentialAvg + a.Henan.essentialAvg) / 3);
      var north_east_essentialAvg = parseInt((a.Liaoning.essentialAvg + a.Jilin.essentialAvg + a.Heilongjiang.essentialAvg) / 3);
      var south_west_essentialAvg = parseInt((a.Sichuan.essentialAvg + a.Yunnan.essentialAvg + a.Guizhou.essentialAvg + a.Chongqing.essentialAvg + a.Xizang.essentialAvg) / 5);
      var north_west_essentialAvg = parseInt((a.Ningxia.essentialAvg + a.Xinjiang.essentialAvg + a.Qinghai.essentialAvg + a.Shanxi.essentialAvg + a.Gansu.essentialAvg) / 5);

      var east_clothesAvg = parseInt((a.Jiangsu.clothesAvg + a.Zhejiang.clothesAvg + a.Anhui.clothesAvg + a.Fujian.clothesAvg + a.Jiangxi.clothesAvg + a.Shandong.clothesAvg + a.Shanghai.clothesAvg) / 7);
      var south_clothesAvg = parseInt((a.Guangdong.clothesAvg + a.Guangxi.clothesAvg + a.Hainan.clothesAvg) / 3);
      var north_clothesAvg = parseInt((a.Hebei.clothesAvg + a.Shaanxi.clothesAvg + a.Beijing.clothesAvg + a.Tianjing.clothesAvg + a["Inner Mongol"].clothesAvg) / 5);
      var central_clothesAvg = parseInt((a.Hubei.clothesAvg + a.Hunan.clothesAvg + a.Henan.clothesAvg) / 3);
      var north_east_clothesAvg = parseInt((a.Liaoning.clothesAvg + a.Jilin.clothesAvg + a.Heilongjiang.clothesAvg) / 3);
      var south_west_clothesAvg = parseInt((a.Sichuan.clothesAvg + a.Yunnan.clothesAvg + a.Guizhou.clothesAvg + a.Chongqing.clothesAvg + a.Xizang.clothesAvg) / 5);
      var north_west_clothesAvg = parseInt((a.Ningxia.clothesAvg + a.Xinjiang.clothesAvg + a.Qinghai.clothesAvg + a.Shanxi.clothesAvg + a.Gansu.clothesAvg) / 5);                        

      var east_other_thingsAvg = parseInt((a.Jiangsu.other_thingsAvg + a.Zhejiang.other_thingsAvg + a.Anhui.other_thingsAvg + a.Fujian.other_thingsAvg + a.Jiangxi.other_thingsAvg + a.Shandong.other_thingsAvg + a.Shanghai.other_thingsAvg) / 7); 
      var south_other_thingsAvg = parseInt((a.Guangdong.other_thingsAvg + a.Guangxi.other_thingsAvg + a.Hainan.other_thingsAvg) / 3);
      var north_other_thingsAvg = parseInt((a.Hebei.other_thingsAvg + a.Shaanxi.other_thingsAvg + a.Beijing.other_thingsAvg + a.Tianjing.other_thingsAvg + a["Inner Mongol"].other_thingsAvg) / 5);
      var central_other_thingsAvg = parseInt((a.Hubei.other_thingsAvg + a.Hunan.other_thingsAvg + a.Henan.other_thingsAvg) / 3);
      var north_east_other_thingsAvg = parseInt((a.Liaoning.other_thingsAvg + a.Jilin.other_thingsAvg + a.Heilongjiang.other_thingsAvg) / 3);
      var south_west_other_thingsAvg = parseInt((a.Sichuan.other_thingsAvg + a.Yunnan.other_thingsAvg + a.Guizhou.other_thingsAvg + a.Chongqing.other_thingsAvg + a.Xizang.other_thingsAvg) / 5);     
      var north_west_other_thingsAvg = parseInt((a.Ningxia.other_thingsAvg + a.Xinjiang.other_thingsAvg + a.Qinghai.other_thingsAvg + a.Shanxi.other_thingsAvg + a.Gansu.other_thingsAvg) / 5);  

      var east_entertainmentAvg = parseInt((a.Jiangsu.entertainmentAvg + a.Zhejiang.entertainmentAvg + a.Anhui.entertainmentAvg + a.Fujian.entertainmentAvg + a.Jiangxi.entertainmentAvg + a.Shandong.entertainmentAvg + a.Shanghai.entertainmentAvg) / 7);
      var south_entertainmentAvg = parseInt((a.Guangdong.entertainmentAvg + a.Guangxi.entertainmentAvg + a.Hainan.entertainmentAvg) / 3);
      var north_entertainmentAvg = parseInt((a.Hebei.entertainmentAvg + a.Shaanxi.entertainmentAvg + a.Beijing.entertainmentAvg + a.Tianjing.entertainmentAvg + a["Inner Mongol"].entertainmentAvg) / 5);
      var central_entertainmentAvg = parseInt((a.Hubei.entertainmentAvg + a.Hunan.entertainmentAvg + a.Henan.entertainmentAvg) / 3);
      var north_east_entertainmentAvg = parseInt((a.Liaoning.entertainmentAvg + a.Jilin.entertainmentAvg + a.Heilongjiang.entertainmentAvg) / 3);
      var south_west_entertainmentAvg = parseInt((a.Sichuan.entertainmentAvg + a.Yunnan.entertainmentAvg + a.Guizhou.entertainmentAvg + a.Chongqing.entertainmentAvg + a.Xizang.entertainmentAvg) / 5);
      var north_west_entertainmentAvg = parseInt((a.Ningxia.entertainmentAvg + a.Xinjiang.entertainmentAvg + a.Qinghai.entertainmentAvg + a.Shanxi.entertainmentAvg + a.Gansu.entertainmentAvg) / 5);  

      var east_medicalAvg = parseInt((a.Jiangsu.medicalAvg + a.Zhejiang.medicalAvg + a.Anhui.medicalAvg + a.Fujian.medicalAvg + a.Jiangxi.medicalAvg + a.Shandong.medicalAvg + a.Shanghai.medicalAvg) / 7);
      var south_medicalAvg = parseInt((a.Guangdong.medicalAvg + a.Guangxi.medicalAvg + a.Hainan.medicalAvg) / 3);
      var north_medicalAvg = parseInt((a.Hebei.medicalAvg + a.Shaanxi.medicalAvg + a.Beijing.medicalAvg + a.Tianjing.medicalAvg + a["Inner Mongol"].medicalAvg) / 5);
      var central_medicalAvg = parseInt((a.Hubei.medicalAvg + a.Hunan.medicalAvg + a.Henan.medicalAvg) / 3);
      var north_east_medicalAvg = parseInt((a.Liaoning.medicalAvg + a.Jilin.medicalAvg + a.Heilongjiang.medicalAvg) / 3);
      var south_west_medicalAvg = parseInt((a.Sichuan.medicalAvg + a.Yunnan.medicalAvg + a.Guizhou.medicalAvg + a.Chongqing.medicalAvg + a.Xizang.medicalAvg) / 5);
      var north_west_medicalAvg = parseInt((a.Ningxia.medicalAvg + a.Xinjiang.medicalAvg + a.Qinghai.medicalAvg + a.Shanxi.medicalAvg + a.Gansu.medicalAvg) / 5);                            
        
      var east_othersAvg = parseInt((a.Jiangsu.othersAvg + a.Zhejiang.othersAvg + a.Anhui.othersAvg + a.Fujian.othersAvg + a.Jiangxi.othersAvg + a.Shandong.othersAvg + a.Shanghai.othersAvg) / 7);
      var south_othersAvg = parseInt((a.Guangdong.othersAvg + a.Guangxi.othersAvg + a.Hainan.othersAvg) / 3);
      var north_othersAvg = parseInt((a.Hebei.othersAvg + a.Shaanxi.othersAvg + a.Beijing.othersAvg + a.Tianjing.othersAvg + a["Inner Mongol"].othersAvg) / 5);
      var central_othersAvg = parseInt((a.Hubei.othersAvg + a.Hunan.othersAvg + a.Henan.othersAvg) / 3);
      var north_east_othersAvg = parseInt((a.Liaoning.othersAvg + a.Jilin.othersAvg + a.Heilongjiang.othersAvg) / 3);
      var south_west_othersAvg = parseInt((a.Sichuan.othersAvg + a.Yunnan.othersAvg + a.Guizhou.othersAvg + a.Chongqing.othersAvg + a.Xizang.othersAvg) / 5);
      var north_west_othersAvg = parseInt((a.Ningxia.othersAvg + a.Xinjiang.othersAvg + a.Qinghai.othersAvg + a.Shanxi.othersAvg + a.Gansu.othersAvg) / 5);

      var east_percentageAvg = parseInt((a.Jiangsu.percentageAvg + a.Zhejiang.percentageAvg + a.Anhui.percentageAvg + a.Fujian.percentageAvg + a.Jiangxi.percentageAvg + a.Shandong.percentageAvg + a.Shanghai.percentageAvg) / 7);
      var south_percentageAvg = parseInt((a.Guangdong.percentageAvg + a.Guangxi.percentageAvg + a.Hainan.percentageAvg) / 3);
      var north_percentageAvg = parseInt((a.Hebei.percentageAvg + a.Shaanxi.percentageAvg + a.Beijing.percentageAvg + a.Tianjing.percentageAvg + a["Inner Mongol"].percentageAvg) / 5);
      var central_percentageAvg = parseInt((a.Hubei.percentageAvg + a.Hunan.percentageAvg + a.Henan.percentageAvg) / 3);
      var north_east_percentageAvg = parseInt((a.Liaoning.percentageAvg + a.Jilin.percentageAvg + a.Heilongjiang.percentageAvg) / 3);
      var south_west_percentageAvg = parseInt((a.Sichuan.percentageAvg + a.Yunnan.percentageAvg + a.Guizhou.percentageAvg + a.Chongqing.percentageAvg + a.Xizang.percentageAvg) / 5);
      var north_west_percentageAvg = parseInt((a.Ningxia.percentageAvg + a.Xinjiang.percentageAvg + a.Qinghai.percentageAvg + a.Shanxi.percentageAvg + a.Gansu.percentageAvg) / 5);



        // map chart
		$(function () {
		    // Prepare demo data
		    var data = [
		        {
		            "hc-key": "cn-3664",
		            "value": 0
		        },
		        {
		            "hc-key": "cn-gd",
		            "value": a.Guangdong.totalAvg
		        },
		        {
		            "hc-key": "cn-sh",
		            "value": a.Shanghai.totalAvg
		        },
		        {
		            "hc-key": "cn-zj",
		            "value": a.Zhejiang.totalAvg
		        },
		        {
		            "hc-key": "cn-ha",
		            "value": a.Hainan.totalAvg
		        },
		        {
		            "hc-key": "cn-xz",
		            "value": a.Xizang.totalAvg
		        },
		        {
		            "hc-key": "cn-yn",
		            "value": a.Yunnan.totalAvg
		        },
		        {
		            "hc-key": "cn-ah",
		            "value": a.Anhui.totalAvg
		        },
		        {
		            "hc-key": "cn-hu",
		            "value": a.Hubei.totalAvg
		        },
		        {
		            "hc-key": "cn-sa",
		            "value": a.Shaanxi.totalAvg
		        },
		        {
		            "hc-key": "cn-cq",
		            "value": a.Chongqing.totalAvg
		        },
		        {
		            "hc-key": "cn-gz",
		            "value": a.Guizhou.totalAvg
		        },
		        {
		            "hc-key": "cn-hn",
		            "value": a.Hunan.totalAvg
		        },
		        {
		            "hc-key": "cn-sc",
		            "value": a.Sichuan.totalAvg
		        },
		        {
		            "hc-key": "cn-sx",
		            "value": a.Shanxi.totalAvg
		        },
		        {
		            "hc-key": "cn-he",
		            "value": a.Henan.totalAvg
		        },
		        {
		            "hc-key": "cn-jx",
		            "value": a.Jiangxi.totalAvg
		        },
		        {
		            "hc-key": "cn-nm",
		            "value": a["Inner Mongol"].totalAvg
		        },
		        {
		            "hc-key": "cn-gx",
		            "value": a.Guangxi.totalAvg
		        },
		        {
		            "hc-key": "cn-hl",
		            "value": a.Heilongjiang.totalAvg
		        },
		        {
		            "hc-key": "cn-fj",
		            "value": a.Fujian.totalAvg
		        },
		        {
		            "hc-key": "cn-bj",
		            "value": a.Beijing.totalAvg
		        },
		        {
		            "hc-key": "cn-hb",
		            "value": a.Hebei.totalAvg
		        },
		        {
		            "hc-key": "cn-ln",
		            "value": a.Liaoning.totalAvg
		        },
		        {
		            "hc-key": "cn-sd",
		            "value": a.Shandong.totalAvg
		        },
		        {
		            "hc-key": "cn-tj",
		            "value": a.Tianjing.totalAvg
		        },
		        {
		            "hc-key": "cn-js",
		            "value": a.Jiangsu.totalAvg
		        },
		        {
		            "hc-key": "cn-qh",
		            "value": a.Qinghai.totalAvg
		        },
		        {
		            "hc-key": "cn-gs",
		            "value": a.Gansu.totalAvg
		        },
		        {
		            "hc-key": "cn-xj",
		            "value": a.Xinjiang.totalAvg
		        },
		        {
		            "hc-key": "cn-jl",
		            "value": a.Jilin.totalAvg
		        },
		        {
		            "hc-key": "cn-nx",
		            "value": a.Ningxia.totalAvg
		        }
		    ];

		    // Initiate the chart
		    $('#mapchart').highcharts('Map', {
		    	chart : {
                    backgroundColor : 'transparent',
		            style: {
                        fontFamily: 'Arial',
                        fontWeight: 'bold'
                    }                                       
		    	},
			    colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#ff6600",
			      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
		        title : {
		            text : 'Average total expenses in different provinces',
					style: {
					   fontSize: '16px'
					}		            
		        },

		        subtitle : {
		            text : 'Source map: <a href="https://code.highcharts.com/mapdata/countries/cn/cn-all.js">China</a>',
		            style : {
		               fontWeight: 'bold'	
		            }
		        },

				tooltip: {
				  borderWidth: 0
				},	

			    legend: {
			       itemStyle: {
			          fontWeight: 'bold',
			          fontSize: '12px'
			       }
			    },					        

		        mapNavigation: {
		            enabled: true,
		            buttonOptions: {
		                verticalAlign: 'bottom'
		            }
		        },

			   plotOptions: {
			      series: {
			         shadow: true
			      },
			      candlestick: {
			         lineColor: '#404048'
			      },
			      map: {
			         shadow: true
			      }
			   },		        

                colorAxis: {
                    dataClasses: [{
                        to: 1000
                    }, {
                        from: 1000,
                        to: 2000
                    }, {
                        from: 2000,
                        to: 3500
                    }, {
                        from: 3500,
                        to: 5000
                    }, {
                        from: 5000
                    }]
                },

                credits: {
		            enabled: false
		        },

		        series : [{
		            data : data,
		            mapData: Highcharts.maps['countries/cn/cn-all'],
		            joinBy: 'hc-key',
		            animation: true,
		            name: 'Average total expenses',
		            states: {
		                hover: {
		                    color: '#BADA55'
		                }
		            },
		            dataLabels: {
		                enabled: true,
		                format: '{point.name}',
		                shadow: true
		            },
                    tooltip: {
                        valueSuffix: ' ¥'
                    }		            		            
		        }]
		    });
        });
        // map chart ends

        

        // column chart
		$(function () {
		    $('#columnchart').highcharts({
		        chart: {
		            type: 'column',
		            backgroundColor : 'transparent',
		            style: {
                        fontFamily: 'Arial',
                        fontWeight: 'bold'
                    }      
		        },
			    colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#ff6600",
			      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],

		        title: {
		            text: 'Basic expenses in different areas'
		        },
		        xAxis: {
		            categories: [
		                'East China',
		                'South China',
		                'North China',
		                'Central China',
		                'North-East China',
		                'South-West China',
		                'North-West China'
		            ],
		            crosshair: true

		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ' Expenses (¥)'
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.1f} ¥</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true,
		            borderWidth: 0
		        },
			    legend: {
			       itemStyle: {
			          fontWeight: 'bold',
			          fontSize: '12px'
			       }
			    },	
		        plotOptions: {
		            column: {
		                pointPadding: 0.1,
		                borderWidth: 0.1,
		                borderColor: '#FFFFFF',
		                allowPointSelect: true,
		            },
			        series: {
			           shadow: true
			        },
			        candlestick: {
			           lineColor: '#404048'
			        }	            
		        },
                credits: {
		            enabled: false
		        },		        
		        series: [{
		            name: 'Food',
		            data: [east_foodAvg, south_foodAvg, north_foodAvg, central_foodAvg, north_east_foodAvg, south_west_foodAvg, north_west_foodAvg]

		        }, {
		            name: 'Housing',
		            data: [east_housingAvg, south_housingAvg, north_housingAvg, central_housingAvg, north_east_housingAvg, south_west_housingAvg, north_west_housingAvg]

		        }, {
		            name: 'Public Transportation',
		            data: [east_public_transportationAvg, south_public_transportationAvg, north_public_transportationAvg, central_public_transportationAvg, north_east_public_transportationAvg, south_west_public_transportationAvg, north_west_public_transportationAvg]

		        }, {
		            name: 'Essential',
		            data: [east_essentialAvg, south_essentialAvg, north_essentialAvg, central_essentialAvg, north_east_essentialAvg, south_west_essentialAvg, north_west_essentialAvg]

		        }]
		    });
		});
        // column chart ends 
        
        
        // line chart
		$(function () {

		    $('#linechart').highcharts({

		        chart: {
		            polar: true,
		            type: 'line',
		            backgroundColor : 'transparent',
		            style: {
                        fontFamily: 'Arial',
                        fontWeight: 'bold'
                    }     		            
		        },

			    colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#ff6600",
			      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],		        

		        title: {
		            text: 'Single item expenditure comparison',
		            x: -80
		        },

		        pane: {
		            size: '80%'
		        },

		        xAxis: {
		            categories: ['Food', 
		                         'Housing', 
		                         'Gas', 
		                         'Public transportation',
		                         'Essential', 
		                         'Clothes',
		                         'Other things(shopping)',
		                         'Entertainment',
		                         'Health care',
		                         'Others'
		            ],
		            tickmarkPlacement: 'on',
		            lineWidth: 0
		        },

		        yAxis: {
		            gridLineInterpolation: 'polygon',
		            lineWidth: 0,
		            min: 0,
		            title: {
		            	text: 'Expenses (¥)'
		            }
		        },

		        tooltip: {
		            shared: true,
		            pointFormat: '<span style="color:{series.color}">{series.name}: <b>¥{point.y:,.0f}</b><br/>',
		            borderWidth: 0
		        },

		        legend: {
		            align: 'right',
		            verticalAlign: 'top',
		            y: 70,
		            layout: 'vertical',
				    itemStyle: {
				       fontWeight: 'bold',
				       fontSize: '12px'
				    }		            
		        },
				plotOptions: {
				   series: {
				      shadow: true
				   },
				   candlestick: {
				      lineColor: '#404048'
				   }
				},

		        credits: {
		            enabled: false
		        },	

		        series: [{
		            name: 'East China',
		            data: [east_foodAvg, east_housingAvg, east_gasAvg, east_public_transportationAvg, east_essentialAvg, east_clothesAvg, east_other_thingsAvg, east_entertainmentAvg, east_medicalAvg, east_othersAvg],
		            pointPlacement: 'on'
		        }, {
		            name: 'South China',
		            data: [south_foodAvg, south_housingAvg, south_gasAvg, south_public_transportationAvg, south_essentialAvg, south_clothesAvg, south_other_thingsAvg, south_entertainmentAvg, south_medicalAvg, south_othersAvg],
		            pointPlacement: 'on'
		        },
		           {
		            name: 'North China',
		            data: [north_foodAvg, north_housingAvg, north_gasAvg, north_public_transportationAvg, north_essentialAvg, north_clothesAvg, north_other_thingsAvg, north_entertainmentAvg, north_medicalAvg, north_othersAvg],
		            pointPlacement: 'on'
		        },
		           {
		            name: 'Central China',
		            data: [central_foodAvg, central_housingAvg, central_gasAvg, central_public_transportationAvg, central_essentialAvg, central_clothesAvg, central_other_thingsAvg, central_entertainmentAvg, central_medicalAvg, central_othersAvg],
		            pointPlacement: 'on'
		        },
		           {
		            name: 'North-East China',
		            data: [north_east_foodAvg, north_east_housingAvg, north_east_gasAvg, north_east_public_transportationAvg, north_east_essentialAvg, north_east_clothesAvg, north_east_other_thingsAvg, north_east_entertainmentAvg, north_east_medicalAvg, north_east_othersAvg],
		            pointPlacement: 'on'
		        },	
		           {
		            name: 'South-West China',
		            data: [south_west_foodAvg, south_west_housingAvg, south_west_gasAvg, south_west_public_transportationAvg, south_west_essentialAvg, south_west_clothesAvg, south_west_other_thingsAvg, south_west_entertainmentAvg, south_west_medicalAvg, south_west_othersAvg],
		            pointPlacement: 'on'
		        },
		           {
		            name: 'North-West China',
		            data: [north_west_foodAvg, north_west_housingAvg, north_west_gasAvg, north_west_public_transportationAvg, north_west_essentialAvg, north_west_clothesAvg, north_west_other_thingsAvg, north_west_entertainmentAvg, north_west_medicalAvg, north_west_othersAvg],
		            pointPlacement: 'on'
		        }]

		    });
		});
        // line chart ends



        // column chart with drilldown starts
		$(function () {
		    // Create the chart
		    $('#columndrilldown').highcharts({
		        chart: {
		            type: 'column',
		            backgroundColor : 'transparent',
		            style: {
                        fontFamily: 'Arial',
                        fontWeight: 'bold'
                    }     		            
		        },
			    colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#ff6600",
			      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],

		        title: {
		            text: 'Basic expenses percentage distribution'
		        },
		        xAxis: {
		            type: 'category'
		        },
		        yAxis: {
		            title: {
		                text: 'Percentage (%)'
		            }

		        },
		        legend: {
		            enabled: false,
				    itemStyle: {
				       fontWeight: 'bold',
				       fontSize: '12px'
				    }		            
		        },
		        plotOptions: {
		            series: {
		                borderWidth: 0,
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.y:.1f}%'
		                },
		                shadow: true
		            },
				   candlestick: {
				      lineColor: '#404048'
				   },
				   column: {
				   	  pointPadding: 0.2 
				   }			            	            
		        },

		        tooltip: {
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
		            borderWidth: 0
		        },

		        credits: {
		            enabled: false
		        },	        

		        series: [{
		            name: 'Area',
		            colorByPoint: true,
		            data: [{
		                name: 'East China',
		                y: east_percentageAvg,
		                drilldown: 'East China'
		            }, {
		                name: 'South China',
		                y: south_percentageAvg,
		                drilldown: 'South China'
		            }, {
		                name: 'North China',
		                y: north_percentageAvg,
		                drilldown: 'North China'
		            }, {
		                name: 'Central China',
		                y: central_percentageAvg,
		                drilldown: 'Central China'
		            }, {
		                name: 'North-East China',
		                y: north_east_percentageAvg,
		                drilldown: 'North-East China'
		            }, {
		                name: 'South-West China',
		                y: south_west_percentageAvg,
		                drilldown: 'South-West China'
		            }, {
		                name: 'North-West China',
		                y: north_west_percentageAvg,
		                drilldown: 'North-West China'
		            }]
		        }],
		        drilldown: {
		            series: [{
		                name: 'East China',
		                id: 'East China',
		                data: [
		                    [
		                        'Jiangsu',
		                        a.Jiangsu.percentageAvg
		                    ],
		                    [
		                        'Zhejiang',
		                        a.Zhejiang.percentageAvg
		                    ],
		                    [
		                        'Anhui',
		                        a.Anhui.percentageAvg
		                    ],
		                    [
		                        'Fujian',
		                        a.Fujian.percentageAvg
		                    ],
		                    [
		                        'Jiangxi',
		                        a.Jiangxi.percentageAvg
		                    ],
		                    [
		                        'Shandong',
		                        a.Shandong.percentageAvg
		                    ],
		                    [
		                        'Shanghai',
		                        a.Shanghai.percentageAvg 
		                    ]
		                ]
		            }, {
		                name: 'South China',
		                id: 'South China',
		                data: [
		                    [
		                        'Guangdong',
		                        a.Guangdong.percentageAvg
		                    ],
		                    [
		                        'Guangxi',
		                        a.Guangxi.percentageAvg
		                    ],
		                    [
		                        'Hainan',
		                        a.Hainan.percentageAvg
		                    ]
		                ]
		            }, {
		                name: 'North China',
		                id: 'North China',
		                data: [
		                    [
		                        'Hebei',
		                        a.Hebei.percentageAvg
		                    ],
		                    [
		                        'Shaanxi',
		                        a.Shaanxi.percentageAvg
		                    ],
		                    [
		                        'Beijing',
		                        a.Beijing.percentageAvg
		                    ],
		                    [
		                        'Tianjing',
		                        a.Tianjing.percentageAvg
		                    ],
		                    [
		                        'Inner Mongol',
		                        a["Inner Mongol"].percentageAvg
		                    ]
		                ]
		            }, {
		                name: 'Central China',
		                id: 'Central China',
		                data: [
		                    [
		                        'Hubei',
		                        a.Hubei.percentageAvg
		                    ],
		                    [
		                        'Hunan',
		                        a.Hunan.percentageAvg
		                    ],
		                    [
		                        'Henan',
		                        a.Henan.percentageAvg
		                    ]
		                ]
		            }, {
		                name: 'North-East China',
		                id: 'North-East China',
		                data: [
		                    [
		                        'Liaoning',
		                        a.Liaoning.percentageAvg
		                    ],
		                    [
		                        'Jilin',
		                        a.Jilin.percentageAvg
		                    ],
		                    [
		                        'Heilongjiang',
		                        a.Heilongjiang.percentageAvg
		                    ]
		                ]
		            }, {
		                name: 'South-West China',
		                id: 'South-West China',
		                data: [
		                    [
		                        'Sichuan',
		                        a.Sichuan.percentageAvg
		                    ],
		                    [
		                        'Yunnan',
		                        a.Yunnan.percentageAvg
		                    ],
		                    [
		                        'Guizhou',
		                        a.Guizhou.percentageAvg
		                    ],
		                    [
		                        'Chongqing',
		                        a.Chongqing.percentageAvg
		                    ],
		                    [
		                        'Xizang',
		                        a.Xizang.percentageAvg
		                    ]
		                ]
		            }, {
		                name: 'North-West China',
		                id: 'North-West China',
		                data: [
		                    [
		                        'Ningxia',
		                        a.Ningxia.percentageAvg
		                    ],
		                    [
		                        'Xinjiang',
		                        a.Xinjiang.percentageAvg
		                    ],
		                    [
		                        'Qinghai',
		                        a.Qinghai.percentageAvg
		                    ],
		                    [
		                        'Shanxi',
		                        a.Shanxi.percentageAvg
		                    ],
		                    [
		                        'Gansu',
		                        a.Gansu.percentageAvg
		                    ]
		                ]
		            }]
		        }
		    });
		});

        // column chart with drilldown ends

    
    // ranking table pagination
    $(document).ready(function() {
      $timeout(function() {
        $('#ranking_table').DataTable();
      }, 500);  
    });
    // ranking table ends


    });

  });     

    


