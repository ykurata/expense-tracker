import { makeStyles } from '@material-ui/core/styles';

const tableStyles = makeStyles({
  container: {
    marginTop: '7rem',
  },
  title: {
    paddingBottom: '2rem'
  },
  table: {
    width: 650,
    maxHeight: 500,
    overflow: 'auto'
  },
  tableHead: {
    fontWeight: 'bold'
  },
  editIcon: {
    color: '#647fe3',
    '&:hover': {
      color: '#123ee0'
    },
  },
  button: {
    marginTop: '1rem',
    textAlign: 'center'
  }
});

export default tableStyles;