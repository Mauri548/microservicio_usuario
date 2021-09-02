import {createI18n} from 'vue-i18n'

const messages = {
    
    es:{
        navbarV:{
            personalInfo:'Informacion Personal',
            permisos:'Permisos',
            company:'Empresa',
            userManagement:'Gestion de usuarios',
            companyManagement:'Gestion de empresas',
            appsManagement:'Gestions de apps',


        }
    },
    en:{
        navbarV:{
            personalInfo:'Personal Info',
            permisos:'Permissions',
            company:'Company',
            userManagement:'User management',
            companyManagement:'Company management',
            appsManagement:'Apps management',
        }
       
    }
}

const i18n = createI18n({
    locale:'es',
    messages
})

export default i18n
