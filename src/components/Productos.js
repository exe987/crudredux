import React, { Fragment, useEffect } from "react";
import Producto from "./Producto";
import { useDispatch, useSelector } from "react-redux";
//IMPORTAR FUNCION DESDE ACTION, NO SE PUEDE LLAMAR DIRECTAMENTE SI O QUE SE USAN LOS HOOKS DE REDUX
import { obtenerProductosAction } from "../actions/productoActions";

const Productos = () => {
  //UTILIZAR USEDISPATCH QUE DISPARA UN METODO QUE NOS SIRVE PARA LLAMAR LA FUNCION
  const dispatch = useDispatch();

  //CUANDO SE RENDERIZE EL COMPONENTE LLAMAMOS A LOS PRODUCTOS
  useEffect(() => {
    const mostrarProductos = () => dispatch(obtenerProductosAction());
    mostrarProductos();
    // eslint-disable-next-line
  }, []);

  //ACCEDER AL STATE DEL STORE
  const productos = useSelector((state) => state.productos.productos);
  const error = useSelector((state) => state.productos.error);
  const cargando = useSelector((state) => state.productos.loading);

  return (
    <Fragment>
      <h2 className="text-center my-5">LISTADO DE PRODUCTOS</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </p>
      ) : null}
      {cargando ? <p className="text-center">Cargando...</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0
            ? "No hay productos!"
            : productos.map((producto) => (
                <Producto key={producto.id} producto={producto} />
              ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Productos;
