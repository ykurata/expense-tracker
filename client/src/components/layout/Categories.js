import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    const fetchExpense = async () => {
      const result = await axios.get(
        `/expense/all/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} }
      );
      setExpense(result.data);
    }
    fetchExpense();
  },[token]);


  let holder = {};

  expense.forEach((data) => {
    if (holder.hasOwnProperty(data.category)) {
      holder[data.category] = holder[data.category] + data.amount;
    } else {
      holder[data.category] = data.amount;
    }
  });

  console.log(holder)

  let fixedExp = [];

  for (var prop in holder) {
    fixedExp.push({ name: prop, value: holder[prop].toFixed(2) });
  }
  console.log(fixedExp)

  const card = fixedExp.map((item, index) => {
    return (
      <Grid item xs={6} sm={4} md={3} key={index}>
        <Card>
          <CardContent>
            {/* <LocalGroceryStoreIcon fontSize='large' className={classes.icon} /> */}
            <Typography variant="body1">{item.name}</Typography>
            <Typography variant="h6">${item.value}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography className={classes.cateroryTitle} variant="h5">Categories with Budget Expense</Typography>
      </Grid>
      {card}
    </Grid>
  );
}

export default Category;
