import "./PDFControl.css";
import { FaFilePdf } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const PDFControl = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [PDFnames, setPDFnames] = useState([]);
  const [satus, setsatus] = useState(0);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const clickExit = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/pdf", {
          params: {
            name: search,
          },
        });
        console.log(response.data);
        setPDFnames(response.data);
      } catch (err) {
        console.error("Error al buscar PDFs:", err);
      }
    };

    handleSearch();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/pdf", {
          params: {
            name: search,
          },
        });
        console.log(response.data);
        setPDFnames(response.data);
      } catch (err) {
        console.error("Error al buscar PDFs:", err);
      }
    };

    handleSearch();
  }, [search, satus]);

  const clickUpload = async () => {
    const { value: file } = await Swal.fire({
      title: "Select file",
      input: "file",
    });
    if (file) {
      console.log("Selected file:", file); // Imprimir el archivo en la consola
      const formData = new FormData();
      formData.append("pdf", file);

      try {
        const response = await fetch("http://localhost:3000/upload-pdf", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        Toast.fire({
          icon: "success",
          title: "Archivo subido correctamente",
        });
        setsatus(satus + 1);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      Toast.fire({
        icon: "warning",
        title: "Favor de seleccionar un archivo PDF",
      });
    }
  };

  const clickViewPDF = (name, archivo) => {
    console.log(archivo);
    try {
      if (archivo && archivo.data) {
        // Convertir el array de bytes a Uint8Array
        const uint8Array = new Uint8Array(archivo.data);

        // Crear un Blob con el Uint8Array
        const blob = new Blob([uint8Array], { type: "application/pdf" });

        // Crear un enlace de descarga
        const url = window.URL.createObjectURL(blob);

        // Crear un elemento <a> y simular el clic para descargar el archivo
        const link = document.createElement("a");
        link.href = url;
        link.download = name || "documento.pdf"; // Usar el nombre pasado como parámetro o un valor por defecto
        document.body.appendChild(link);
        link.click();

        // Limpiar el objeto URL creado
        window.URL.revokeObjectURL(url);

        // Opcional: Eliminar el enlace del DOM
        document.body.removeChild(link);
      } else {
        console.error("No se recibió el archivo o el formato es incorrecto");
      }
    } catch (error) {
      console.error("Error al procesar el archivo PDF:", error);
    }
  };

  const clickDeletePDF = async (name) => {
    console.log(name);

    // Mostrar alerta de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar el archivo "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    // Si el usuario confirma, proceder con la eliminación
    if (result.isConfirmed) {
      try {
        const response = await axios.post("http://localhost:3000/delete-pdf", {
          name,
        });
        console.log("Respuesta del servidor:", response.data);
        // Actualizar estado si es necesario
        setsatus(satus + 1);
        Swal.fire(
          "Eliminado",
          `El archivo "${name}" ha sido eliminado.`,
          "success"
        );
      } catch (error) {
        console.error("Error al eliminar el PDF:", error);
        Swal.fire("Error", "Hubo un problema al eliminar el archivo.", "error");
      }
    } else {
      Swal.fire("Cancelado", "El archivo no fue eliminado.", "info");
    }
  };

  return (
    <>
      <div className="PDFControl">
        <div className="PDFControl__header">
          <div></div>
          <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              placeholder="Search"
              type="search"
              className="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="PDFControl__principalBTn">
            <button
              className="PDFControl__Upload PDFControl__Btn"
              onClick={clickUpload}
              title="Upload"
            >
              <FaCloudUploadAlt size={23} />
            </button>

            <button
              className="PDFControl__Exit PDFControl__Btn"
              onClick={clickExit}
              title="Exit"
            >
              <GiExitDoor size={23} />
            </button>
          </div>
        </div>

        <div className="pdfs">
          {PDFnames.length > 0
            ? PDFnames.map((item) => (
                <div className="PDFControl__card">
                  <div className="PDFControl__card__title">
                    <FaFilePdf size={20} color="#7b241c" />
                    <p>{item.name}</p>
                  </div>
                  <div className="PDFControl__card__buttons">
                    <FaRegEye
                      size={20}
                      color="#1f618d"
                      className="PDFControl__Btn"
                      onClick={() => clickViewPDF(item.name, item.archivo)}
                      title="View"
                    />
                    <LuDelete
                      title="Delete"
                      size={20}
                      color="#c0392b"
                      className="PDFControl__Btn"
                      onClick={() => clickDeletePDF(item.name)}
                    />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};
