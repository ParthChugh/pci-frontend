import { Typography, Box } from "@mui/material";
import styles from 'styles/header.module.scss'
import Image from "next/image";
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

export default function ShowContent(props) {
  const {
    heading,
    onClickHandler,
    postDiv,
    icon,
    hideNextIcon = false,
    hideDivider = false
  } = props;

  return (
    <Box >
      <Box component={"div"} className='d-flex justify-content-between align-items-center mt-2 mb-2' style={{ cursor: 'pointer' }} onClick={onClickHandler}>
        <Box className='d-flex align-items-center'>
          {icon &&
            <Box className="mr-2">
              <Image src={icon} alt="image" height={20} width={20} />
            </Box>
          }

          <Typography component={"span"} className={`${styles['show-content-heading']}`}>
            {heading}
          </Typography>
        </Box>

        {
          !hideNextIcon &&
          <IconButton
            className="ml-2"
            onClick={onClickHandler}
            style={{ height: 16, width: 16 }}
          >
            <ArrowForwardIos />
          </IconButton>
        }

      </Box>
      {postDiv}
      {!hideDivider && <hr />}

    </Box>
  );
}
