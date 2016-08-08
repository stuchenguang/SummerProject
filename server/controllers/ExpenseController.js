//resourcejs: A simple Express library to reflect Mongoose models to a REST interface.
// var Resource = require('resourcejs');

// module.exports = function(app, route) {

//   // Setup the controller for REST;
//   Resource(app, '', 'expense', app.models.expense).rest();

//   // Return middleware.
//   return function(req, res, next) {
//     next();
//   };
// };

var restful = require('node-restful');
module.exports = function(app, route) {

  // Setup the controller for REST.
  var rest = restful.model(
    'expense',
    app.models.expense
  ).methods(['get', 'put', 'post', 'delete']);

  // Register this endpoint with the application.
  rest.register(app, route);

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};