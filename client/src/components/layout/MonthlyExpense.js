import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles(theme => ({
	paper: {
		minHeight: '22rem',
	},
	header: {
		borderBottom: '1px solid #ebeced',
		padding: theme.spacing(1),
		marginLeft: '.5rem',
	},
}));

const MonthlyExpense = (props) => {
  const classes = useStyles();
  
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets:[
			{
				label:'Monthly Expenses',
        data: [65, 59, 80, 81, 56, 55, 40],
				backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
			}
		]
	}
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container className={classes.header}>
        <Typography variant="h6">Monthly Expneses</Typography>
      </Grid>
      <Bar data={data} />
    </Paper>
  );
}

export default MonthlyExpense;
