import React, { useEffect } from 'react';
import Moment from 'react-moment';
import { getCategories } from '../actions/categoryActions';
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
import EditIcon from '@material-ui/icons/Edit';

import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  container: {
    marginTop: '7rem',
  },
  title: {
    paddingBottom: '2rem'
  },
  table: {
    width: 400,
    maxHeight: 500,
    overflow: 'auto'
  },
  tableHead: {
    fontWeight: 'bold'
  },
  editIcon: {
    color: '#647fe3',
    '&:hover': {
      borderRadius: '50%',
      backgroundColor: "#e1e2e3"
    },
  },
  button: {
    marginTop: '1rem',
    textAlign: 'center'
  }
});

const AllCategories = (props) => {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categories);
  
  useEffect(() => {
    dispatch(getCategories(userId, token));
  }, []);

  return (
    <div>
      <Navbar />
      <Grid container justify='center' alignItems='center' className={classes.container}>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h5" align='center'>All Categories</Typography>
        </Grid>
      
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className={classes.tableHead}>Category Name</TableCell>
                <TableCell align="right" className={classes.tableHead}>Monthly Budget</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((x, i) => (
                <TableRow key={i}> 
                  <TableCell align="left">{x.name}</TableCell>
                  <TableCell align="right" >
                    ${x.budget.toFixed(2)}
                  </TableCell>
                  <TableCell className={classes.editIcon}>
                    <a href={`/category/edit/${x.id}`}><EditIcon /></a>
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

export default AllCategories;
