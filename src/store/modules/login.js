import ApiService from '@/services/ApiService';

const state = {
  user: {
    userId: null,
    username: null,
    fullname: null,
    token: null
  },
  loggedIn: false,
  loggedInMsg: "Admin successfully logged in"
};

const getters = {
  getUser: (state) => state.user,
  getLoggedInStatus: (state) => state.loggedIn,
  getLoggedInMsg: (state) => state.loggedInMsg
};

const mutations = {
  mutateToggleLoggedStatus: (state, val) => {
    state.loggedIn = val;
  },
  mutateUpdateToken: (state, currentUser) => {
    state.user = currentUser;
  },
  mutateAdminLogout: (state) => {
    state.username = null;
    state.id = null;
    state.fullname = null;
    state.user.token = null;
  }
};

const actions = {
  async adminLogin ({ commit }, user) {
    const response = await ApiService.login(user);
    if (response.data.code === 403) {
      const res = {
        loggedIn: false,
        type: response.data.type,
        msg: response.data.msg
      };
      return res;
    } else {
      const res = {
        loggedIn: true,
        msg: response.data.msg
      };
      console.log(response.data)
      const currentUser = {
        userId: response.data.id,
        username: user.username,
        token: response.data.token,
        fullname: response.data.fullname
      };
      localStorage.setItem('token', response.data.token);
      commit('mutateUpdateToken', currentUser);
      commit('mutateToggleLoggedStatus', true);
      return res;
    }
  },

  adminLogout ({ commit }) {
    localStorage.removeItem('token');
    commit('mutateAdminLogout');
  },

  toggleLoggedInStatus ({ commit }) {
    commit('mutateToggleLoggedStatus', false);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
