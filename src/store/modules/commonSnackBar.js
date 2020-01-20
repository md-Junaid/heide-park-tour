const state = {
  snackbarVal: {
    snackbar: false,
    snackbarColor: null,
    msg: null
  }
};

const getters = {
  getSnackBarVal: (state) => state.snackbarVal
};

const mutations = {
  MutateToggleSnackBar: (state, params) => {
    state.snackbarVal = params;
  }
};

const actions = {
  toggleSnackBar ({ commit }, params) {
    commit('MutateToggleSnackBar', params);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
