import logo from '/iconos/logo.png';
import { styled } from '@mui/material';
import NavButtons from './NavButtons';
import { Link } from 'react-router-dom';

const StyledHeader = styled("header")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5em .5em",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 99,
    position: "relative",
    [theme.breakpoints.up("md")]: {
        padding: ".4em .4em", 
    },
}));

const StyledImage = styled("img")(({ theme }) => ({
    width: "8em",
    [theme.breakpoints.down("md")]: {
        width: "6em", 
    },
    [theme.breakpoints.down("sm")]: {
        width: "3.5em",
    },
}));

const StyledTitle = styled("h1")(({ theme }) => ({
    fontSize: "2.5em", 
    margin: "0",
    marginTop: "5rem",
    color: "rgba(255, 255, 255, 0.8)", 
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", 
    [theme.breakpoints.down("md")]: {
        fontSize: "2em",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: "1em", 
    },
}));

const Header = () => {
    return (
        <StyledHeader>
            <Link to="/">
                <StyledImage
                    src={logo}
                    alt="Logo GlitchHub"
                />
            </Link>
            <StyledTitle> GlitchHub, tus videos están acá </StyledTitle>
            <NavButtons />
        </StyledHeader>
    );
}

export default Header;