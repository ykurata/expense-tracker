import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
  const theme = useTheme();
  const data = {
		datasets:[
			{
				label:'Saving',
				data:[
          100,
          50
				],
				backgroundColor:[
				  '#647fe3',
					'#d5dbed'
				]
			}
		]
	}

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container className={classes.subTitle}>
        <Grid xs={6} item>
            <Typography variant="h6">$1000.00</Typography>
            <Typography variant="body2">Income</Typography>
        </Grid>
        <Grid xs={6} item>
          <Typography align='right' variant="h6">$500.00</Typography>
          <Typography align='right' variant="body2">Expenses</Typography>
        </Grid>
      </Grid>
      <Doughnut data={data} />
      <Typography align='center' variant="h6">Saving 50%</Typography>
    </Paper>
  );
}

export default Saving;
