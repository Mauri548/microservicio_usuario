import { createStore } from "vuex";

const store = createStore({
    state(){
        return {
            isMobile: false,
            carga_exitosa: false,
            edicion_exitosa: false,
            cambio_lang: false,
        }
    },

    mutations: {
        onResize(state) {
            window.screen.width < 1024 ? state.isMobile = true : state.isMobile = false;
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
        
        }

    
    }
});

export default store;