import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateExpense } from '../actions/expenseActions';
import { getCategories } from '../actions/categoryActions';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Navbar from '../components/Navbar';
import cardStyles from '../styles/cardStyles';

const EditIncome = (props) => {
  const classes = cardStyles();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const [expenseData, setExpenseData] = useState({
    date: '',
    category: '',
    amount: '',
    description: ''
  });


  const handleChange = e => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`/expense/get/${props.match.params.id}`, { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setExpenseData({
          date: res.data.date,
          category: res.data.category,
          amount: res.data.amount.toFixed(2),
          description: res.data.description
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  // useEffect(() => {
  //   dispatch(getExpense(props.match.params.id, token));
  // }, []);

  useEffect(() => {
    dispatch(getCategories(userId, token));
  }, [userId, token]);

  const onSubmit = e => {
    e.preventDefault();
    const id = props.match.params.id;
    dispatch(updateExpense(id, expenseData, token));
  }
  

  return (
    <div>
      <Navbar />
		  <Card className={classes.card}>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Typography variant="h6" className={classes.textField}>
              Edit Expense
            </Typography>
            <TextField
              id="date"
              label="Date"
              type="date"
              name="date"
              onChange={handleChange}
              value={expenseData.date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel> 
              <Input
                id="standard-adornment-amount"
                className={classes.textField}
                name="amount"
                value={expenseData.amount}
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
              onChange={handleChange}
              value={expenseData.description}
              type="text"
              fullWidth
            />
            <Grid align='right' className={classes.button}>
              <Button variant="contained" type="submit" color="primary">Submit</Button>
              <Button className={classes.cancelButton} variant="contained" color="default" href="/">Back</Button>
            </Grid>
            <ToastContainer />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditIncome;