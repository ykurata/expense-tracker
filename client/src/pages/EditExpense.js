import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExpenses } from '../actions/expenseActions';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  cardContainer: {
  
  },
  card: {
    width: 500,
    margin: 'auto',
    marginTop: '10rem'
  },
  textField: {
    marginBottom: '1rem'
  },
  button: {
    marginRight: '2rem',
    marginTop: '1rem'
  }
});

const EditExpense = (props) => {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    props.getExpenses(token);
  }, []);

  return (
    <div>
      <Navbar />
		  <Card className={classes.card}>
        <CardContent>
          <form>
            <Typography variant="h6" className={classes.textField}>
              Edit Expense
            </Typography>
            <TextField
              id="date"
              label="Date"
              type="date"
              name="date"
              //onChange={handleChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              input={<Input id="category" />}
              fullWidth
              className={classes.textField}
            > 

            </Select>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel> 
              <Input
              id="standard-adornment-amount"
              className={classes.textField}
              name="amount"
              
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="description"
              id="description"
              label="Description"
              
              type="text"
              fullWidth
            />
            <Grid align='right' className={classes.button}>
              <Button variant="contained" type="submit" color="primary">Submit</Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

EditExpense.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  expenses: state.expense.expenses,
});

export default 
  connect(
  mapStateToProps, 
  { getExpenses })
  (EditExpense);
