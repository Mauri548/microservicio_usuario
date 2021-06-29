import { createStore } from "vuex";

const store = createStore({
    state(){
        return {
            isMobile: false
        }
    },

    mutations: {
        onResize(state) {
            window.screen.width < 769 ? state.isMobile = true : state.isMobile = false;
            console.log(state.isMobile)
            // if (window.screen.width < 769) {
            //     state.isMobile = true
            // } else {
            //     state.isMobile = false
            // }
        }
    }
});

export default store;