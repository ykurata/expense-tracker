import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import { createExpense } from '../actions/expenseActions';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Avatar from '@material-ui/core/Avatar';
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


import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles(theme => ({
  form: {
    width: '400px',
    height: '400px'
  },
  avatar: {
    width: 200,
    height: 200
  },
  input: {
    paddingTop: '2rem'
  },
  button: {
    marginTop: '1.5rem'
  }
}));

const ProfileImage = (props) => {
  const classes = useStyles();
  const [profileImageOpen, setProfileImageOpen] = useState(false);

  // Open Profile Picture
  const handleImageOpen = () => {
    setProfileImageOpen(true);
  };

  const handleImageClose = () => {
    setProfileImageOpen(false);
  };
  return (
    <div> 
      <form className={classes.form}>
        <DialogTitle id="alert-dialog-title" align='center'>Profile Picture</DialogTitle>
        <DialogContent align='center'>
          <Avatar className={classes.avatar} />
          <InputLabel className={classes.input}>
            Select Image
            <input type="file" hidden />
          </InputLabel>
          <Button className={classes.button} variant="contained" color="primary">
            Submit
          </Button>
        </DialogContent>
      </form>
    </div>
  );
}

export default ProfileImage;