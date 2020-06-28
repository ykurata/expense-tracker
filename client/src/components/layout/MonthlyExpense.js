import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Line } from 'react-chartjs-2';

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

const MonthlyExpense = () => {
	const classes = useStyles();

  const data = {
		datasets:[
			{
				label:'Monthly Expenses',
				data:[  
					200,
					100
				],
				backgroundColor:[
				  '#79dfe8'
				]
			}
		]
	}
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container className={classes.header}>
        <Typography variant="h6">Monthly Expneses</Typography>
      </Grid>
      <Line data={data} />
    </Paper>
  );
}

export default MonthlyExpense;
