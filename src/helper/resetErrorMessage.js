/**
 * 
 * Setea los valores de los mensajes de error a vacio
 * 
 * @param obj Es el objeto con los msj de errores
 * 
 */
const resetErrorMessage = (obj) => {
    for (let i in obj) {
        obj[i] = ''
    }
}

export default resetErrorMessage