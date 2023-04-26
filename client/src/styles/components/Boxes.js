import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  volunteerName: {
    fontFamily: 'Outfit',
    color: '#08082D',
    borderRadius: '4px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#F7F0FE',
      boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
    },
    '&:focus': {
      backgroundColor: '#F6E9FE',
      color: 'white',
      boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
      outline: 'none',
    },
    '&:active': {
      backgroundColor: '#ECD1FD',
    },
    cursor: 'pointer',
    padding: '12px',
    width: '100%',
    marginBottom: '16px',
    boxShadow:
      '0px 1px 1px rgba(0,0,0,0.14), 0px 2px 1px rgba(0,0,0,0.12), 0px 1px 3px rgba(0,0,0,0.2);',
    '&.active': {
      backgroundColor: 'rgba(98, 0, 238, 0.08)',
      border: '1px solid #6200ee',
    },
  },
  skillLabel: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  skillName: {
    borderRadius: '20px',
    padding: '4px 8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    fontFamily: 'Outfit',
    lineHeight: '16px',
    marginTop: '8px'
  }
});
