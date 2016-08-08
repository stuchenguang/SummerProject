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
    $scope.expense.area = "Anhui";
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




    };

    $scope.dataToPost = "";
    $scope.sendmail = function () {
    $http({
        url: "http://localhost:3000/send", 
        method: "GET",
        params: {to: $scope.dataToPost}
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
        $location.path('/expenses');
      });
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
