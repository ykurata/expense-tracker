import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import loginStyles from '../styles/loginStyles';

const Login = () => {
  const classes = loginStyles();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);

  const onChange = e => {
    setUserInput({
      ...userInput, 
      [e.target.name]: e.target.value 
    });
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    const user = {
      email: userInput.email,
      password: userInput.password
    };
    try {
      const data = await axios.post("/user/login", user);
      const decoded = jwt_decode(data.data.token);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userId', decoded.id);
    } catch(err) {
      console.log(err);
    }  
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h3" gutterBottom color='textSecondary'>
            Log in
          </Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="large"
              className={classes.submit}
            >
              Demo User
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;