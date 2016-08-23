'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ExpenseAddCtrl
 * @description
 * # ExpenseAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ExpenseAddCtrl', function ($scope, Expense, $location, $http, $timeout, flash) {
    $scope.expense = {};
    $scope.expense.area = "Beijing";
    $scope.flash = flash;
    $scope.saveExpense = function() {
      var total = parseInt($scope.expense.food) + parseInt($scope.expense.housing) + parseInt($scope.expense.transportation.gas) + 
      parseInt($scope.expense.transportation.public_transportation) + parseInt($scope.expense.shopping.essential) + 
      parseInt($scope.expense.shopping.clothes) + parseInt($scope.expense.shopping.other_things) + parseInt($scope.expense.entertainment) + 
      parseInt($scope.expense.medical_care) + parseInt($scope.expense.others);
      $scope.expense.total = total;
      // console.log(total);
      var basic_expenses_percentage = parseInt(((parseInt($scope.expense.food) + parseInt($scope.expense.housing) + parseInt($scope.expense.shopping.essential) + parseInt($scope.expense.transportation.public_transportation))/ ($scope.expense.total)) * 100) ;
      $scope.expense.basic_expenses_percentage = basic_expenses_percentage;
      // console.log(basic_expenses_percentage);
      Expense.post($scope.expense);
    // console.log($scope.expense);


      Expense.getList().then(function(data){
        var a = _.groupBy(data,'area');
        var area_totalAry = [];
        // console.log(a[$scope.expense.area]);
        _.forEach(a[$scope.expense.area], function(n){
          area_totalAry.push(n.total);   
        });
        // console.log(area_totalAry);
        var index = _.sortedIndex(area_totalAry, total);
        // console.log(index);
        var your_area_r = area_totalAry.length + 1 - index;
        // console.log(your_area_r);
        var your_area_n = area_totalAry.length + 1;
        $scope.result = your_area_r + '/' + your_area_n;
        // console.log($scope.result);
      });    
    };


    $scope.receiver = "";
    $scope.sendmail = function () {
      $timeout(function () {
        $http({
          // url: "http://localhost:3000/send", 
          url: "http://crowdslec.herokuapp.com/send",
          method: "GET",
          params: {
                     to: $scope.receiver,
                     ranking: $scope.result
                  }
        }).success(function(serverResponse) {
          console.log(serverResponse);
          $scope.response = serverResponse;
        }).error(function(serverResponse) {
          console.log(serverResponse);
          // $scope.reponse = serverResponse;
        }).then(function(){
          console.log($scope.response);
          var test = _.isEqual($scope.response, "error");
          console.log(test);
          if (test === true) {
            $scope.message = "You may have got a voucher before, or your email address is invalid!";
          }
          else {
            $scope.message = "Send successfully, please check!";
          }
          // $scope.message = "Hello World";
          flash.setMessage($scope.message);
          $location.path('/');
        });
      }, 1000);
    };
    // console.log($scope.response);

    $scope.closeModal = function () {
      $timeout(function () {
        $location.path('/expenses');
      }, 1000);
    };


    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });        

  });
