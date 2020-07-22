import React from 'react';
import { Bar } from 'react-chartjs-2';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import paperStyles from '../styles/paperStyles';

const MonthlyExpense = (props) => {
  const classes = paperStyles();

  const monthAndYear = [];
  props.data.map(x => monthAndYear.push(x.date.slice(0, 7)));
  const uniqMonth = [...new Set(monthAndYear)].reverse();

  const amountArr = [];
  for (let i = 0; i < uniqMonth.length; i ++) {
    amountArr.push(props.data.filter(x => x.date.includes(uniqMonth[i]))
                              .map(x => x.amount)
                              .reduce((a, b) => a + b, 0).toFixed(2))
  }
  amountArr.push(0)

  const data = {
    labels: uniqMonth,
		datasets:[
			{
				label:'Monthly Expenses',
        data: amountArr,
        backgroundColor: '#F7C7DB',
				//backgroundColor: 'rgba(255,99,132,0.2)',
        //borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
			}
		]
	}
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container className={classes.header}>
        <Typography variant="h6">MONTHLY EXPENSES</Typography>
      </Grid>
      {amountArr.length === 1 ? (
        <Typography align='center'>No data saved</Typography>
      ) : (
        <Bar 
          data={data} 
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }} 
        />
      )}
    </Paper>
  );
}

export default MonthlyExpense;
