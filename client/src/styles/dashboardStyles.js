import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const dashboardStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#0d3b66',
		color: '#fafafa'
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
    color: '#3590F3'
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
  listItem: {
    marginBottom: '1rem'
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
    color: '#3590F3',
    fontSize: '1.5rem'
  },
  button: {
    backgroundColor: '#0D3B66',
    '&:hover': {
      backgroundColor: '#276fb3'
    },
    marginLeft: '2rem'
  }
}));

export default dashboardStyles;