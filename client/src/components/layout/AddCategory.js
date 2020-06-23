import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: '1rem'
  }
}));

const AddCategory = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState({ name: '', budget: '' });
  const [errors, setErrors] = useState([]);

  const handleCategoryClose = () => {
    setCategoryOpen(false);
  }

  const handleChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const newCategory = await axios.post("/category", category, { headers: {"Authorization" : `Bearer ${token}`}})
      console.log(newCategory);
      toast('Added a new category!', {
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
      setCategoryOpen(false);
    }
  }

  return (
    <div>
      <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
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
            value={category.name}
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
            value={category.budget}
            name="budget"
            placeholder="Monthly Budget"
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            fullWidth
          />
          <DialogActions>
            <Button onClick={handleCategoryClose} type="submit" color="primary" >
              Submit
            </Button>
            <ToastContainer />
          </DialogActions>
        </form>
      </DialogContent>
    </div>
  );
}

export default AddCategory;
