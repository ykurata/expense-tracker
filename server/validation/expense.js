const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateExpenseInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.category= !isEmpty(data.category) ? data.category : "";
	data.amount = !isEmpty(data.amount) ? data.amount : "";
	data.date = !isEmpty(data.date) ? data.date : "";


  // Category checks
  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
	} 

	// Amount checks
  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Amount field is required";
  } else if (!Validator.isCurrency(data.amount)) {
    errors.amount = "Amount must be a number";
  }

  // Date checks
  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  } else if (!Validator.isDate(data.date)) {
    errors.date = "Budget must be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};