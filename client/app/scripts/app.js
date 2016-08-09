'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    // 'ngCookies',
    // 'ngResource',
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      }) 
      .when('/expenses', {
        templateUrl: 'views/expenses.html',
        controller: 'ExpensesCtrl'
      })
      .when('/add/expense', {
        templateUrl: 'views/expense-add.html',
        controller: 'ExpenseAddCtrl'
      })
      .when('/expense/:area', {
        templateUrl: 'views/area_expense.html',
        controller: 'AreaExpenseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('LivingexpensesRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
      RestangularConfigurer.setBaseUrl('http://crowdslec.herokuapp.com' || 'http://localhost:3000');
    });
  })
  .factory('Expense', function(LivingexpensesRestangular) {
    return LivingexpensesRestangular.service('expense');
  })

  //flash message service
  .factory("flash", function($rootScope) {
    var queue = [];
    var currentMessage = "";

    $rootScope.$on("$routeChangeSuccess", function() {
      currentMessage = queue.shift() || "";
    });

    return {
      setMessage: function(message) {
        queue.push(message);
      },
      getMessage: function() {
        return currentMessage;
      }
    };
  });


