import {createI18n} from 'vue-i18n'

const messages = {
    
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
            }
        },
        modal:{
            actionsModal:{
                msmPregunta:'¿Desea cancelar esta accion?',
                msmAccion:'Esta accion limpiara el formulario',
                siCancel:'Si,cancelar',
                noCancel:'No,cancelar',
            },
            acciones:'Acciones',
            editar:'Editar',
            eliminar:'Eliminar',
        },
        permisos:{
            agregar:'Agregar Permiso',
            editar:'Editar Permiso',
            cancel:'Cancelar',
            guardar:'Guardar cambios'

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
        },
        app:{
                agregarApp:'Agregar App',     
                editarApp:'Editar App',
                escogeArchivo:'Escoge un archivo',
                guardar:'Guardar',
                cancel:'Cancelar',
        },
        inviteUser:{
            titulo:'¡Solo queda un paso más! invita a los usuarios a tu empresa para que te ayuden a gestionarla.',
            ingresarMail:'Ingrese el correo electrónico de la persona a la que desea invitar.',
            enviar:'Enviar',
            continuar:'Continuar',
            invitar:'Invitar usuario',

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
            }
        },
        modal:{
            actionsModal:{
                msmPregunta:'Do you want to cancel user upload?',
                msmAccion:'this actions will clear the form ',
                siCancel:'Yes,cancel',
                noCancel:'No,cancel',
            },
            acciones:'Actions',
            editar:'Edit',
            eliminar:'Delete',
        },
        permisos:{
            agregar:'Add Permission',
            editar:'Edit Permission',
            cancel:'Cancelar',
            guardar:'Save changes',
                
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
        },
        app:{
            agregarApp:'Add App',     
            editarApp:'Edit App',
            escogeArchivo:'Choose a file',
            guardar:'Save',
            cancel:'Cancel',
        },
        inviteUser:{
            titulo:'There is only one more step left! invite users to your company to help you manage it.',
            ingresarMail:'Enter the email of the person you want to invite.',
            enviar:'Send',
            continuar:'Continue',
            invitar:'Invite user',
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
    }
}

const i18n = createI18n({
    locale:'es',
    messages
})

export default i18n
