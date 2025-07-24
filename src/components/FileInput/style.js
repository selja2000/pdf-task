import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
  inputLabel: {
    '&.MuiInputLabel-root': {
      color: '#191919',
      fontWeight: 500,
      fontSize: '16px',
      fontFamily: 'calibri!important',
    },
  },

  inputFileClass: {
    '& .MuiInputBase-root': {
      borderRadius: '10px',
    },
    '& .MuiInputBase-input': {
      padding: '5px 14px',
    },
    '& .MuiFileInput-placeholder': {
      fontSize: '13px',
      fontFamily: 'calibri',
    },
    '& .css-flami6': {
      fontSize: '13px',
    },
  },
}));

export default useStyle;

