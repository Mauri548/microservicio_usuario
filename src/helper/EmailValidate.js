import addMsgError from "./AddMsgError";

/**
 * @param email la variable en donde esta almacenado el valor del "email" en string
 * @param objc la varibale donde esta el objeto con los mensajes de errores
 * @param key (opcional) el nombre del valor del atributo
 */
const emailValidate = (email, objc, key="email") => {
    if (!regex_email_validator(email)) {
        console.log('emial')
        let msj = "El email debe tener un formato correcto"
        addMsgError(objc, key, msj)
    }
}

/**
 * 
 * Valida que el email sea un email correcto con la regla 'examle@correo.com'
 * 
 */
const regex_email_validator = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export default emailValidate