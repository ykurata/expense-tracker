import React, { useState } from 'react';
import Moment from 'react-moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import { makeStyles } from '@material-ui/core/styles';
import { ExpansionPanelDetails } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
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
  },
  card: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Category = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState();

  const handleOpen = (e) => {
    setOpen(true);
    const { myValue } = e.currentTarget.dataset;
    setIndex(myValue);
  }

  const handleClose = () => {
    setOpen(false);
  };
  
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
   
  // let filteredData = [];
  // for (let i = 0; i < fixedExp.length; i++ ) {
  //   filteredData.push(props.data.filter(x => x.category.includes(fixedExp[i].name)));
  // }

  const card = fixedExp.map((item, index) => 
    <Grid item xs={6} sm={6} md={4} key={index} >
      <Card>
        <CardContent>
          <Typography variant="body1" >{item.name}</Typography>
          <Typography variant="h6" className={classes.totalAmount}>${item.value}</Typography>
          <button type="button" onClick={handleOpen} data-my-value={item.name}>
            Open Modal
          </button>
        </CardContent>
      </Card>  
    </Grid>
  );  

  const details = props.data.filter(x => x.category.includes(index));
 
  let modalCard = details.map((x, i) => 
                      <div key={i}>
                        <Typography className={classes.description} variant='subtitle1'>{x.description}</Typography>
                        <div className={classes.amount}>
                          <Typography>${x.amount.toFixed(2)}</Typography>
                        </div>
                        <div className={classes.date}>
                        <Typography><Moment format="YYYY/MM/DD">{x.date}</Moment></Typography>
                        </div>  
                      </div>
                  )
                        
  
  
                
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography className={classes.cateroryTitle} variant="h5">Expenses by Categories</Typography>
      </Grid>
      {card}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card style={modalStyle} className={classes.card}>
          <CardContent>
            {modalCard}
          </CardContent>
        </Card>                
      </Modal>    
      
    </Grid>
  );
}

export default Category;
