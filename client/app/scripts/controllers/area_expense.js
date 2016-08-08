'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AreaExpenseCtrl
 * @description
 * # AreaExpenseCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AreaExpenseCtrl', function ($scope, Expense, $routeParams, $http, $location) {
  	// lodash: use _.groupBy to split all the objects by area into different arrays, 
  	        // use _.forEach to invokes iteratee for each element in the collection,
  	        // use _.meanBy to caculate the avg in different arrays according to properties.
    Expense.getList().then(function(data){
      $scope.expenses = data;
      // data = data.plain();
      var a = _.groupBy(data,'area');
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
      });
      $scope.groupExpenses = a;
      $scope.area = $routeParams.area;
      // console.log($routeParams);
      // console.log($scope.groupExpenses);


      // var array = [1, 2, 3];
      // var x = [4];
      // var y = _.difference(array, x);
      // var w = false;
      // if (y === array) {
      //   w = true;
      // }
      // w = _.isEqual(y, array);
      // console.log(y);
      // console.log(array);
      // console.log(w);

    // var emailArray = ["gmail", "soton"];
    // var filterEmail = function () {
      
    //   var e = "stcg";
    //   var reqemailArray = [];
    //   reqemailArray[0] = e;
    //   var toEmail = "";
    //   var result = _.difference(emailArray, reqemailArray);
    //   var b = false;
    //   if (result === emailArray) {
    //     var b = true;
    //   }
      
    //   if (b === true) {
    //     emailArray.push(e);
    //     toEmail = e;
    //   }
    //   console.log(result);
    //   console.log(b);
    //   console.log(toEmail);
    //   console.log(emailArray);
    //   return toEmail;

    // };
    // console.log(filterEmail());         

    });

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });

  });
