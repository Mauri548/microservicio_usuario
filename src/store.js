import { createStore } from "vuex";

const store = createStore({
    state(){
        return {
            isMobile: false
        }
    },

    mutations: {
        onResize(state) {
            window.screen.width < 1024 ? state.isMobile = true : state.isMobile = false;
        }
    }
});

export default store;