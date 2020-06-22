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

const AddCategory = () => {
  const classes = useStyles();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [state, setState] = useState({ category: '', budget: '' });

  const handleCategoryClose = () => {
    setCategoryOpen(false);
  }

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
      <DialogContent>
        <form >
          <TextField
            autoFocus
            margin="dense"
            name="category"
            id="category"
            label="Category"
            value={state.category}
            type="text"
            fullWidth
            onChange={handleChange}
            className={classes.textField}
          />
          <InputLabel htmlFor="standard-adornment-amount">Budget</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={state.amount}
            name="amount"
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCategoryClose} color="primary">
          Submit
        </Button>
      </DialogActions>
    </div>
  );
}

export default AddCategory;
