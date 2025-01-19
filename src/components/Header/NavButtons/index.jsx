import { styled, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import React from "react";
import { Link } from "react-router-dom";

const StyledNav = styled("nav")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  gap: "1em",
  [theme.breakpoints.up("sm")]: {
    padding: ".8rem",
    gap: ".8em",
  }, 
}));

const buttonStyle = (theme) => ({
  fontSize: {
    xs: "0.7rem", 
    md: "1rem", 
  },
  padding: {
    xs: ".3em .75em",
    md: ".7em 1.2em",
    sm: ".4em 1em",
  },
  backgroundColor: "#7f6f94", 
  borderRadius: "20px", 
  "& span": {
    color: "black", 
  },
  "& .MuiButton-startIcon": {
    display: "flex",
    margin:".2em auto"
  },
  [theme.breakpoints.down("sm")]: {
    "& span": {
      display: "none", 
    },
    "& .MuiButton-startIcon": {
      fontSize: "1rem",
      textAlign: "center"
    },
  },
});

const NavButtons = () => {
  return (
    <StyledNav>
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          sx={buttonStyle}
        >
          <span>Home</span>
        </Button>
      </Link>
      <Link to="/add">
        <Button
          variant="contained"
          color="primary"
          startIcon={<VideoCallOutlinedIcon />}
          sx={buttonStyle}
        >
          <span>Nuevo video</span>
        </Button>
      </Link>
    </StyledNav>
  );
};

export default NavButtons;