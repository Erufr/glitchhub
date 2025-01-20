import React from "react";
import { Box, useTheme } from "@mui/material";

const Banner = () => {
  const theme = useTheme(); 

  return (
    <Box
      component="img"
      src="./img/banners/banner2.jpeg" 
      alt="Banner"
      sx={{
        marginTop: "-10em",
        width: "100%", 
        height: "auto", 
        maxHeight: "400px", 
        objectFit: "cover", 
        [theme.breakpoints.down("sm")]: {
          marginTop: "-5em",
        },
      }}
    />
  );
};

export default Banner;