import { useContext } from 'react';
import { UserContext } from 'context/users/reducer';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  const {
    userState,
  } = useContext(UserContext);
  if (userState.loading) {
    return (
      <Box style={{
        position: 'absolute', marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: '100%',
        zIndex: 99999999
      }}>
        <CircularProgress />
      </Box>
    )
  } else {
    <div />
  }
}