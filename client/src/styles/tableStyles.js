import { makeStyles } from '@material-ui/core/styles';

const tableStyles = makeStyles(theme => ({
  container: {
    marginTop: '7rem',
  },
  title: {
    paddingBottom: '2rem'
  },
  table: {
    width: 650,
    maxHeight: 500,
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: 500
    },
    [theme.breakpoints.down('xs')]: {
      width: 400
    },
    "@media (max-width:400px)": { 
      width: 340
    },
    "@media (max-width:350px)": { 
      width: 320
    },
  },
  tableHead: {
    fontWeight: 'bold'
  },
  editIcon: {
    color: '#647fe3',
    '&:hover': {
      color: '#123ee0'
    },
  },
  button: {
    marginTop: '1rem',
    textAlign: 'center'
  }
}));

export default tableStyles;