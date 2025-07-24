import { makeStyles } from '@mui/styles';

const useStyle = makeStyles(() => ({
  inputLabel: {
    '&.MuiInputLabel-root': {
      color: '#191919',
      fontWeight: 500,
      fontSize: '16px',
      fontFamily: 'calibri!important',
    },
  },
  textField: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      fontSize: '10px',
      borderRadius: 10,
      padding: 0,
    },
    '& .MuiOutlinedInput-root': {
      color: '#000000b3',
      backgroundSecondary: '#ffffff',
      borderRadius: 10,
      padding: 0,
      '& .MuiOutlinedInput-input': {
        padding: '5px 14px',
        fontSize: '13px',
        height: 'auto',
        fontFamily: 'calibri',
      },
    },
  },
}));
export default useStyle;
