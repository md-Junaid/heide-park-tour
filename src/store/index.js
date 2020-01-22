import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import login from './modules/login';
import homepage from './modules/homepage';
import commonSnackBar from './modules/commonSnackBar';
import commonMapEdit from './modules/commonMapEdit';
import attractions from './modules/attractions';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    commonMapEdit,
    homepage,
    commonSnackBar,
    attractions
  },
  plugins: [createPersistedState()]
});
