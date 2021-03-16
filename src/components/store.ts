import {createStore} from 'vuex'


const key = 'token'
const role = 'role'
const store = createStore({
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        role: localStorage.getItem('role') ? localStorage.getItem('role') : ''
    },
    getters: {
        getStorage: function (state) {
            if (!state.token) {
                let tk = localStorage.getItem(key);
                if (tk != null) {
                    state.token = JSON.parse(tk)
                } else state.token = null
            }
            return state.token
        }
    },
    mutations: {
        $_setStorage(state, value) {
            state.token = value;
            localStorage.setItem(key, value)
        },
        $_setStorageRole(state, value) {
            state.role = value;
            localStorage.setItem(role, value)
        },
        $_removeStorage(state) {
            state.token = null;
            localStorage.removeItem(key)
        },
        $_removeStorageRole(state) {
            state.token = null;
            localStorage.removeItem(role)
        }
    },
})

export default store