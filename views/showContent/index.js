import { Typography, Box } from "@mui/material";
import styles from 'styles/header.module.scss'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

export default function ShowContent(props) {
  const { heading, onClickHandler, postDiv } = props;
  
  return (
    <Box >
      <Box component={"div"} className='d-flex justify-content-between align-items-center mt-2 mb-2' style={{ cursor: 'pointer' }} onClick={onClickHandler}>
        <Typography component={"span"} className={`${styles['show-content-heading']}`}>
          {heading}
        </Typography>
        <IconButton
          className="ml-2"
          onClick={onClickHandler}
          style={{ height: 16, width: 16 }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
      {postDiv}
      <hr />
    </Box>
  );
}
