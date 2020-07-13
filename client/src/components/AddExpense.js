import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import { createExpense } from '../actions/expenseActions';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: '1rem'
  }
}));

const AddExpense = (props) => {
  const classes = useStyles();
  let curr = new Date();
  curr.setDate(curr.getDate());
  const today = curr.toISOString().substr(0, 10);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [expenseData, setExpenseData] = useState({ date: today, category: '', amount: '', description: '' });
  const categories = props.category;

  const handleExpenseClose = () => {
    setExpenseOpen(false);
  };

  const handleChange  = e => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    props.getCategories();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    props.createExpense(expenseData);
  }

  let menuItems = categories.map(item => 
    <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
  );

  return (
    <div>
      <DialogTitle id="form-dialmog-title">Add Expense</DialogTitle>
      <DialogContent>
        <form className={classes.container} onSubmit={handleSubmit}>
          {props.errors ? (
            <Typography color="error" variant="body2">{props.errors.date}</Typography>
          ) : (
            null
          )}
          <TextField
            id="date"
            label="Date"
            type="date"
            name="date"
            defaultValue={today}
            onChange={handleChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <InputLabel>Category</InputLabel>
          {props.errors ? (
            <Typography color="error" variant="body2">{props.errors.category}</Typography>
          ) : (
            null
          )}
          <Select
            value={expenseData.category}
            name="category"
            onChange={handleChange}
            input={<Input id="category" />}
            fullWidth
            className={classes.textField}
          > 
            {menuItems}
          </Select>
          
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          {props.errors ? (
            <Typography color="error" variant="body2">{props.errors.amount}</Typography>
          ) : (
            null
          )}
          <Input
            id="standard-adornment-amount"
            value={expenseData.amount}
            name="amount"
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            id="description"
            label="Description"
            value={expenseData.description}
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <DialogActions>
            <Button onClick={handleExpenseClose} type="submit" color="primary" >
              Submit
            </Button>
            <ToastContainer />
          </DialogActions>
        </form>
      </DialogContent>
      
    </div> 
  );
}

AddExpense.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.array.isRequired,
  createExpense: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  category: state.category.categories,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getCategories, createExpense }
)(AddExpense);
