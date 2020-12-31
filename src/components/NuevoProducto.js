import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//IMPORTAR FUNCION DESDE ACTION, NO SE PUEDE LLAMAR DIRECTAMENTE SI O QUE SE USAN LOS HOOKS DE REDUX
import { crearNuevoProductoAction } from "../actions/productoActions";
import { mostrarAlertaActions, ocultarAlertaAction } from "../actions/alertaActions";

const NuevoProducto = ({ history }) => {
  //STATE LOCAL
  const [nombre, guardarNombre] = useState("");

  const [precio, guardarPrecio] = useState(0);

  //UTILIZAR USEDISPATCH QUE DISPARA UN METODO QUE NOS SIRVE PARA LLAMAR LA FUNCION
  const dispatch = useDispatch();

  //ACCEDER AL STATE DEL STORE
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  //EJECUTAMOS LA FUNCION DEL ACTIONS DENTRO DE OTRA FUNCION
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  //ONSUBMIT
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    //VALIDAR FORMULARIO
    if (nombre.trim() === "" || precio <= 0) {
        const respuesta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch(mostrarAlertaActions(respuesta))
    
      return;
    }
    //VERIFICAR ERRORES
    dispatch(ocultarAlertaAction())
    //AGREGAR PRODUCTO, AHORA SI UTILIZANDO LA FUNCION DEL ACTIONS
    agregarProducto({
      nombre,
      precio,
    });
    //REDIRECCIONAR A PAGINA PRINCIPAL
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nuevo producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p>: null}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>NOMBRE PRODUCTO</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>PRECIO PRODUCTO</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio producto"
                  name="precio"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                AGREGAR
              </button>
            </form>
            {cargando ? <p>CARGANDO ...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                HUBO UN ERROR
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
