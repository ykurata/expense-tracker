import React, { useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: '1rem'
  }
}));

const AddIncome = () => {
  const classes = useStyles();
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [today, setToday] = React.useState(new Date());
  const [state, setState] = React.useState({ amount: '' });

  const handleIncomeClose = () => {
    setIncomeOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">Add Income</DialogTitle>
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
        <Button onClick={handleIncomeClose} color="primary">
          Submit
        </Button>
        <Button onClick={handleIncomeClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </div> 
  );
}

export default AddIncome;
