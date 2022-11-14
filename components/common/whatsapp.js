import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { styled } from '@mui/material/styles';
import { WHATSAPP_LINK_CS } from "constants/common";
import commonImages from "constants/images/common";

const Container = styled('div')(({ theme }) => ({
  position: "fixed",
  bottom: "70px",
  right: "40px",
  [theme.breakpoints.down("sm")]: {
    right: "20px"
  },
  zIndex: 1,
  backgroundColor: "#1BD741",
  boxShadow: "4px 8px 16px rgba(0, 0, 0, 0.08)",
  padding: "12px 15px",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  color: "white"
}));

const StyledDiv = styled('div')(() => ({
  width: "200px"
}));

const WhatsappFloat = ({ url }) => {
  const [openAction, setActionState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(false);
    setActionState(false);
  };
  const goToWhatsapp = () => {
    window.open(url || WHATSAPP_LINK_CS, "_blank");
  };
  return (
    <>
      <Container
        onClick={e => {
          handleClick(e);
          setActionState(true);
        }}
      >
        <Image width="20px"
          height="20px"
          src={openAction ? commonImages.WhatsappClose : commonImages.Whatsapp}
          alt="" />
        {/* <Typography className={}>Brik Support</Typography> */}
      </Container>
      {openAction && (
        <Menu
          aria-controls="simple-menu1"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          keepMounted
          getContentAnchorEl={null}
        >
          <StyledDiv>
            <MenuItem className="d-flex flex-column">
              <Typography className={`font_14_500 text-center`} style={{ whiteSpace: "normal" }}>Bingung pilih paket belajar yang mana? </Typography>
              <Typography className={`font_14_bold text-center`} style={{ whiteSpace: "normal" }}> Brik siap bantu kamu.</Typography>
            </MenuItem>
            <MenuItem className="d-flex justify-content-center">
              <Button onClick={goToWhatsapp}
                color="primary"
                className={"zmy-20 text-white"}
                variant="contained">
                <Typography className="font_15_600 text-white">Hubungi</Typography>
              </Button>
            </MenuItem>
          </StyledDiv>
        </Menu>
      )}
    </>
  );
};

export default WhatsappFloat
