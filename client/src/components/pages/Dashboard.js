import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

// Import components 
import Saving from "../layout/Saving";
import MonthlyExpense from "../layout/MonthlyExpense";
import Categories from '../layout/Categories';
import AddExpense from '../layout/AddExpense';
import AddIncome from '../layout/AddIncome';
import AddCategory from '../layout/AddCategory';
import Month from '../layout/Month';

// Import styles
import dashboardStyles from '../styles/dashboardStyles';

const Dashboard = () => {
  const classes = dashboardStyles();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [expenseOpen, setExpenseOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [user, setUser] = useState({});
  const [expenseData, setExpenseData] = useState([]);
	const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);

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

  const signOut = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  }

  useEffect(() => {
    const fetchUser = async () => {
      const result = await axios.get(
        `/user/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} }
      );
      setUser(result.data);
    }
    fetchUser();
  },[token, userId]);

  useEffect(() => {
    const fetchExpense = async () => {
      const result = await axios.get(
        `/expense/all/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} }
      );
      setExpenseData(result.data);
      const expenses = [];
      result.data.map(x => expenses.push(x.amount));
      setExpense(expenses);
    }
    fetchExpense();
	},[token, userId]);
	
	useEffect(() => {
		const fetchIncome = async () => {
			const result = await axios.get(
        `/income/all/${userId}`,  { headers: {"Authorization" : `Bearer ${token}`} }
      );
      const incomes = [];
      result.data.map(x => incomes.push(x.amount));
      setIncome(incomes);
		}
		fetchIncome();
  }, [token, userId]);

  //console.log(expenseData.filter(x => x.date.includes('2020-05')));

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
          <AddIncome/>
				</Dialog>
				
				<ListItem button>
					<ListItemText primary={'Add Category'} onClick={handleCategoryOpen} />
				</ListItem>
        <Dialog open={categoryOpen} onClose={handleCategoryClose} aria-labelledby="form-dialog-title">
          <AddCategory/>
				</Dialog>

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
            {token ? (
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
                  <MenuItem onClick={signOut} >Log Out</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
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
            <Typography className={classes.month} variant="h6">June 2020</Typography>
            {/* select month and year button*/}
            <Month data={expenseData} />
          </Grid>
        
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} >
              {/* Doughnut chart */}
              <Saving exp={expense} inc={income} />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              {/* Monthly expense chart */}
              <MonthlyExpense />
            </Grid>
          </Grid>
          
          {/* Expenses with Categories */}
          <Categories/>
        
      </div>
    </div>
  );
}

export default Dashboard;
