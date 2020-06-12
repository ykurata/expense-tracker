import React, { useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: '1rem'
  }
}));

const AddExpense = () => {
  const classes = useStyles();
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [state, setState] = useState({ date: selectedDate, category: '', amount: '', description: '' });

  const handleExpenseClose = () => {
    setExpenseOpen(false);
  };

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <div>
      <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              name="date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>  
          <InputLabel htmlFor="age-simple">Category</InputLabel>
          <Select
            value={state.category}
            name="category"
            onChange={handleChange('age')}
            input={<Input id="age-simple" />}
            fullWidth
            className={classes.textField}
          > 
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Grocery">Grocery</MenuItem>
            <MenuItem value="Eat Out">Eat Out</MenuItem>
          </Select>
          
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={state.amount}
            name="amount"
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            id="description"
            label="Description"
            value={state.description}
            type="text"
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleExpenseClose} color="primary">
          Submit
        </Button>
        {/* <Button onClick={handleExpenseClose} color="primary">
          Cancel
        </Button> */}
      </DialogActions>
    </div> 
  );
}

export default AddExpense;