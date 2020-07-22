import { makeStyles } from '@material-ui/core/styles';

const cardStyles = makeStyles(theme => ({
  card: {
    width: 500,
    margin: 'auto',
    marginTop: '10rem',
    [theme.breakpoints.down('xs')]: {
      width: 400
    },
    ["@media (max-width:400px)"]: { 
      width: 320
    },
    ["@media (max-width:350px)"]: { 
      width: 300
    },
  },
  textField: {
    marginBottom: '1rem'
  },
  buttonContainer: {
    marginRight: '2rem',
    marginTop: '1rem'
  },
  button: {
    marginLeft: '1.5rem'
  },
  backButton: {
    marginTop: '1rem',
    textAlign: 'center'
  }
}));

export default cardStyles;
  