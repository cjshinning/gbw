import router from '../../router'
import VueCookie from 'vue-cookie';
import {login,logout} from '@/api/api.js';

const state = {
  name: VueCookie.get('username')
  // name: ''
}

// getters
const getters = {
  name: state => state.name,
}

// mutations
const mutations = {
    SET_NAME (state, name) {
      state.name = name
    }
}

// actions
const actions = {
    Login ({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            login(userInfo).then(res => {
                if(res.data.status === 200) {
                    const userdata = res.data.data.username;
                    VueCookie.set('username', userdata,30);
                    commit('SET_NAME', userdata);
                    router.push({path: '/card'});   
                    resolve();
                }else{
                    alert(res.data.msg);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    },
    Logout ({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            logout().then(res=>{
                if(res.data.status === 200){
                    VueCookie.delete('username');
                    router.push({path: '/login'});
                    resolve();
                }else{  
                    alert(res.data.msg);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    }
}

export default {
  state,
  getters,
  actions,
  mutations
}