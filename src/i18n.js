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
            }
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
            }
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
            }
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
            }
        },
    }
}

const i18n = createI18n({
    locale:'es',
    messages
})

export default i18n
