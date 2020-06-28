import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
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

const AddExpense = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  let curr = new Date();
  curr.setDate(curr.getDate());
  const today = curr.toISOString().substr(0, 10);
  const [categories, setCategories] = useState([]);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [expenseData, setExpenseData] = useState({ date: today, category: '', amount: '', description: '' });
  const [errors, setErrors] = useState([]);

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
    const fetchData = async() => {
      const result = await axios.get(`/category/all/${userId}`, { headers: {"Authorization":`Bearer ${token}` }})
      setCategories(result.data);
    }
    fetchData();
  }, [token, userId])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/expense", expenseData, { headers: {"Authorization" : `Bearer ${token}`}});
      console.log(result.data);
      toast('Added a new expense!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
      window.location.href = "/";
    } catch (err) {
      setErrors(err.response.data);
      console.log(err);
    }
  }
  
  let menuItems = categories.map(item => 
    <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
  );

  return (
    <div>
      <DialogTitle id="form-dialmog-title">Add Expense</DialogTitle>
      <DialogContent>
        <form className={classes.container} onSubmit={handleSubmit}>
          {errors ? (
            <Typography color="error" variant="body2">{errors.date}</Typography>
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
          <InputLabel htmlFor="age-simple">Category</InputLabel>
          {errors ? (
            <Typography color="error" variant="body2">{errors.category}</Typography>
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
          {errors ? (
            <Typography color="error" variant="body2">{errors.amount}</Typography>
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

export default AddExpense;
