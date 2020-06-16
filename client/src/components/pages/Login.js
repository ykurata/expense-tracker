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
import { makeStyles } from '@material-ui/core/styles';

import image from '../images/login5.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(12, 4, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    padding: theme.spacing(1.5, 2.5),
    margin: theme.spacing(3, 3, 3, 0),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  });
  const [validationErrors, setValidationErrors] = useState([]);

  const onChange = e => {
    setUserInput({
      ...userInput, 
      [e.target.name]: e.target.value 
    });
  }

  const onSubmit = e => {
    e.preventDefault();
    const user = {
      email: userInput.email,
      password: userInput.password
    };
    axios.post("/user/login", user)
      .then(res => {
        console.log(res.data.token);
        const decoded = jwt_decode(res.data.token);
        console.log(decoded.id);
      })
      .catch(err => {
        console.log(err);
      });
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