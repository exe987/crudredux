//IMPORTAR TYPES
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types/index";

//MOSTRAR ALERTA
export function mostrarAlertaActions(alerta) {
  return (dispatch) => {
    dispatch(crearAlerta(alerta));
  };
}

const crearAlerta = (alerta) => ({
  type: MOSTRAR_ALERTA,
  payload: alerta,
});

//OCULTAR ALERTA
export function ocultarAlertaAction() {
  return (dispatch) => {
    dispatch(ocultarAlerta());
  };
}
const ocultarAlerta = () => ({
  type: OCULTAR_ALERTA,
  payload: null,
});
