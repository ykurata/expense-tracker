import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux Action
import { createIncome } from '../actions/incomeActions'; 

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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

const AddIncome = (props) => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  let curr = new Date();
  curr.setDate(curr.getDate());
  const today = curr.toISOString().substr(0, 10);
  const [incomeData, setIncomeData] = useState({ date: today, amount: '', description: '' });
  const [incomeOpen, setIncomeOpen] = useState(false);

  const handleIncomeClose = () => {
    setIncomeOpen(false);
  };

  const handleChange = e => {
    setIncomeData({ ...incomeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createIncome(incomeData, token);
  }

  return (
    <div>
      <DialogTitle id="form-dialog-title">Add Income</DialogTitle>
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
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          {props.errors ? (
            <Typography color="error" variant="body2">{props.errors.amount}</Typography>
          ) : (
            null
          )}
          <Input
            id="standard-adornment-amount"
            value={incomeData.amount}
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
            value={incomeData.description}
            onChange={handleChange}
            type="text"
            fullWidth
          />
          <DialogActions>
            <Button type="submit" onClick={handleIncomeClose} color="primary">
              Submit
            </Button>
            <ToastContainer />
          </DialogActions>
        </form>
      </DialogContent>
      
    </div> 
  );
}

AddIncome.propTypes = {
  createIncome: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createIncome }
)(AddIncome);
