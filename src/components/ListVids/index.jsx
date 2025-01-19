import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Divider, Card, CardContent, CardActions, Typography, CardMedia, Button, styled } from "@mui/material";
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Loading from "./Loading";

const ListVids = () => {
  const { modalState, error, categoryState, handleDelete } = useContext(GlobalContext);
  const { handleClickOpen } = modalState;
  const { filteredVideos } = categoryState;

  const styleBorder = {
    borderColor: "#c483b8",
    borderWidth: 1,
    margin: "1rem 0"
  };

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
    borderRadius: "20px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: {
      md: "600",
      sm: "500",
    },
    "&:hover": {
      backgroundColor: "#ada3b8",
    },
  });

  const StyledButton = styled(Button)(({ theme, color }) => ({
    ...buttonStyle(theme),
    backgroundColor: color === "success" ? "green" : "red",
    color: "white",
  }));

  if (error) return (
    <div>
      <Typography color="error">{error}</Typography>
    </div>
  );

  return (
    <Grid
      container
      spacing={4} // Aumentar el espacio entre las cards
      columns={{ xs: 4, sm: 8, md: 12 }}
      justifyContent={"center"}>
      {
        filteredVideos.length === 0 ?
          <Loading />
          : (filteredVideos.map((video) => (
            <Grid item xs={4} sm={4} md={3} key={video.id}>
              <Card sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                maxWidth: 320, // Ajustar el ancho máximo
                height: 280, // Ajustar la altura fija
                margin: "auto",
                backgroundColor: "transparent",
                boxShadow: "0 4px 8px rgba(221, 218, 250, 0.886)",
                borderRadius: "20px", // Ajustar el borde redondeado
                fontFamily: "Poppins, sans-serif",
              }} >
                <CardMedia
                  component="img"
                  src={video.img}
                  alt={video.title}
                  sx={{
                    height: 140, // Ajustar la altura de la imagen
                    objectFit: "cover",
                    cursor: "pointer"
                  }}
                  onClick={() => window.open(video.url, "_blank", "noopener,noreferrer")}
                />
                <CardContent>
                  <Typography variant="h6"
                    component="div"
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#ac78f6",
                      },
                    }}
                  >{video.title}</Typography>

                  <Divider sx={styleBorder} />
                  <Typography variant="body2">{video.description}</Typography>
                  <Divider sx={styleBorder} />
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>{video.categoria}</Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "space-around", mt: "auto" }}>
                  <StyledButton
                    variant="contained"
                    color="success"
                    onClick={() => {
                      handleClickOpen(video)
                    }}
                    size="medium"
                    startIcon={<EditIcon aria-label="Editar" style={{ color: "white" }} />} >
                    Editar
                  </StyledButton>
                  <StyledButton
                    onClick={() => { handleDelete(video.id) }}
                    variant="contained"
                    color="error"
                    size="medium"
                    startIcon={<DeleteForeverIcon aria-label="Eliminar" style={{ color: "white" }} />} >
                    Eliminar
                  </StyledButton>
                </CardActions>
              </Card>
            </Grid>
          ))
          )
      }
    </Grid>
  );
};

export default ListVids;