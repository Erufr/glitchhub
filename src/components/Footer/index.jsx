import React from 'react';
import { styled, useTheme } from "@mui/material";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

// Estilo para el contenedor del footer
const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: "transparent",
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  bottom: 0,
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

// Estilo para la sección de redes sociales
const StyledSocial = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
    marginBottom: "10px",
  },
}));

// Estilo para la lista de redes sociales
const StyledSocialList = styled("ul")({
  display: "flex",
  flexDirection: "row",
  listStyle: "none",
  gap: "1em",
  padding: 0,
  margin: 0,
});

// Estilo para los enlaces de redes sociales
const StyledLink = styled("a")({
  textDecoration: "none",
  color: "#d1f1fd",
  display: "flex",
  alignItems: "center",
  gap: "0.7em",
  fontSize: "1rem",
});

// Estilo para el texto del footer
const StyledText = styled("h4")(({ theme }) => ({
  margin: 0,
  fontSize: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.6em",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
    marginBottom: "10px",
  },
}));

// Estilo para la imagen del logo
const StyledImg = styled("img")(({ theme }) => ({
  width: "6em",
  right: 0,
  bottom: 0,
  [theme.breakpoints.down("sm")]: {
    margin: "0 auto",
  },
}));

// Estilo para el ícono de Vercel
const VercelIcon = styled("img")({
  width: "1.5em",
  height: "1.5em",
});

// Componente Footer
const Footer = () => {
  const theme = useTheme(); // Accede al tema usando el hook useTheme
  const currentYear = new Date().getFullYear();
  return (
    <StyledFooter>
      <StyledSocial>
        <StyledSocialList>
          <li>
            <StyledLink
              href="https://github.com/erufr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon /> GitHub
            </StyledLink>
          </li>
          <li>
            <StyledLink
              href="https://www.linkedin.com/in/erikavfrias/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon /> LinkedIn
            </StyledLink>
          </li>
          <li>
            <StyledLink
              href="https://vercel.com/erus-projects-76bbb7e6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <VercelIcon src="public/img/vercel.png" alt="Vercel" /> Vercel
            </StyledLink>
          </li>
        </StyledSocialList>
      </StyledSocial>
      <StyledText>
        Desarrollado por Erika Frias, para Alura Latam 2025 <CopyrightOutlinedIcon />
        {currentYear}
      </StyledText>
      <StyledImg src="./iconos/logo.png" alt="Logo" />
    </StyledFooter>
  );
};

export default Footer;