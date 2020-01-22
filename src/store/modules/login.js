import ApiService from '@/services/ApiService';

const state = {
  user: {
    userId: null,
    username: null,
    fullname: null,
    token: null
  }
};

const getters = {
  getUser: (state) => state.user
};

const mutations = {
  mutateUpdateToken: (state, currentUser) => {
    state.user = currentUser;
  },
  mutateAdminLogout: (state) => {
    state.user.username = null;
    state.user.userId = null;
    state.user.fullname = null;
    state.user.token = null;
  }
};

const actions = {
  async adminLogin ({ commit, dispatch }, user) {
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
      const currentUser = {
        userId: response.data.id,
        username: user.username,
        token: response.data.token,
        fullname: response.data.fullname
      };
      localStorage.setItem('token', response.data.token);
      commit('mutateUpdateToken', currentUser);
      const params = {
        snackbar: true,
        snackbarColor: "primary",
        msg: "Admin Logged In Successfully."
      };
      dispatch('toggleSnackBar', params);
      return res;
    }
  },

  adminLogout ({ commit, dispatch }) {
    localStorage.removeItem('token');
    commit('mutateAdminLogout');
    const params = {
      snackbar: true,
      snackbarColor: "success",
      msg: "Admin Logged Out Successfully."
    };
    dispatch('toggleSnackBar', params);
  },

  tokenExpire ({ commit, dispatch }) {
    localStorage.removeItem('token');
    commit('mutateAdminLogout');
    const params = {
      snackbar: true,
      snackbarColor: "error",
      msg: "Admin login time expired, please login again!"
    };
    dispatch('toggleSnackBar', params);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
