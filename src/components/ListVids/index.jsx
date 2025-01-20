import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Divider, Card, CardContent, CardActions, Typography, CardMedia, Button, styled } from "@mui/material";
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Loading from "./Loading";

const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

const ListVids = () => {
  const { modalState, error, categoryState, handleDelete } = useContext(GlobalContext);
  const { handleClickOpen } = modalState;
  const { filteredVideos } = categoryState;

  const [expanded, setExpanded] = useState({}); 

  const handleExpandClick = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

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

  const minDescriptionHeight = 60;

  if (error) return (
    <div>
      <Typography color="error">{error}</Typography>
    </div>
  );

  return (
    <Grid
      container
      spacing={4} 
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
                maxWidth: 320, 
                height: 420, 
                margin: "auto",
                backgroundColor: "transparent",
                boxShadow: "0 4px 8px rgba(221, 218, 250, 0.886)",
                borderRadius: "20px",
                fontFamily: "Poppins, sans-serif",
                padding: "1rem",
              }} >
                <CardMedia
                  component="img"
                  src={video.img}
                  alt={video.title}
                  sx={{
                    height: 180, 
                    objectFit: "cover",
                    cursor: "pointer"
                  }}
                  onClick={() => window.open(video.url, "_blank", "noopener,noreferrer")}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6"
                    component="div"
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "1rem", 
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#ac78f6",
                      },
                      textAlign: "center"
                    }}
                  >{video.title}</Typography>

                  <Divider sx={styleBorder} />
                  <Typography variant="body2" sx={{ minHeight: minDescriptionHeight }}>
                    {expanded[video.id] ? video.description : truncateText(video.description, 100)}
                    {video.description.length > 100 && (
                      <Button
                        size="small"
                        onClick={() => handleExpandClick(video.id)}
                        sx={{ ml: 1, textTransform: "none" }}
                      >
                        {expanded[video.id] ? "Ver menos" : "Ver más"}
                      </Button>
                    )}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "space-around", mt: "auto", mb: "1rem" }}>
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