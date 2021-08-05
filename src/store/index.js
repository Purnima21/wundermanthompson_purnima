import Vue from 'vue'
import Vuex from 'vuex'

// Modulos
import User from "../modules/User";

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        User,
    }
})
