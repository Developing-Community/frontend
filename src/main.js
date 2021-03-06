import Vue from 'vue'
import VueRouter from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'
import App from './App.vue'
import Navbar from './components/Navbar.vue'
import RightSidebar from './components/RightSidebar.vue'
import { routes } from './routes';
import { rejects } from 'assert';

//configurations
import { host_url } from './config';

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);


export const store = new Vuex.Store({
  state: {
    navStartPosition: 0,
    hostUrl: host_url,
    jwt: localStorage.getItem('t'),
    endpoints: {
      obtainJWT: host_url + '/api/user/auth/obtain_token/',
      refreshJWT: host_url + '/api/user/auth/refresh_token/',
      verifyJWT: host_url + '/api/user/auth/verify_token/'
    },
    err: null,
    isAuthenticated: false,
  },
  getters: {
    isAuthenticated: state => {
      //TODO: correct this
      return state.isAuthenticated;
    }
  },
  mutations: {
    setAuthentication (state, n) {
        state.isAuthenticated = n
    },
    setNavStartPosition (state, n) {
        state.navStartPosition = n
    },
    updateToken(state, newToken) {
      localStorage.setItem('t', newToken);
      state.isAuthenticated = true;
      state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('t');
      state.isAuthenticated = false;
      state.jwt = null;
    }
  },
  actions: {
    obtainToken({ commit, state }, payload) {
      axios.post(this.state.endpoints.obtainJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token);
          this.commit('setAuthentication', true);
          this.state.err = null;
          return Promise.resolve();
        })
        .catch((error) => {
          this.state.err = error;
          console.log("error in obtaining token");
          console.log(error);
          this.commit('removeToken');
        })
    },
    refreshToken() {
      const payload = {
        token: this.state.jwt
      }
      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
          this.commit('setAuthentication', true);
        })
        .catch((error) => {
          this.commit('removeToken');
          throw(error);
        })
    },
    inspectToken(){
      const token = this.state.jwt;
      if(token){
        const decoded = jwt_decode(token);
        const exp = decoded.exp
        const orig_iat = decode.orig_iat
        if(exp - (Date.now()/1000) < 1800 && (Date.now()/1000) - orig_iat < 628200){
          this.dispatch('refreshToken')
        } else if (exp -(Date.now()/1000) < 1800){
          // DO NOTHING, DO NOT REFRESH          
        } else {
          // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
        }
      }
    }
  }
})

const router = new VueRouter({
  routes,
  mode: 'history',
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   if (to.hash) {
  //     return { selector: to.hash };
  //   }
  //   return {x: 0, y: 0};
  // }
});

router.beforeEach((to, from, next) => {
  console.log(from);
  if(to.name != "logout"){
    const token = localStorage.getItem('t');
    if(!token){
        store.commit('setAuthentication', false);
    }
    else{
        const decoded = jwt_decode(token);
        const exp = decoded.exp
        const orig_iat = decoded.orig_iat


        if(exp - (Date.now()/1000) < 3600 && (Date.now()/1000) - orig_iat < 604800){
          store.commit('setAuthentication', true);
          store.dispatch('refreshToken');
        } else if (exp -(Date.now()/1000) < 3600){
          store.commit('setAuthentication', true);
        } else {
          store.commit('removeToken');
        }

    }
  }
  next();
});

//TODO: for semantic right sidebar to work perfectly, sidebar and navbar and pusher elements should be 
// direct children of body. so I created three instances but this is not good. try to fix it

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

new Vue({
  el: '#navcomponent',
  router,
  store,
  render: h => h(Navbar)
})

new Vue({
  el: '#rightsidebarcomponent',
  router,
  store,
  render: h => h(RightSidebar)
})