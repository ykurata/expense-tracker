import { makeStyles } from '@material-ui/core/styles';

const profileImageStyles = makeStyles(theme => ({
  form: {
    width: '400px',
    height: '450px'
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
