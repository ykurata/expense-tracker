import { makeStyles } from '@material-ui/core/styles';

const profileImageStyles = makeStyles(theme => ({
  form: {
    width: 400,
    height: 450,
    "@media (max-width:450px)": { 
      width: 300
    }
  },
  avatar: {
    width: 200,
    height: 200
  },
  input: {
    marginTop: '2rem'
  },
  button: {
    marginTop: '1.5rem'
  },
  spinner: {
    color: 'white'
  }
}));

export default profileImageStyles;
