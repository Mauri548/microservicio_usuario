import AddMsgError from "./AddMsgError"

/**
 * 
 * @param variable es la variable que se recibe para comprobar si esta vacio
 * @param key (opcional) es para introducir el mensaje de error
 * 
 */
const isEmpty = (variable, objc ,key = '') => {
    if (variable) {
        return false
    }
    if (key) {
        AddMsgError(objc, key)
    }
    return true
}

export default isEmpty