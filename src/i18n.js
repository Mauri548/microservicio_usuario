import {createI18n} from 'vue-i18n' // importo el metodo {createI18n} del paquete instalado


// creo un archivo .js para poder manipular el lenguaje al que quiera traducir las palabras y amrar un pequeño traductor


const messages = { // creo que un objeto en donde crearemos dos atributos en y es que seran
    // las encargas de tener las palabras traducidas al lenguaje que queremos
    
    es:{
        navbarV:{
            personalInfo:'Informacion Personal',
            permisos:'Permisos',
            company:'Empresa',
            userManagement:'Gestión de usuarios',
            companyManagement:'Gestión de empresas',
            appsManagement:'Gestión de apps',
            permissionsManagement:'Gestión de permisos'
        },
        navbar:{
            menuApp:{
                creneinProduct:'Productos Crenein',
                conectarse:'Conectarse a:',
                descubrir:'Descubrir',
            },
            menuPerfil:{
                company:'Empresa:', 
                GestionCuenta:'Gestiona tu cuenta de crenein',
                crearEmpresa:'Crear Empresa',
                cerrarSesion:'Cerrar sesión',
            },
            selectCompany:{
                company:'Empresa', 
            },
        },
        board:{
            headBoard:{
                agregar:'+ Agregar',
                masOps:'Mas opciones',
            },
            showRows:{
                mostrar:'Mostrar',  
                filas:'filas',
            },
            pagination:{
                al:'al',
                de:'de',
            },
            body: {
                emptyBoard: 'No se encontraton datos'
            }
        },
        modal:{
            actionsModal:{
                msmPregunta:'¿Desea cancelar esta accion?',
                msmAccion:'Esta accion eliminara la fila seleccionada',
                siCancel:'Si,eliminar',
                noCancel:'No,cancelar',
            },
            actionPermission:{
                disponible:'Disponible',   
                asignado:'Asignado', 
            },
            acciones:'Acciones',
            editar:'Editar',
            eliminar:'Eliminar',
        },
        permisos:{
            agregar:'Agregar Permiso',
            editar:'Editar Permiso',
            cancel:'Cancelar',
            guardar:'Guardar cambios',
            modalCarga:'Se cargo con exito el permiso.',
            modalEdicion:'Se edito con exito el permiso.',
        },
        personalForm:{
            escogeArchivo:'Escoge un archivo',
            guardar:'Guardar',
            cancel:'Cancelar',
        },
        company:{
            editarCompany:'Editar Empresa',
            cancel:'Cancelar',
            guardar:'Guardar',
            modalEdicion:'Se edito con exito la empresa.',
        },
        app:{
            positivo:'Positivo',
            negativo:'Negativo',
            agregarApp:'Agregar App',
            editarApp:'Editar App',
            escogeArchivo:'Escoge un archivo',
            guardar:'Guardar',
            cancel:'Cancelar',
            modalCarga:'Se cargo con exito la aplicación.',
            modalEdicion:'Se edito con exito la aplicación.',
        },
        inviteUser:{
            titulo:'¡Solo queda un paso más! invita a los usuarios a tu empresa para que te ayuden a gestionarla.',
            ingresarMail:'Ingrese el nombre y correo electrónico de la persona a la que desea invitar.',
            enviar:'Enviar',
            continuar:'Continuar',
            invitar:'Invitar usuario',
            msgInvitationSuccessfuly: 'invitación enviada con exito',
            msgInvitationFailed: 'No se pudo enviar la invitación. Vuelve a intentarlo más tarde.'
        },
        user:{
            usuarios:'Usuarios',
            habilitar:'Habilitar',
            deshabilitar:'Deshabilitar',

        },
        createCompany:{
            datos:'Datos',
            resume:'Mis Compras',  
            app:'Aplicaciones',
            crear:'Crear Empresa',
            enviar:'Enviar',
            anterior:'Anterior',
            siguiente:'Siguiente',

        },
        selectLicence:{
            btnQuiero:'Lo quiero'
        },
        contraseña:{
            msmPassActualizado:'Se actualizo con exito la contraseña!',
            msmRecupera:'Recupera tu contraseña',
            msmCambio:'Recibirá en un momento un enlace para recuperar su contraseña',
            msmCambiado:'Tu contraseña ha cambiado',
            aceptar:'Aceptar',
            enviar:'Enviar',
            cancel:'Cancelar',
        },
        licence: {
            agregar: 'Agregar Licencia',
            agregarTope: 'Agregar Limites',
            editar: 'Editar Licencia',
            editarTope: 'Editar Limites',
            modalCarga:'Se cargo con exito la licencia.',
            modalEdicion:'Se edito con exito la licencia.',
            modalCargaError: 'Fallo al cargar la licencia, por favor intentelo mas tarde',
            modalEdicionError: 'Fallo al editar la licencia, por favor intentelo mas tarde',
            modalCargaLimit: 'Se cargo con exito los limites',
            modalEdicionLimit: 'Se edito con exito los limites',
            modalCargaLimitError: 'Fallo al cargar los limites, por favor intentelo mas tarde',
            modalEdicionLimitError: 'Fallo al editar los limites, por favor intentelo mas tarde',
            tengo:'Esta suscrito',
            quiero:'Suscribirse',
            modalTitulo:'¿Desea cambiar de licencia?',
            modalParrafo:'Si es asi confirme y se le informara al area de administracion para que le cambien la licencia',
            mensajeAclaracion: 'Los campos que queden vacios se autocompleta con el valor 1',
        },

        labelkey:{
            agregar: 'Agregar LabelKey',
            editar: 'Editar LabelKey',
            modalCarga:'Se cargo con exito el LabelKey.',
            modalEdicion:'Se edito con exito el LabelKey.',
            modalCargaError: 'Fallo al cargar el LabelKey, por favor intentelo mas tarde',
            modalEdicionError: 'Fallo al editar el LabelKey, por favor intentelo mas tarde',
        },

        createCompanyFinish: {
            initext: 'Enhorabuena, has creado tu empresa',
            subtext: 'Puedes suscribirte a una de las aplicaciones que tenemos',
            buttontext: 'Ir a suscripciones',
        },
        appSuscription: {
            title: "Elige la app que quieras",
            agregar:'Agregar',
            modalCarga:'Se realizo con exito la subscripcion.',
            modalEdicion:'Se edito con exito la subscripcion.',
            actualizar:'Actualizar suscripción'
        },
        managementPermission: {
            saveSuccessful: 'Los permisos se asignaron con exito',
            saveFailed: 'Ocurrio un error al asignar los permisos, por favor intentelo más tarde'
        }

    },
    en:{
        navbarV:{
            personalInfo:'Personal Info',
            permisos:'Permissions',
            company:'Company',
            userManagement:'User management',
            companyManagement:'Companies management',
            appsManagement:'Apps management',
            permissionsManagement:'Permissions management'
        },
        navbar:{
            menuApp:{
                creneinProduct:'Crenein Products',
                conectarse:'Switch to:',
                descubrir:'Discover',
            },
            menuPerfil:{
                company:'Company:', 
                GestionCuenta:'Manage your Crenein Acount',
                crearEmpresa:'Create Company',
                cerrarSesion:'Sing out',
            },
            selectCompany:{
                company:'Company', 
            },
        },
        board:{
            headBoard:{
                agregar:'+ Add',  
                masOps:'More options',    
            },
            showRows:{
                mostrar:'Show', 
                filas:'rows',     
            },
            pagination:{
                al:'to',
                de:'of',
            },
            body: {
                emptyBoard: 'No data found'
            }
        },
        modal:{
            actionsModal:{
                msmPregunta:'Do you want to cancel user upload?',
                msmAccion:'This action will delete the selected row',
                siCancel:'Yes,delete',
                noCancel:'No,cancel',
            },
            actionPermission:{
                disponible:'Available',   
                asignado:'Assigned', 
            },
            acciones:'Actions',
            editar:'Edit',
            eliminar:'Delete',
        },
        permisos:{
            agregar:'Add Permission',
            editar:'Edit Permission',
            cancel:'Cancel',
            guardar:'Save changes',
            modalCarga:'The permit was successfully loaded.',
            modalEdicion:'The permission was successfully edited.',
                
        },
        personalForm:{
            escogeArchivo:'Choose a file',
            guardar:'Save',
            cancel:'Cancel',
        },
        company:{
            editarCompany:'Edit Company',
            cancel:'Cancel',
            guardar:'Save',
            modalEdicion:'The company was successfully edited.',
        },
        app:{
            positivo:'Positive',
            negativo:'Negative',
            agregarApp:'Add App',     
            editarApp:'Edit App',
            escogeArchivo:'Choose a file',
            guardar:'Save',
            cancel:'Cancel',
            modalCarga:'The application was successfully loaded.',
            modalEdicion:'The application was successfully edited.',
        },
        inviteUser:{
            titulo:'There is only one more step left! invite users to your company to help you manage it.',
            ingresarMail:'Enter the name and email of the person you want to invite.',
            enviar:'Send',
            continuar:'Continue',
            invitar:'Invite user',
            msgInvitationSuccessfuly: 'invitation sent successfully',
            msgInvitationFailed: 'I failed to send the invitation, try again later'
        },
        user:{
            usuarios:'Users',
            habilitar:'Enable',
            deshabilitar:'Disable',
        },
        createCompany:{
            datos:'Data',
            resume:'My shoppings',  
            app:'Apps',
            crear:'Create Company',
            enviar:'Submite',
            anterior:'Prev',
            siguiente:'Next',
        },
        selectLicence:{
            btnQuiero:'I want'
        },
        contraseña:{
            msmPassActualizado:'The password was updated successfully !',
            msmRecupera:'Recover your password',
            msmCambio:'You will receive in a moment a link to retrieve your password',
            msmCambiado:'You password has changed',
            aceptar:'Accept',
            enviar:'Send',
            cancel:'Cancel',

        },

        licence: {
            agregar: 'Add Licence',
            agregarTope: 'Add Limits',
            editar: 'Edit Licence',
            editarTope: 'Edit Limits',
            modalCarga:'The Licence was successfully loaded.',
            modalEdicion:'The Licence was successfully edited.',
            modalCargaError: 'Failed to load license, please try again later',
            modalEdicionError: 'Failed to edit license, please try again later',
            modalCargaLimit: 'The Limits was successfully loaded.',
            modalEdicionLimit: 'The Limits was successfully edited.',
            modalCargaLimitError: 'Failed to load Limits, please try again later',
            modalEdicionLimitError: 'Failed to edit Limits, please try again later',
            tengo:'Is subscribed',
            quiero:'To subscribe',
            modalTitulo:'Do you want to change your license?',
            modalParrafo:'If so, confirm and the administration area will be informed to change the license.',
            mensajeAclaracion: 'The fields thath remain empty are autocompleted with the value 1'
        },
        labelkey:{
            agregar: 'Add LabelKey',
            editar: 'Edit LabelKey',
            modalCarga:'The LabelKey was successfully loaded.',
            modalEdicion:'The LabelKey was successfully edited.',
            modalCargaError: 'Failed to load LabelKey, please try again later',
            modalEdicionError: 'Failed to edit LabelKey, please try again later',
        },
        createCompanyFinish: {
            initext: 'Congratulations you have created your company',
            subtext: 'You subscribe to one of the apps we have',
            buttontext: 'Go to subscriptions',
        },
        appSuscription: {
            title: "Choose the app you want",
            agregar:'Add',
            modalCarga:'The subscription was successful.',
            modalEdicion:'The subscription was successfully edited.',
            actualizar:'Update subscription'
        },
        managementPermission: {
            saveSuccessful: 'Permissions are assigned successfully',
            saveFailed: 'An error occurred while assigning the permissions. She will try again later.'
        }
    }
}

const i18n = createI18n({
    locale:'es',
    messages
})

export default i18n
