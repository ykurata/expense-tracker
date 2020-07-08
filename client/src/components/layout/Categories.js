import React, { useState } from 'react';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Link from '@material-ui/core/Link'

import { makeStyles } from '@material-ui/core/styles';
import { ExpansionPanelDetails } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  card: {
    '&:hover': {
      backgroundColor: "#f2f4f7",
    },
  },
  totalAmount: {
    color: '#647fe3',
  },
  description: {
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Category = (props) => {
  const classes = useStyles();
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

  const card = fixedExp.map((item, index) => 
    <Grid item xs={6} sm={4} md={3} key={index} >
      <Card className={classes.card} onClick={handleOpen} data-my-value={item.name}>
        <CardContent>
          <Typography variant="body1" >{item.name}</Typography>
          <Typography variant="h6" className={classes.totalAmount}>${item.value}</Typography>
          {/* <Button color="primary" size="small" onClick={handleOpen} data-my-value={item.name}>
            See Details
          </Button> */}
        </CardContent>
      </Card>  
    </Grid>
  );  

  const details = props.data.filter(x => x.category.includes(index));
 
  let modalContent = details.map((x, i) => 
                      <CardContent key={i}>
                        <Typography><Moment format="YYYY/MM/DD">{x.date}</Moment></Typography>
                        <div className={classes.amount}>
                          <Typography>${x.amount.toFixed(2)}</Typography>
                        </div>
                        <div className={classes.date}>
                          <Typography className={classes.description} variant='subtitle1'>{x.description}</Typography>
                        </div>  
                        <Divider />
                      </CardContent>
                  );
                        
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
        className={classes.modal}
      > 
        <Card className={classes.modalCard}>
          {modalContent}
        </Card>  
      </Modal>    
    </Grid>
  );
}

export default Category;
