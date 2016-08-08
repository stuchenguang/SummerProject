'use strict';

describe('Controller: AreaExpenseCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var AreaExpenseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AreaExpenseCtrl = $controller('AreaExpenseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AreaExpenseCtrl.awesomeThings.length).toBe(3);
  });
});
