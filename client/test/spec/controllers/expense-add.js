'use strict';

describe('Controller: ExpenseAddCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ExpenseAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpenseAddCtrl = $controller('ExpenseAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpenseAddCtrl.awesomeThings.length).toBe(3);
  });
});
