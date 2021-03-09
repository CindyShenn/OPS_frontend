import {createStore} from 'vuex'


const key ='token'
const store = createStore({
    state: {
            token:localStorage.getItem('token') ? localStorage.getItem('token'):''
    },
    getters:{
        getSortage:function (state) {
            if(!state.token){
                state.token =JSON.parse(localStorage.getItem(key))
            }
            return state.token
        }
    },
    mutations:{
        $_setStorage(state,value){
            state.token =value;
            localStorage.setItem(key,JSON.stringify(value))
        },
        $_removeStorage(state){
            state.token =null;
            localStorage.removeItem(key)
        }
    },
})

export default store