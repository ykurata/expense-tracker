import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExpenses } from '../actions/expenseActions';

import Navbar from '../components/Navbar';

const AllExpenses = (props) => {
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    props.getExpenses(token);
  }, []);

  return (
    <div>
      <Navbar />
      
    </div>
  );
}

AllExpenses.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  expenses: state.expense.expenses,
});

export default 
  connect(
  mapStateToProps, 
  { getExpenses })
  (AllExpenses);
