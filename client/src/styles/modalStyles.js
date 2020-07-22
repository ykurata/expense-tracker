import { makeStyles } from '@material-ui/core/styles';

const modalStyles = makeStyles(theme => ({
  card: {
    '&:hover': {
      backgroundColor: "#e1e2e3",
    },
  },
  totalAmount: {
    color: '#647fe3',
  },
  marginTop: {
    marginTop: '.5rem'
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
    maxHeight: 400,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '.5px solid #000',
    ["@media (max-width:430px)"]: { 
      minWidth: 340
    },
    ["@media (max-width:350px)"]: { 
      minWidth: 300
    },
  },
  editIcon: {
    color: '#647fe3',
    '&:hover': {
      color: '#123ee0'
    },
  },
  tableHead: {
    fontWeight: 'bold'
  }
}));

export default modalStyles;