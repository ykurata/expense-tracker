import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const dashboardStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#fafafa',
		color: 'grey'
	},
	avatar: {
    width: theme.spacing(6),
		height: theme.spacing(6),
		[theme.breakpoints.down('sm')]: {
      width: theme.spacing(5),
			height: theme.spacing(5),
		},
	},
	username: {
		[theme.breakpoints.down('xs')]: {
      display: 'none',
		},
	},
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
		}
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
		width: drawerWidth,
    backgroundColor: '#F7C7DB',
    color: 'black'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
	},
	list : {
    paddingTop: '2rem',
    fontFamily: 'Arial',
    textTransform: 'uppercase'
	},
	transactionPaper: {
		marginTop: '2rem',
	},
	tableContainer: {
		height: '20rem'
  },
  textField: {
    marginBottom: '1rem'
  },
  month: {
    paddingBottom: '1rem',
    color: '#647fe3'
  },
  button: {
    backgroundColor: '#3590F3',
    '&:hover': {
      backgroundColor: '#7bb2ed'
    },
    marginLeft: '2rem'
  }
}));

export default dashboardStyles;