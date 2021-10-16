/**
 * 
 * Setea los valores de los mensajes de error a vacio
 * 
 */
const resetErrorMessage = (obj) => {
    for (let i in obj) {
        obj[i] = ''
    }
}

export default resetErrorMessage