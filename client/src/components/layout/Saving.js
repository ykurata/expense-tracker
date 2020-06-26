import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Doughnut } from 'react-chartjs-2';

const useStyles = makeStyles(theme => ({
	paper: {
		minHeight: '22rem',
	},
	subTitle: {
		padding: theme.spacing(1),
	}
}));

const Saving = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
	const [expense, setExpense] = useState([]);
	const [income, setIncome] = useState([]);
  
  useEffect(() => {
    const fetchExpense = async () => {
      const result = await axios.get(
        `/expense/all/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} }
      );
      const expenses = [];
      result.data.map(x => expenses.push(x.amount));
      setExpense(expenses);
    }
    fetchExpense();
	},[token]);
	
	useEffect(() => {
		const fetchIncome = async () => {
			const result = await axios.get(
        `/income/all/${userId}`,  { headers: {"Authorization" : `Bearer ${token}`} }
      );
      const incomes = [];
      result.data.map(x => incomes.push(x.amount));
      setIncome(incomes);
		}
		fetchIncome();
  }, [token]);
  
  const totalIncome = income.reduce((a, b) => a + b, 0).toFixed(2);
  const totalExpense = expense.reduce((a, b) => a + b, 0).toFixed(2);
  const percentage = ((totalExpense / totalIncome)* 100).toFixed(2)

  const data = {
      datasets:[
        {
          label: 'Saving',
          data:[
            totalIncome,
            (totalIncome-totalExpense).toFixed(2)
          ],
          backgroundColor:[
            '#647fe3',
            '#d5dbed'
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
            <Typography variant="body2">Income</Typography>
        </Grid>
        <Grid xs={6} item>
          <Typography align='right' variant="h6">${totalExpense}</Typography>
          <Typography align='right' variant="body2">Expenses</Typography>
        </Grid>
      </Grid>
      <Doughnut data={data} />
      {income.length === 0 || expense.length === 0 ? (
        null
      ) : (
        <Typography align='center' variant="body1"><b>{percentage}</b>% of Income Spent</Typography>
      )}
    
    </Paper>
  );
}

export default Saving;
