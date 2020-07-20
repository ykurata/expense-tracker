import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';

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
    backgroundColor: theme.palette.background.paper,
    border: '.5px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
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
                <h2 id="simple-modal-title">Text in a modal</h2>
                <p id="simple-modal-description">
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
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
              <h2 id="simple-modal-title">Text in a modal</h2>
              <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
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
