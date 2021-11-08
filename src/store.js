import { createStore } from "vuex";


const store = createStore({
    state(){
        
        return {
            isMobile: false,
            isTablet: false,
            carga_exitosa: false,
            edicion_exitosa: false,
            cambio_lang: false,
            creating_company: false,
            url_backend: process.env.VUE_APP_URL_BACKEND,
            token: localStorage.getItem('user-token') || '',
            status_error: false,
            user_id: null | localStorage.getItem('user_id'),
            company_id: null | localStorage.getItem('id_company_selected'),
            comes_from_register : false,
            active_menu_movile: false,
        }
    },

    mutations: {
        onResize(state) {
            window.screen.width < 1024 ? state.isMobile = true : state.isMobile = false;
            window.screen.width <= 768 ? state.isTablet = true : state.isTablet = false;
        },

        setToken(state, token) {
            state.token = token
        },

        setCompanyId(state, value) {
            state.company_id = value
        },

        setUserId(state, value) {
            state.user_id = value
        },

        setComesfromRegister(state, value) {
            state.comes_from_register = value
            console.log(state.comes_from_register)
        },

        setCreatingCompany(state,data) {
            console.log(data)
            data ? state.creating_company = true : state.creating_company = false
            // state.creating_company = !state.creating_company
        },

        setStatusError(state,data) {
            state.status_error = data
        },

        setActiveMenuMovile(state) {
            state.active_menu_movile = !state.active_menu_movile
        },

        cambiarLan(state){
              if(state.cambio_lang == false)  {
                    state.cambio_lang = true
              }else{
                    state.cambio_lang = false
              }

              /* console.log(state.cambio_lang) */
        },



        verificar_carga(state,accion){


            // console.log(state.carga_exitosa_ciudad)
            if(accion=='edicionApp'){
                if(state.edicion_exitosa == true){
                    state.edicion_exitosa = false
                    // console.log("llego el emnsaje con exito",state.carga_exitosa_ciudad)
                }else{
                    state.edicion_exitosa = true
                    // console.log("se cargo con exito",state.carga_exitosa_ciudad)
                }
            }

            if(accion=='cargarApp'){
                if(state.carga_exitosa == true){
                    state.carga_exitosa = false
                    // console.log("llego el emnsaje con exito",state.carga_exitosa_ciudad)
                }else{
                    state.carga_exitosa = true
                    // console.log("se cargo con exito",state.carga_exitosa_ciudad)
                }
            }

            if(accion=='edicionCompany'){
                if(state.edicion_exitosa == true){
                    state.edicion_exitosa = false
                    // console.log("llego el emnsaje con exito",state.carga_exitosa_ciudad)
                }else{
                    state.edicion_exitosa = true
                    // console.log("se cargo con exito",state.carga_exitosa_ciudad)
                }
            }

            if(accion=='cargarCompany'){
                if(state.carga_exitosa == true){
                    state.carga_exitosa = false
                    // console.log("llego el emnsaje con exito",state.carga_exitosa_ciudad)
                }else{
                    state.carga_exitosa = true
                    // console.log("se cargo con exito",state.carga_exitosa_ciudad)
                }
            }


            if(accion=='edicionPermission'){
                if(state.edicion_exitosa == true){
                    state.edicion_exitosa = false
                    // console.log("llego el emnsaje con exito",state.carga_exitosa_ciudad)
                }else{
                    state.edicion_exitosa = true
                    // console.log("se cargo con exito",state.carga_exitosa_ciudad)
                }
            }

            if(accion=='cargarPermission'){
                if(state.carga_exitosa == true){
                    state.carga_exitosa = false
                    // console.log("llego el emnsaje con exito",state.carga_exitosa_ciudad)
                }else{
                    state.carga_exitosa = true
                    // console.log("se cargo con exito",state.carga_exitosa_ciudad)
                }
            }

            if(accion=='edicionSus'){
                if(state.edicion_exitosa == true){
                    state.edicion_exitosa = false
                    // console.log("llego el emnsaje con exito",state.carga_exitosa_ciudad)
                }else{
                    state.edicion_exitosa = true
                    // console.log("se cargo con exito",state.carga_exitosa_ciudad)
                }
            }

            if(accion=='cargarSus'){
                if(state.carga_exitosa == true){
                    state.carga_exitosa = false
                    // console.log("llego el emnsaje con exito",state.carga_exitosa_ciudad)
                }else{
                    state.carga_exitosa = true
                    // console.log("se cargo con exito",state.carga_exitosa_ciudad)
                }
            }
        
        }

    
    }
});

export default store;