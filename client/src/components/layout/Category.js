import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HouseIcon from '@material-ui/icons/House';
import PhoneIcon from '@material-ui/icons/Phone';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    color: 'grey',
    fontSize: '4rem',
    marginBottom: '2rem'
  },
  cateroryTitle: {
    padding: theme.spacing(1,0,1,0),
  }
}));

const Category = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography className={classes.cateroryTitle} variant="h5">Categories with Budget Expense</Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Card>
          <CardContent>
            <LocalGroceryStoreIcon fontSize='large' className={classes.icon} />
            <Typography variant="body1">Grocery</Typography>
            <Typography variant="h6">$100.00</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Card>
          <CardContent>
            <HouseIcon fontSize='large' className={classes.icon} />
            <Typography variant="body1">Rent</Typography>
            <Typography variant="h6">$500.00</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Card>
          <CardContent>
            <PhoneIcon fontSize='large' className={classes.icon} />
            <Typography variant="body1">Electoricity</Typography>
            <Typography variant="h6">$100.00</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Card>
          <CardContent>
            <FastfoodIcon fontSize='large' className={classes.icon} />
            <Typography variant="body1">Eat Out</Typography>
            <Typography variant="h6">$100.00</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Category;
