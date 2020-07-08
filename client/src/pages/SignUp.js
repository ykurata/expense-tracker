import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import signupStyles from '../styles/signupStyles';

const SignUp = () => {
  const classes = signupStyles();
  const history = useHistory();
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [error, setError] = useState("");
  
  const onChange = e => {
    setUserInput({
      ...userInput,
      [e.target.name] : e.target.value
    });
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    const user = {
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
      password2: userInput.password2
    }
    try {
      const data = await axios.post("/user/register", user);
      const decoded = jwt_decode(data.data.token);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userId', decoded.id);
      history.push("/");
    } catch(err) {
      console.log(err);
      setValidationErrors(err.response.data);
      setError(err.response.data.error);
    }  
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h3" gutterBottom color='textSecondary'>
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            {error ? (
              <Typography color="error" variant="body2">{error}</Typography>
            ) : (
              null
            )}
            {validationErrors ? (
              <Typography color="error" variant="body2">{validationErrors.username}</Typography>
            ) : (
              null
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={onChange}
            />
            {validationErrors ? (
              <Typography color="error" variant="body2">{validationErrors.email}</Typography>
            ) : (
              null
            )}
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
            {validationErrors ? (
              <Typography color="error" variant="body2">{validationErrors.password}</Typography>
            ) : (
              null
            )}
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
            {validationErrors ? (
              <Typography color="error" variant="body2">{validationErrors.password2}</Typography>
            ) : (
              null
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
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
              Sign Up
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
                <Link href="/login" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignUp;