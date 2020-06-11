import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Saving from "../layout/Saving";
import MonthlyExpense from "../layout/MonthlyExpense";
import Category from '../layout/Category';
import AddExpense from '../layout/AddExpense';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
    backgroundColor: '#b2badb',
    color: 'balck'
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
		paddingTop: '2rem'
	},
	transactionPaper: {
		marginTop: '2rem',
	},
	tableContainer: {
		height: '20rem'
  },
  textField: {
    marginBottom: '1rem'
  }
}));


const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [expenseOpen, setExpenseOpen] = React.useState(false);
  const [incomeOpen, setIncomeOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [state, setState] = React.useState({ amount: '' });
  const [today, setToday] = React.useState(new Date());
  
  const handleExpenseOpen = () => {
    setExpenseOpen(true);
  };

  const handleExpenseClose = () => {
    setExpenseOpen(false);
  };

	// Add income
  const handleIncomeOpen = () => {
    setIncomeOpen(true);
  };

  const handleIncomeClose = () => {
    setIncomeOpen(false);
  };

  // open side nav
	const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
	}

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

	const drawer = (
    <div>
      <List className={classes.list}>
				<ListItem button>
					<ListItemText primary={'Add Expense'} onClick={handleExpenseOpen} />
				</ListItem>
        <Dialog open={expenseOpen} onClose={handleExpenseClose} aria-labelledby="form-dialog-title">
          <AddExpense/>
        </Dialog>

				<ListItem button>
					<ListItemText primary={'Add Income'} onClick={handleIncomeOpen}/>
				</ListItem>

				<Dialog open={incomeOpen} onClose={handleIncomeClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Add Income</DialogTitle>
					<DialogContent>
	
						<TextField
							autoFocus
							margin="dense"
							id="income"
							label="Income"
							type="income"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleIncomeClose} color="primary">
							Submit
						</Button>
						<Button onClick={handleIncomeClose} color="primary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				
				<ListItem button>
					<ListItemText primary={'Add Category'} />
				</ListItem>
				<ListItem button>
					<ListItemText primary={'Create Budget'} />
				</ListItem>
      </List>
    </div>
  );
	return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flex: 1 }} noWrap>
            Expense Tracker
          </Typography>
					<div>
						<span className={classes.username}>Yasuko Kurata</span>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							 <Avatar alt="Remy Sharp" src="" className={classes.avatar} />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Log Out</MenuItem>
							<MenuItem onClick={handleClose}>My account</MenuItem>
						</Menu>
					</div>
        </Toolbar>
      </AppBar>
      
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon/>
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
				<Hidden smDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>  
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={6} >
            {/* saving component */}
						<Saving />
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
            {/* Monthly expense chart */}
						<MonthlyExpense />
					</Grid>
				</Grid>
				
        {/* Expenses with Categories */}
        <Category/>
        
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default Dashboard;
