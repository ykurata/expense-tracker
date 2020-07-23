import { makeStyles } from '@material-ui/core/styles';

const paperStyles = makeStyles(theme => ({
	paper: {
    minHeight: '22rem',
    [theme.breakpoints.between('sm', 'md')]: {
      minHeight: '20rem'
    },
    [theme.breakpoints.down('xs')]: {
      width: '500px',
      minHeight: '23rem'
    },
    "@media (max-width:500px)": { 
      width: '400px',
      minHeight: '300px',
      margin: 'auto'
    },
    "@media (max-width:450px)": { 
      width: '400px',
      margin: 'auto'
    },
    "@media (max-width:420px)": { 
      width: '360px',
      margin: 'auto'
    },
    "@media (max-width:400px)": { 
      width: '320px',
      maxHeight: '300px',
      margin: 'auto'
    },
    "@media (max-width:350px)": { 
      width: '280px',
      maxHeight: '280px',
    }
	},
	subTitle: {
		padding: theme.spacing(1),
  },
  incomeButton: {
    backgroundColor: '#3590F3',
    '&:hover': {
      backgroundColor: '#73aff0'
    },
  },
  expenseButton: {
    backgroundColor: '#62BFED',
    '&:hover' : {
      backgroundColor: '#95d0ed'
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    position: 'absolute',
    minWidth: 400,
    maxHeight: 500,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '.5px solid #000',
    "@media (max-width:430px)": { 
      minWidth: 340
    },
    "@media (max-width:350px)": { 
      minWidth: 300
    },
  },
  editIcon: {
    color: '#647fe3',
    '&:hover': {
      color: '#123ee0'
    },
  },
  header: {
		borderBottom: '1px solid #ebeced',
		padding: theme.spacing(1),
    marginLeft: '.5rem',
    marginBottom: '1.2rem'
  },
  tableHead: {
    fontWeight: 'bold'
  }
}));

export default paperStyles;