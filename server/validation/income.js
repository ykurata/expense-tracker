const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateIncomeInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
	data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.date = !isEmpty(data.date) ? data.date : "";

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
    errors.date = "Please enter a valid date";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};