import { useRef } from 'react';
import { Grid, Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import ActionSheet from "actionsheet-react";
import styles from 'styles/header.module.scss'
import ExpandLess from '@mui/icons-material/ExpandLess';
import Image from 'next/image'
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';

const Container = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "1.5rem",
}));

const CheckoutButton = (props) => {
  const ref = useRef();
  const { totalHeading, currency, totalAmount, totalItems, actionSheetDiv } = props;
  const handleOpen = () => {
    ref.current.open();
  };

  const handleClose = () => {
    ref.current.close();
  };
  return (
    <Box component="div" className={styles['checkout-button-container']}>
      <Box className="container">
        <Container className="mt-3 d-flex justify-content-between">
          <Box component="div" className="d-flex flex-column">
            <Typography component="span" className={styles["cart-product-name"]}>{totalHeading}</Typography>
            <Box component="div" className="d-flex flex-row align-items-center">
              <Typography component="span" className={`${styles['page-sub-heading']} mt-1`}>{currency}. {totalAmount}</Typography>
              {actionSheetDiv && <ExpandLess className="ml-2" style={{ cursor: 'pointer' }} onClick={handleOpen} />}
              
            </Box>

          </Box>
          <Box component="div">
            <Button
              type="submit"
              fullWidth
              onClick={props.onClickButton}
              className={styles['checkout-button']}
            >
              {totalItems}
            </Button>
          </Box>
          <ActionSheet
            ref={ref}
            sheetStyle={{
              background: "linear-gradient(90deg, #16222A 0%, #3A6073 100%)"
            }}
            bgStyle={{
              backgroundColor: "rgba(1, 1, 1, 0.8)"
            }}
          >
            <Box id="__next" className='px-4' component="div">
              <Box component="div" className='d-flex justify-content-center mt-3 mb-3'>
                <Image src="/icons/rectangle-line.svg" alt="rectangle line" width={60} height={4} />
              </Box>
              {actionSheetDiv}
            </Box>
          </ActionSheet>
        </Container>
      </Box>
    </Box>
  );
};

export default CheckoutButton;
