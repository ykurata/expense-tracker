import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUser } from '../actions/userActions';

import Avatar from '@material-ui/core/Avatar';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
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
    paddingTop: '2rem',
    "&:hover": {
      color: 'blue'
  }
  },
  button: {
    marginTop: '1.5rem'
  }
}));

const ProfileImage = (props) => {
  const classes = useStyles();
  const [profileImageOpen, setProfileImageOpen] = useState(false);
  const [image, setImage] = useState(props.user.avatar);
  const [sendImage, setSendImage] = useState(null);

  // Open Profile Picture
  const handleImageOpen = () => {
    setProfileImageOpen(true);
  };

  const handleImageClose = () => {
    setProfileImageOpen(false);
  };

  const selectImage = e => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setSendImage(e.target.files[0]);
  }

  return (
    <div> 
      <form className={classes.form}>
        <DialogTitle id="alert-dialog-title" align='center'>Profile Picture</DialogTitle>
        <DialogContent align='center'>
          <Avatar src={image} className={classes.avatar} />
          <InputLabel className={classes.input}>
            Select Image
            <input type="file" hidden onChange={selectImage} />
          </InputLabel>
          <Button className={classes.button} variant="contained" color="primary">
            Submit
          </Button>
        </DialogContent>
      </form>
    </div>
  );
}

ProfileImage.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user,
});

export default 
  connect(
  mapStateToProps, 
  { getUser })
  (ProfileImage);
