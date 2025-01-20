import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Button, Container, styled } from "@mui/material";

const CategoryFilter = () => {
  const { categoryState } = useContext(GlobalContext);
  const { categorias, selectedCategory, filterByCategory } = categoryState;

  const boxStyle = (theme) => ({
    display: "flex",
    flexDirection: "row",
    gap: "1em",
    flexWrap: "wrap",
    mt: ".8em",
    mb: "1em",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-start", 
      ml: "2rem",
    },
    [theme.breakpoints.down("md")]: {
      gap: ".6em",
      mt: ".3em",
      mb: ".4em",
      position: "relative",
    },
  });

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
    backgroundColor: (selectedCategory, categoria) =>
      selectedCategory === categoria ? "#7f6f94" : "custom.main",
    color: "white",
    borderRadius: "20px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: {
      md: "600",
      sm: "500",
    },
    "&:hover": {
      backgroundColor: "#ada3b8",
    },
    "& span": {
      color: "black",
    },
    "& .MuiButton-startIcon": {
      display: "flex",
      margin: ".2em auto",
    },
    [theme.breakpoints.down("sm")]: {
      "& span": {
        display: "none",
      },
      "& .MuiButton-startIcon": {
        fontSize: "1rem",
        textAlign: "center",
      },
    },
  });

  const StyledButton = styled(Button)(({ theme, selectedCategory, categoria }) => ({
    ...buttonStyle(theme),
    backgroundColor: selectedCategory === categoria ? "#7f6f94" : "custom.main",
  }));

  return (
    <Container component="section" sx={boxStyle}>
      {categorias.map((categoria) => (
        <StyledButton
          key={categoria.id}
          variant={selectedCategory === categoria.nombre ? "contained" : "outlined"}
          onClick={() => filterByCategory(categoria.nombre)}
          aria-label={`Filtrar por ${categoria.nombre}`}
          selectedCategory={selectedCategory}
          categoria={categoria.nombre}
        >
          {categoria.nombre}
        </StyledButton>
      ))}
    </Container>
  );
};

export default CategoryFilter;