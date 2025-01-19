import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const GlobalContext = createContext();

// Proveedor del contexto
const GlobalProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [error, setError] = useState(null);

  // manejo de rutas
  const navigate = useNavigate();
  const goToHome = () => navigate("/");
  const goToNuevoVideo = () => navigate("/add");

  // manejo de modal
  const [open, setOpen] = useState(false);
  // manejo de la card seleccionada
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleClickOpen = (video) => {
    setSelectedVideo(video);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedVideo(null);
    setOpen(false);
  };

  // manejo de carga de nuevo video 
  const handleSubmit = async (dataForm) => {
    console.log("Datos formulario: ", dataForm)

    try {
      const response = await axios.post("https://678abf23dd587da7ac2b49b1.mockapi.io/api/v1/videos", dataForm);

      setVideos((videos) => [...videos, response.data]);
      setFilteredVideos((videos) => [...videos, response.data]);

      console.log("Video agregado exitosamente");
      alert("El video se agregó exitosamente")
      navigate("/")

    } catch (err) {
      setError("Error al agregar el video. Intenta nuevamente.");
      console.error(err);
    }

    console.log("Nuevo video", dataForm);
  }

  useEffect(() => {
    console.log("lista de videos, actualizada:", videos)
  }, [videos])

  // manejo de la eliminación de videos
  const handleDelete = async (dataId) => {
    console.log("ID a eliminar: ", dataId)

    const deleteVid = confirm("¿Desea eliminar el video?");

    if (deleteVid) {
      try {
        await axios.delete(`https://678abf23dd587da7ac2b49b1.mockapi.io/api/v1/videos/${dataId}`);
        
        setVideos((videos) => videos.filter((video) => video.id !== dataId));
        setFilteredVideos((videos) => videos.filter((video) => video.id !== dataId));

        console.log("Video eliminado exitosamente");
        alert("Video eliminado correctamente")
        navigate("/")

      } catch (err) {
        setError("Error al eliminar el video. Intenta nuevamente.");
        console.error(err);
      }
    }
  }

  useEffect(() => {
    console.log("lista de videos, actualizada:", videos)
  }, [videos])

  const handleEdit = async (updatedVideo) => {
    const { id } = updatedVideo;
    try {
      // Solicitud PUT a la API para actualizar el video
      await axios.put(`https://678abf23dd587da7ac2b49b1.mockapi.io/api/v1/videos/${id}`, updatedVideo);
      
      // Actualizar el estado local con el video modificado
      setVideos((videos) =>
        videos.map((video) =>
          video.id === id ? { ...video, ...updatedVideo } : video
        )
      );
      setFilteredVideos((videos) =>
        videos.map((video) =>
          video.id === id ? { ...video, ...updatedVideo } : video
        )
      );
      
      console.log("Video actualizado exitosamente");
      alert("El video se actualizó correctamente")
      navigate("/")

    } catch (err) {
      setError("Error al actualizar el video. Intenta nuevamente.");
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      const [videosResponse, categoriasResponse] = await Promise.all([
        axios.get("https://678abf23dd587da7ac2b49b1.mockapi.io/api/v1/videos"),
        axios.get("https://678abf23dd587da7ac2b49b1.mockapi.io/api/v1/categorias"),
      ]);

      setCategorias([{ id: "todos", nombre: "Todos" }, ...categoriasResponse.data]);
      setVideos(videosResponse.data);
      setFilteredVideos(videosResponse.data);

    } catch (err) {
      setError("Error al cargar los datos. Intenta nuevamente.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterByCategory = (categoria) => {
    setSelectedCategory(categoria);
    if (categoria.toLowerCase() === "todos") {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter((video) => video.categoria.toLowerCase() === categoria.toLowerCase())
      );
    }
  };

  const modalState = {
    open,
    handleClickOpen,
    handleClose,
    selectedVideo
  }
  const categoryState = {
    categorias,
    filteredVideos,
    selectedCategory,
    filterByCategory,
  }
  const routesState = {
    goToHome,
    goToNuevoVideo,
  }

  return (
    <GlobalContext.Provider
      value={{
        videos,
        error,
        categoryState,
        routesState,
        modalState,
        handleSubmit,
        handleDelete,
        handleEdit
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
export default GlobalProvider;