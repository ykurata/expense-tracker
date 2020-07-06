import React, { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    color: 'grey',
    fontSize: '4rem',
    marginBottom: '2rem'
  },
  cateroryTitle: {
    padding: theme.spacing(1,0,1,0),
  },
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
    <Grid item xs={6} sm={4} md={4} key={index}>
      <Card>
        <CardContent>
          <Typography variant="body1">{item.name}</Typography>
          <Typography variant="h6">${item.value}</Typography>
        </CardContent>
          {filteredData[index].map((x, i) => 
            <CardContent key={i}>
              <Typography>{x.date}</Typography>
              <Typography>{x.description}</Typography>
              <Typography>${x.amount}</Typography>
            </CardContent>
          )}
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
