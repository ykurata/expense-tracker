import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateCategory } from '../actions/categoryActions';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import Navbar from '../components/Navbar';
import cardStyles from '../styles/cardStyles';

const EditCategory = (props) => {
  const classes = cardStyles();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);
  const [categoryData, setCategoryData] = useState({
    name: '',
    budget: ''
  });

  const handleChange = e => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`/category/get/${props.match.params.id}`, { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setCategoryData({
          name: res.data.name,
          budget: res.data.budget.toFixed(2)
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const id = props.match.params.id;
    dispatch(updateCategory(id, categoryData, token));
  }

  return (
    <div>
      <Navbar />
      <Grid container>
        <Card className={classes.card}>
          <CardContent>
            <form onSubmit={onSubmit}>
              <Typography variant="h6" className={classes.textField}>
                Edit Category
              </Typography>
              {errors ? (
                <Typography color="error" variant="body2">{errors.name}</Typography>
              ) : (
                null
              )}
              <TextField
                autoFocus
                margin="dense"
                name="name"
                id="name"
                label="Category"
                value={categoryData.name}
                type="text"
                fullWidth
                onChange={handleChange}
                className={classes.textField}
              />
              {errors ? (
                <Typography color="error" variant="body2">{errors.budget}</Typography>
              ) : (
                null
              )}
              <Input
                id="standard-adornment-amount"
                value={categoryData.budget}
                name="budget"
                placeholder="Monthly Budget"
                onChange={handleChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                fullWidth
              />
              <Grid align='right' className={classes.buttonContainer}>
                <Button variant="contained" type="submit" color="primary">Submit</Button>
                <Button className={classes.button} variant="contained" color="default" href="/">Back</Button>
              </Grid>   
              <ToastContainer />
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default EditCategory;
