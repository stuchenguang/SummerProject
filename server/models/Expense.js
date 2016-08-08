var mongoose = require('mongoose');

// Create the ExpenseSchema.
var ExpenseSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true
  },
  food: {
    type: Number,
    required: true
  },
  housing: {
  	type: Number,
  	required: true
  },
  transportation: {
    gas: {type: Number, required: true},
    public_transportation: {type: Number, required: true}
  },
  shopping: {
    essential: {type: Number, required: true},
    clothes: {type: Number, required: true},
    other_things: {type: Number, required: true}
  },  
  entertainment: {
  	type: Number,
  	required: true
  },
  medical_care: {
    type: Number,
    required: true
  },
  others: {
  	type: Number,
  	required: true  	
  },
  total: {
    type: Number,
    required: true
  },
  basic_expenses_percentage: {
    type: Number,
    required: true
  }
});

// Export the model.
module.exports = mongoose.model('expense', ExpenseSchema);