const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCategoryInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.budget = !isEmpty(data.budget) ? data.budget : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Category title is required";
  } 

  // Budget checks
  if (Validator.isEmpty(data.budget)) {
    errors.budget = "Budget field is required";
  } else if (!Validator.isCurrency(data.budget)) {
    errors.budget = "Budget must be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};