import React, { useState } from 'react';
import Moment from 'react-moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Link from '@material-ui/core/Link';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  card: {
    '&:hover': {
      backgroundColor: "#e1e2e3",
    },
  },
  totalAmount: {
    color: '#647fe3',
  },
  description: {
    alignItems: 'left'
  },
  amount: {
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
    minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '.5px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
  editIcon: {
    color: '#647fe3',
    '&:hover': {
      borderRadius: '50%',
      width: '10px',
      heigth: '10px',
      backgroundColor: "#e1e2e3"
    },
  }
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
        </CardContent>  
      </Card>  
    </Grid>
  );  

  const details = props.data.filter(x => x.category.includes(index));
 
  const modalContent =  <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {details.map((x, i) => (
                                <TableRow key={i}>
                                 
                                  <TableCell component="th" scope="row">
                                    <Moment format="YYYY/MM/DD">{x.date}</Moment>
                                  </TableCell>
                                  <TableCell align="left">{x.description}</TableCell>
                                  <TableCell align="right" className={classes.amount}>
                                    ${x.amount.toFixed(2)}
                                  </TableCell>
                                  <a href="/expenses" >
                                    <TableCell className={classes.editIcon}><EditIcon /></TableCell>
                                  </a>
                                </TableRow>
                               
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                              
  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={12}>
        <Typography className={classes.cateroryTitle} variant="h5">Expenses by Categories</Typography>
      </Grid> */}
      {card}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >           
        <div className={classes.modalCard}>
          {modalContent}
        </div>  
      </Modal>    
    </Grid>
  );
}

export default Category;
