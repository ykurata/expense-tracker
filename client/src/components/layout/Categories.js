import React, { useState } from 'react';
import Moment from 'react-moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    height: '200px',
    overflow: 'auto'
  },
  totalAmount: {
    color: '#647fe3'
  },
  description: {
    fontWeight: 'bold',
    alignItems: 'left'
  },
  amount: {
    float: 'left',
    color: '#647fe3'
  },
  date: {
    flaot: 'right',
    marginLeft: '8rem'
  }
}));

const Category = (props) => {
  const classes = useStyles();
  
  let holder = {};

  props.data.forEach((data) => {
    if (holder.hasOwnProperty(data.category)) {
      holder[data.category] = holder[data.category] + data.amount;
    } else {
      holder[data.category] = data.amount;
    }
  });

  let fixedExp = [];

  for (var prop in holder) {
    fixedExp.push({ name: prop, value: holder[prop].toFixed(2) });
  }
   
  let filteredData = [];
  for (let i = 0; i < fixedExp.length; i++ ) {
    filteredData.push(props.data.filter(x => x.category.includes(fixedExp[i].name)));
  }

  const card = fixedExp.map((item, index) => 
    <Grid item xs={6} sm={6} md={4} key={index}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="body1" >{item.name}</Typography>
          <Typography variant="h6" className={classes.totalAmount}>${item.value}</Typography>
        </CardContent>
        <CardContent>
        {filteredData[index].map((x, i) => 
            <div key={i}>
              <Typography className={classes.description} variant='subtitle1'>{x.description}</Typography>
              <div className={classes.amount}>
                <Typography>${x.amount.toFixed(2)}</Typography>
              </div>
              <div className={classes.date}>
              <Typography><Moment format="YYYY/MM/DD">{x.date}</Moment></Typography>
              </div>  
            </div>
          )}
        </CardContent>
          
      </Card>  
    </Grid>
  );
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography className={classes.cateroryTitle} variant="h5">Expenses by Categories</Typography>
      </Grid>
      {card}
    </Grid>
  );
}

export default Category;
