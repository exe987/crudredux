import React from "react";
import { useHistory } from "react-router-dom";
import {
  borrarProductoAction,
  obtenerProductoEditarAction,
} from "../actions/productoActions";
//REDUX
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Producto = ({ producto }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  //CONFIRMAR ELIMINACION
  const confirmarEliminarProducto = (id) => {
    //PREGUNTAR A USUARIO
    Swal.fire({
      title: "Estás seguro de eliminar el producto?",
      text: "No podrás recuperar el producto!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //PASARLO AL ACTION
        dispatch(borrarProductoAction(id));
      }
    });
  };

  //FUNCION PARA REDIRECCIONAR A EDICION
  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditarAction(producto));
    history.push(`/productos/editar/${producto.id}`);
  };

  const { nombre, precio, id } = producto;
  return (
    <tr>
      <td> {nombre} </td>
      <td>
        {" "}
        <span className="font-weight-bold">$ {precio}</span>{" "}
      </td>
      <td className="acciones">
        <button
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
          type="button"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
