import React, { useEffect } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { getIncomes } from '../actions/incomeActions';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  container: {
    marginTop: '7rem',
  },
  title: {
    paddingBottom: '2rem'
  },
  table: {
    width: 650,
    maxHeight: 500,
    overflow: 'auto'
  },
  button: {
    marginTop: '1rem',
    textAlign: 'center'
  }
});

const AllIncomes = (props) => {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const incomes = useSelector(state => state.income.incomes);
  
  useEffect(() => {
    dispatch(getIncomes(token));
  }, []);

  return (
    <div>
      <Navbar />
      <Grid container justify='center' alignItems='center' className={classes.container}>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h5" align='center'>All Incomes</Typography>
        </Grid>
      
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomes.map((x, i) => (
                <TableRow key={i}> 
                
                  <TableCell component="th" scope="row">
                    <Moment format="YYYY/MM/DD">{x.date}</Moment>
                  </TableCell>
                  <TableCell align="left">{x.description}</TableCell>
                  <TableCell align="right" >
                    ${x.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid item xs={12} className={classes.button} >
          <Button variant='outlined' color='primary' href="/">Back to Dashboard</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AllIncomes;
