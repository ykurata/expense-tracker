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
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import DraftsIcon from '@material-ui/icons/Drafts';
import FastfoodIcon from '@material-ui/icons/Fastfood';


import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Doughnut, Line } from 'react-chartjs-2';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
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
    width: drawerWidth
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
	paper: {
		minHeight: '22rem',
	},
	header: {
		borderBottom: '1px solid #ebeced',
		padding: theme.spacing(1),
		marginLeft: '.5rem'
	},
	subTitle: {
		padding: theme.spacing(1),
	},
	transactionPaper: {
		marginTop: '2rem'
	}
}));


const Dashboard = () => {
  const dummyCategories = ['Add Expense', 'Add Income', 'Add Category', 'Create Budget']
  const classes = useStyles();
  const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	
	const data = {
		datasets:[
			{
				label:'Population',
				data:[
					617594,
					181045,
					153060,
					106519,
					105162,
					95072
				],
				backgroundColor:[
					'rgba(255, 99, 132, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 206, 86, 0.6)',
					'rgba(75, 192, 192, 0.6)',
					'rgba(153, 102, 255, 0.6)',
					'rgba(255, 159, 64, 0.6)',
					'rgba(255, 99, 132, 0.6)'
				]
			}
		]
	}

	const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
	}

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

	
	const drawer = (
    <div>
      <List className={classes.list}>
        {dummyCategories.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
						<Paper className={classes.paper} elevation={3}>
							<Grid container className={classes.subTitle}>
								<Grid xs={6} item>
										<Typography variant="h6">$1000.00</Typography>
										<Typography variant="body2">Income</Typography>
								</Grid>
								<Grid xs={6} item>
									<Typography align='right' variant="h6">$500.00</Typography>
									<Typography align='right' variant="body2">Expenses</Typography>
								</Grid>
							</Grid>
							<Doughnut data={data} />
							<Typography align='center' variant="h6">Saving 50%</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Paper className={classes.paper} elevation={3}>
							<Grid container className={classes.header}>
								<Typography variant="h6">Monthly Expneses</Typography>
							</Grid>
							<Line data={data} />
						</Paper>
					</Grid>
				</Grid>
				
				<Paper className={classes.transactionPaper} elevation={3}>
					<Grid>
						<Typography variant="h6" className={classes.header}>Monthly transaction</Typography>
					</Grid>
					<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell>Category</TableCell>
								<TableCell>Description</TableCell>
								<TableCell>Amount</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							
						</TableBody>
					</Table>
					</TableContainer>
				</Paper>
			
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
