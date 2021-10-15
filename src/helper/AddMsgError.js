/**
 *
 * Agrega el mensaje de error en la variable del objeto
 *  
 * @param key es el dato del dentro del objeto msg_error, ej: msg_error.email
 * 
 */
const addMsgError = (objc, key) => {
    objc[key] = 'Este campo no puede estar vacio'
}

export default addMsgError
