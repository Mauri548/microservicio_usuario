/**
 *
 * Agrega el mensaje de error en la variable del objeto
 *  
 * @param key es el dato del dentro del objeto msg_error, ej: msg_error.email
 * 
 */
const addMsgError = (objc, key, msj="Este campo no puede estar vacio") => {
    objc[key] = msj
}

export default addMsgError
