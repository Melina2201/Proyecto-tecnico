import React from 'react';
import { useState } from 'react';
import style from "./formulario.module.css"
import Swal from "sweetalert2";

export default function Form(){
        const [data, setData] = useState([]);
      
        const parseFileData = (file) => {
          const reader = new FileReader();
          reader.readAsText(file, "UTF-8");
          reader.onload = (evt) => {
            const fileData = evt.target.result;
            const parsedData = fileData
             .split("\n")
             .map((line) => {
              const [id, nombre, apellido, email, genero] = line.split(",").map((field) => field.trim() || "");
              return { id, nombre, apellido, email, genero };
               });
           setData(parsedData);

          };          
        };
      
        const handleSubmit = (e) => {
            e.preventDefault();
            const file = e.target.archivo.files[0];
            if (!file) {
              Swal.fire({
                title: "No hay archivo",
                icon: "error",
                text: "Por favor, seleccione un archivo .txt.",
                confirmButtonText: "Aceptar",
              });
              return;
            }
            parseFileData(file);
          };
          
          

      return (
          <div className={style.conteiner}>
            <h1 className={style.titulo}>PRUEBA TÉCNICA BDO</h1>
            <p>Este proyecto tiene como funcionalidad que se pueda subir un archivo .txt, donde al seleccionar "leer archivo", se desplegará abajo un
                cuadro de cinco entradas. Si se intenta seleccionar "leer archivo" sin haber subido un texto previamente aparecerá un mensaje de 
                error.
            </p>
            <p>Por otro lado, si el archivo llega con información faltante, el cuadro tendrá esa celda vacia de color rojo. Además, al pasar el mouse
                por la información, toda la fila cambia de color para una mejor vista de los datos.
            </p>
            <p>Al recargar la página se limpia el cuadro, y si se desea subir/cambiar de archivo sólo se debe seleccionar uno nuevo y clickear en "leer 
                archivo" nuevamente.</p>
            <hr />
            <form className={style.form} onSubmit={handleSubmit}>
              <label className={style.label} htmlFor="archivo">Selecciona un archivo de texto:</label>
              <input className={style.file} type="file" id="archivo" name="archivo" />
              <button className={style.button} type="submit">Leer archivo</button>
            </form>
            <hr />
            {data.length > 0 && (
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>APELLIDO</th>
                    <th>EMAIL</th>
                    <th>GÉNERO</th>
                  </tr>
                </thead>
                <tbody>
                {data.map((line, index) => (
                <tr key={index}>
                 <td>{line.id}</td>
                 <td className={line.nombre ? "" : style.missing}>{line.nombre}</td>
                 <td className={line.apellido ? "" : style.missing}>{line.apellido}</td>
                 <td className={line.email ? "" : style.missing}>{line.email}</td>
                 <td className={line.genero ? "" : style.missing}>{line.genero}</td>
             </tr>
            ))}
              </tbody>

              </table>
            )}
          </div>
        ); 
}