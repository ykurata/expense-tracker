import React from 'react';
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

const Saving = (props) => {
  const classes = useStyles();

  const totalIncome = props.inc.reduce((a, b) => a + b, 0).toFixed(2);
  const totalExpense = props.exp.reduce((a, b) => a + b, 0).toFixed(2);
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
      {props.inc.length === 0 || props.exp.length === 0 ? (
        null
      ) : (
        <Typography align='center' variant="body1"><b>{percentage}</b>% of Income Spent</Typography>
      )}
    
    </Paper>
  );
}

export default Saving;
