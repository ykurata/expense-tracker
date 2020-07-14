import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUser, postAvatar } from '../actions/userActions';

import Avatar from '@material-ui/core/Avatar';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    width: '400px',
    height: '450px'
  },
  avatar: {
    width: 200,
    height: 200
  },
  input: {
    marginTop: '2rem'
  },
  button: {
    marginTop: '1.5rem'
  },
  spinner: {
    color: 'white'
  }
}));

const ProfileImage = (props) => {
  const classes = useStyles();
  const [profileImageOpen, setProfileImageOpen] = useState(false);
  const [image, setImage] = useState(props.user.user.avatar);
  const [sendImage, setSendImage] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = e => {
    e.preventDefault();
    if (!sendImage) {
      setError("No file is chosen");
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("avatar", sendImage);
      props.postAvatar(formData, token);
    }
  }

  return (
    <div> 
      <form className={classes.form} onSubmit={onSubmit}>
        <DialogTitle id="alert-dialog-title" align='center'>Profile Picture</DialogTitle>
        <DialogContent align='center'>
          <Typography color="secondary" variant="body2">{error}</Typography>
          <Avatar src={image} className={classes.avatar} />
          <div>
            <Button
              variant="contained"
              component="label"
              className={classes.input}
            >
              Upload File
              <input
                type="file"
                style={{ display: "none" }}
                onChange={selectImage}
              />
            </Button>
          </div>
          <div>
            {isLoading === false ? 
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Submit 
              </Button>
            : <Button type="submit" disabled variant="contained" color="primary" className={classes.button}>
                Submit 
                <CircularProgress size={24} className={classes.spinner} />
              </Button>
            }
            <ToastContainer />
          </div>
        </DialogContent>
      </form>
    </div>
  );
}

ProfileImage.propTypes = {
  getUser: PropTypes.func.isRequired,
  postAvatar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
});

export default 
  connect(
  mapStateToProps, 
  { getUser, postAvatar })
  (ProfileImage);
