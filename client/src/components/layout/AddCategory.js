import React, { useState } from 'react';
import axios from 'axios';
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

const AddCategory = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState({ name: '', budget: '' });

  const handleCategoryClose = () => {
    setCategoryOpen(false);
  }

  const handleChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  console.log(category)
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const newCategory = await axios.post("/category", category, { headers: {"Authorization" : `Bearer ${token}`}})
      console.log(newCategory);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
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
          <InputLabel htmlFor="standard-adornment-amount">Mothly Budget</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={category.budget}
            name="budget"
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            fullWidth
          />
          <DialogActions>
            <Button onClick={handleCategoryClose} type="submit" color="primary" >
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </div>
  );
}

export default AddCategory;
