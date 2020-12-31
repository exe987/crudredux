import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";



const EditarProducto = ({history}) => {
  const dispatch = useDispatch();
  
  //PRODUCTO A EDITAR
  const productoEditar = useSelector(state => state.productos.productoEditar)

  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: ''
  })
  useEffect(() => {
    guardarProducto(productoEditar)
  }, [productoEditar])

  //LEER DATOS DE FORMULARIO
  const changeForm = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }
  const {nombre, precio} = producto;

  const submitEditarProducto = e => {
    e.preventDefault();
    if(nombre.trim === '' || precio <= 0 )return null;
    
    dispatch(editarProductoAction(producto));
     
    //REDIRECCIONAR A PAGINA PRINCIPAL
    history.push("/");
  }


    return ( 
        <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4 font-weight-bold">
                Editar producto
              </h2>
              <form
              onSubmit={submitEditarProducto}
              >
                <div className="form-group">
                  <label>NOMBRE PRODUCTO</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre producto"
                    name='nombre'
                    value={nombre}
                    onChange={changeForm}
                  />
                </div>
                <div className="form-group">
                  <label>PRECIO PRODUCTO</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Precio producto"
                    name='precio'
                    value={precio}
                    onChange={changeForm}
                  />
                </div>
                <button
                type='submit'
                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                >
                    GUARDAR CAMBIOS
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default EditarProducto;