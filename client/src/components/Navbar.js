import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { getUser } from '../actions/userActions';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import ProfileImage from '../components/ProfileImage';

// Import styles
import dashboardStyles from '../styles/dashboardStyles';

const Navbar = (props) => {
  const classes = dashboardStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [profileImageOpen, setProfileImageOpen] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Open Profile Picture
  const handleImageOpen = () => {
    setProfileImageOpen(true);
    setAnchorEl(null);
  };

  const handleImageClose = () => {
    setProfileImageOpen(false);
  };

  const signOut = e => {
    e.preventDefault();
    props.logoutUser();
  }  

  // Get user data
  useEffect(() => {
    props.getUser(userId, token);
  },[]);
  
  return (
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" style={{ flex: 1 }} noWrap>
            <a href="/">Expense Tracker</a>
          </Typography>
					<div>
            {props.auth.isAuthenticated ? (
              <div>
                <span className={classes.username}></span>
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                  <Avatar alt="Remy Sharp" src={props.user.avatar} className={classes.avatar} />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleImageOpen}>Profile Picture</MenuItem>
                    <Dialog
                      open={profileImageOpen}
                      onClose={handleImageClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <ProfileImage/>
                    </Dialog>

                    <MenuItem onClick={signOut}>Log Out</MenuItem>
                  </Menu>
              </div>
            ) : (
              <Button href="/login" variant="contained" color="primary">
                Log In
              </Button>
            )}
					</div>
        </Toolbar>
      </AppBar>
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user.user,
});

export default 
  connect(
  mapStateToProps, 
  { logoutUser, getUser })
  (Navbar);

