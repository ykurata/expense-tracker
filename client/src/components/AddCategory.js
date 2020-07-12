import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createCategory } from '../actions/categoryActions'; 

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

const AddCategory = (props) => {
  const classes = useStyles();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState({ name: '', budget: '' });

  const handleCategoryClose = () => {
    setCategoryOpen(false);
  }

  const handleChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createCategory(category);
  }

  return (
    <div>
      <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {props.errors ? (
            <Typography color="error" variant="body2">{props.errors.name}</Typography>
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
          {props.errors ? (
            <Typography color="error" variant="body2">{props.errors.budget}</Typography>
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

AddCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createCategory }
)(AddCategory);

