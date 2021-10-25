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
            msmRecupera:'Recupera tu contraseña',
            msmCambio:'Recibirá en un momento un enlace para recuperar su contraseña',
            msmCambiado:'Tu contraseña ha cambiado',
            aceptar:'Aceptar',
            enviar:'Enviar',
            cancel:'Cancelar',
        },
        licence: {
            agregar: 'Agregar Licencia',
            editar: 'Editar Licencia',
            modalCarga:'Se cargo con exito la licencia.',
            modalEdicion:'Se edito con exito la licencia.',
            modalCargaError: 'Fallo al cargar la licencia, por favor intentelo mas tarde',
            modalEdicionError: 'Fallo al editar la licencia, por favor intentelo mas tarde',
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
            msmRecupera:'Recover your password',
            msmCambio:'You will receive in a moment a link to retrieve your password',
            msmCambiado:'You password has changed',
            aceptar:'Accept',
            enviar:'Send',
            cancel:'Cancel',

        },

        licence: {
            agregar: 'Add Licence',
            editar: 'Edit Licence',
            modalCarga:'The Licence was successfully loaded.',
            modalEdicion:'The Licence was successfully edited.',
            modalCargaError: 'Failed to load license, please try again later',
            modalEdicionError: 'Failed to edit license, please try again later',
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

        }
    }
}

const i18n = createI18n({
    locale:'es',
    messages
})

export default i18n
