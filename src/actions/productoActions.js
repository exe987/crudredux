//IMPORTAR TYPES
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from "../types/index";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";


//CREAR NUEVOS PRODUCTOS
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    //AGREGAR
    dispatch(agregarProducto());
    //CASO DE EXITO
    try {
      //INSERTAR EN LA API
      await clienteAxios.post("/productos", producto);
      //SI TODO SALE BIEN ACTUALIZAR STATE
      dispatch(agregarProductoExito(producto));
      //MOSTRAR ALERTA DE EXITO
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      console.log(error);
      //CASO DE ERROR CAMBIAR STATE
      dispatch(agregarProductoError());
      //MOSTRAR ALERTA DE ERROR
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo!!!",
      });
    }
  };
}

//CUANDO PRESIONAMOS EL BOTON DE AGREGAR PRODUCTO Y EMPIEZA LA CARGA
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

//SI EL PRODUCTO SE GUARDA EN UNA BASE DE DATOS
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

//SI EL PRODUCTO NO SE GUARDA
const agregarProductoError = () => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: true,
});
//----------------------------------------------//

//FUNCION PARA OBTENER PRODUCTOS DESDE LA BASE DE DATOS Y MOSTRARLOS
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargaProductos());
    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError());
    }
  };
}

const descargaProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

//----------------------------------------------//

//FUNCION PARA ELIMINAR PRODUCTO

export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));

    try {
      await clienteAxios.delete(`./productos/${id}`);
      dispatch(eliminarProductoExito(id));
      //SI SE ELIMINA MOSTRAR ALERTA
      Swal.fire(
        "Se eliminó correctamente!",
        "El producto ha sido eliminado",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}
const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = (id) => ({
  type: PRODUCTO_ELIMINADO_EXITO,
  payload: id,
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

//----------------------------------------------//

//FUNCION PARA CAPTURAR PRODUCTO EDITAR
export function obtenerProductoEditarAction(producto) {
  return async (dispatch) => {
    dispatch(obtenerProductoEditar(producto));
  };
}
const obtenerProductoEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

//FUNCION PARA EDITAR UN REGISTRO EN LA API STATE
export function editarProductoAction(producto){
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto)
      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log(error)
      dispatch(editarProductoError())
    }
  };
} 

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO,
})
const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
})

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true,
})