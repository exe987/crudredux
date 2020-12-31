//IMPORTAR TYPES
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types/index";

//CADA REDUCER TIENE SU PROPIO STATE
const initialState = {
  alerta: null,
};

export default function alerta(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        alerta: action.payload,
      };

    case OCULTAR_ALERTA:
      return {
        ...state,
        alerta: action.payload,
      };
    default:
      return state;
  }
}
