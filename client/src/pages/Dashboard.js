import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { getExpenses } from '../actions/expenseActions';
import { getIncomes } from '../actions/incomeActions';
import { getUser } from '../actions/userActions';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CategoryIcon from '@material-ui/icons/Category';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import CallMissedIcon from '@material-ui/icons/CallMissed';

// Import components 
import DoughnutChart from "../components/DoughnutChart";
import MonthlyExpense from "../components/MonthlyExpense";
import Categories from '../components/Categories';
import AddExpense from '../components/AddExpense';
import AddIncome from '../components/AddIncome';
import AddCategory from '../components/AddCategory';
import ProfileImage from '../components/ProfileImage';

// Import styles
import dashboardStyles from '../styles/dashboardStyles';

const Dashboard = (props) => {
  const classes = dashboardStyles();
  const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [monthAnchorEl, setMonthAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [expenseOpen, setExpenseOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileImageOpen, setProfileImageOpen] = useState(false);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const expenseData = props.expenses;
  const incomeData = props.incomes;
  const user = props.user;
  
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // Open Expense
  const handleExpenseOpen = () => {
    setExpenseOpen(true);
  };

  const handleExpenseClose = () => {
    setExpenseOpen(false);
  };

	// Open Income
  const handleIncomeOpen = () => {
    setIncomeOpen(true);
  };

  const handleIncomeClose = () => {
    setIncomeOpen(false);
  };

  // Open Category
  const handleCategoryOpen = () => {
    setCategoryOpen(true);
  }

  const handleCategoryClose = () => {
    setCategoryOpen(false);
  }

  // Open side nav
	const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
	}

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Open Profile Picture
  const handleImageOpen = () => {
    setProfileImageOpen(true);
    setAnchorEl(null);
  };

  const handleImageClose = () => {
    setProfileImageOpen(false);
  };

  const signOut = e => {
    e.preventDefault();
    props.logoutUser();
  }

  // Select Month and Year button 
  const handleMonthClick = e => {
    setMonthAnchorEl(e.currentTarget);
  };

  const handleMonthClose = () => {
    setMonthAnchorEl(null);
  };

  const getDate = e => {
    const { myValue } = e.currentTarget.dataset;
    setSelectedMonth(myValue);

    setMonthAnchorEl(null);
  }

  const filteredExpense = expenseData.filter(x => x.date.includes(selectedMonth));
  const filteredIncome = incomeData.filter(x => x.date.includes(selectedMonth));

 // Get user data
  useEffect(() => {
    props.getUser(userId, token);
  },[]);
  
  // Get Expense data
  useEffect(() => {
    props.getExpenses(token)
  }, []);
    
  // Get income data
	useEffect(() => {
		props.getIncomes(token);
  }, []);

  const monthAndYear = [];
  expenseData.map(x => monthAndYear.push(x.date.slice(0, 7)));
  const uniqMonth = [...new Set(monthAndYear)];
  
  const menuItem = uniqMonth.map((x, i) => (
    <MenuItem key={i} data-my-value={x} onClick={getDate}>{x}</MenuItem>
  ));
  
  
	const drawer = (
    <div>
      <List className={classes.list}>
				<ListItem button className={classes.listItem}>
          <PaymentIcon/>&nbsp;
          <ListItemText primary={'Add Expense'} onClick={handleIncomeOpen}/>  
				</ListItem>
        <Dialog open={expenseOpen} onClose={handleExpenseClose} aria-labelledby="form-dialog-title">
          <AddExpense/>
        </Dialog>

				<ListItem button className={classes.listItem}>
          <AccountBalanceIcon/>&nbsp;
					<ListItemText primary={'Add Income'} onClick={handleIncomeOpen}/>
				</ListItem>
				<Dialog open={incomeOpen} onClose={handleIncomeClose} aria-labelledby="form-dialog-title">
          <AddIncome/>
				</Dialog>
				
				<ListItem button className={classes.listItem}>
          <CategoryIcon/>&nbsp;
					<ListItemText primary={'Add Category'} onClick={handleCategoryOpen} />
				</ListItem>
        <Dialog open={categoryOpen} onClose={handleCategoryClose} aria-labelledby="form-dialog-title">
          <AddCategory/>
				</Dialog>

        <ListItem button className={classes.listItem}>
          <CallMissedOutgoingIcon/>&nbsp;
					<ListItemText primary={'All Expenses'} />
				</ListItem>

        <ListItem button className={classes.listItem}>
          <CallMissedIcon/>&nbsp;
					<ListItemText primary={'All Incomes'} />
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
            {props.auth.isAuthenticated ? (
              <div>
                <span className={classes.username}>{user.username}</span>
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                  <Avatar alt="Remy Sharp" src={user.avatar} className={classes.avatar} />
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
                  <MenuItem onClick={handleImageOpen}>Profile Picture</MenuItem>
                  <Dialog
                    open={profileImageOpen}
                    onClose={handleImageClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <ProfileImage/>
                  </Dialog>

                  <MenuItem onClick={signOut}>Log Out</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button href="/login" variant="contained" color="primary">
                Log In
              </Button>
            )}
						
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
          <Grid container> 
            <Typography className={classes.month} variant="h6">{selectedMonth}</Typography>
            
            {/* select month and year button*/}
            <div>
              <Button 
                variant="contained" 
                color="primary" 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                className={classes.button}
                onClick={handleMonthClick}
              >
                Select Month and Year
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={monthAnchorEl}
                keepMounted
                open={Boolean(monthAnchorEl)}
                onClose={handleMonthClose}
              > 
                {menuItem}
              </Menu>
            </div>
            
          </Grid>
        
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} >
              {/* Doughnut chart */}
              <DoughnutChart exp={filteredExpense} inc={filteredIncome} />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              {/* Monthly expense chart */}
              <MonthlyExpense data={expenseData}/>
            </Grid>
          </Grid>
          
          {/* Expenses with Categories */}
          <Categories data={filteredExpense} />
        
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  getIncomes: PropTypes.func.isRequired,
  incomes: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  expenses: state.expense.expenses,
  incomes: state.income.incomes,
  user: state.user.user,
});

export default 
  connect(
  mapStateToProps, 
  { logoutUser, getExpenses, getIncomes, getUser })
  (Dashboard);

