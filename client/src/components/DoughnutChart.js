import React, { useState } from 'react';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

import { Doughnut } from 'react-chartjs-2';

const useStyles = makeStyles(theme => ({
	paper: {
		minHeight: '22rem',
	},
	subTitle: {
		padding: theme.spacing(1),
  },
  incomeButton: {
    backgroundColor: '#3590F3',
  },
  expenseButton: {
    backgroundColor: '#62BFED'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    position: 'absolute',
    width: 400,
    maxHeight: 500,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '.5px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
  editIcon: {
    color: '#647fe3',
    '&:hover': {
      borderRadius: '50%',
      backgroundColor: "#e1e2e3"
    },
  }
}));

const DoughnutChart = (props) => {
  const classes = useStyles();
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);

  const handleIncomeOpen = () => {
    setIncomeOpen(true);
  };

  const handleIncomeClose = () => {
    setIncomeOpen(false);
  };

  const handleExpenseOpen = () => {
    setExpenseOpen(true);
  };

  const handleExpenseClose = () => {
    setExpenseOpen(false);
  };

  const totalExpense = props.exp.reduce((a, {amount}) => a + amount, 0).toFixed(2);
  const totalIncome = props.inc.reduce((a, {amount}) => a + amount, 0).toFixed(2);
  const percentage = ((totalExpense / totalIncome)* 100).toFixed(2)

  const data = {
      datasets:[
        {
          label: 'Saving',
          data:[
            totalIncome,
            //(totalIncome-totalExpense).toFixed(2)
            totalExpense
          ],
          backgroundColor:[
            '#3590F3',
            '#62BFED'
          ]
        }
      ],
      labels: [
        'Income',
        'Expense'
      ]
  }
  
  const incomeTable =   <TableContainer component={Paper}>
                          <Table aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {props.inc.map((x, i) => (
                                <TableRow key={i}> 
                                
                                  <TableCell component="th" scope="row">
                                    <Moment format="YYYY/MM/DD">{x.date}</Moment>
                                  </TableCell>
                                  <TableCell align="left">{x.description}</TableCell>
                                  <TableCell align="right" className={classes.amount}>
                                    ${x.amount.toFixed(2)}
                                  </TableCell>
                                  <TableCell className={classes.editIcon}>
                                    <a href={`/income/edit/${x.id}`}><EditIcon/></a>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

const expenseTable =   <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Date</TableCell>
                              <TableCell align="left">Description</TableCell>
                              <TableCell align="right">Amount</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {props.exp.map((x, i) => (
                              <TableRow key={i}> 
                              
                                <TableCell component="th" scope="row">
                                  <Moment format="YYYY/MM/DD">{x.date}</Moment>
                                </TableCell>
                                <TableCell align="left">{x.description}</TableCell>
                                <TableCell align="right" className={classes.amount}>
                                  ${x.amount.toFixed(2)}
                                </TableCell>
                                <TableCell  className={classes.editIcon}>
                                  <a href={`/expense/edit/${x.id}`}><EditIcon /></a>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>                      


  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container className={classes.subTitle}>
        <Grid xs={6} item>
            <Typography variant="h6">${totalIncome}</Typography>
            <Button onClick={handleIncomeOpen} className={classes.incomeButton} variant="contained" color="primary"><Typography variant="body2">Income</Typography></Button>
            <Modal
              open={incomeOpen}
              onClose={handleIncomeClose}
              className={classes.modal}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div className={classes.modalPaper}>
                {incomeTable}
              </div>
            </Modal>
        </Grid>
        <Grid xs={6} item align='right'>
          <Typography align='right' variant="h6">${totalExpense}</Typography>
          <Button onClick={handleExpenseOpen} className={classes.expenseButton} variant="contained" color="primary"><Typography variant="body2">Expense</Typography></Button>
          <Modal
            open={expenseOpen}
            onClose={handleExpenseClose}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className={classes.modalPaper}>
              {expenseTable}
            </div>
          </Modal>
        </Grid>
      </Grid>
      {props.exp.length === 0 && props.inc.length === 0 ? (
        <Typography align='center'>No data saved</Typography>
      ): (
        <Doughnut data={data} />
      )}
      
      {props.inc.length === 0 || props.exp.length === 0 ? (
        null
      ) : (
        <Typography align='center' variant="body1"><b>{percentage}</b>% of Income Spent</Typography>
      )}
    
    </Paper>
  );
}

export default DoughnutChart;
