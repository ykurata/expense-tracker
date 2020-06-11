import React, { useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: '1rem'
  }
}));

const AddExpense = () => {
  const classes = useStyles();
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [today, setToday] = React.useState(new Date());
  const [state, setState] = React.useState({ amount: '' });

  const handleExpenseClose = () => {
    setExpenseOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <TextField
            id="date"
            label="Date"
            type="date"
            defaultValue={today}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <InputLabel htmlFor="age-simple">Category</InputLabel>
          <Select
            value={state.age}
            onChange={handleChange('age')}
            input={<Input id="age-simple" />}
            fullWidth
            className={classes.textField}
          >
            <MenuItem value={10}>Rent</MenuItem>
            <MenuItem value={20}>Grocery</MenuItem>
            <MenuItem value={30}>Eat Out</MenuItem>
          </Select>
          
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={state.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleExpenseClose} color="primary">
          Submit
        </Button>
        <Button onClick={handleExpenseClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </div> 
  );
}

export default AddExpense;
