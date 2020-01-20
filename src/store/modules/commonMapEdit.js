const state = {
  openDialog: false,
  currentElement: {}
};

const getters = {
  getOpenDialog: (state) => state.openDialog,
  getCurrentElement: (state) => state.currentElement
};

const mutations = {
  MutateCommonDialog: (state, dialog) => {
    state.openDialog = dialog;
  },

  MutateEditElement: (state, elem) => {
    state.currentElement = elem;
  }
};

const actions = {
  toggleCommonDialog ({ commit }, { dialog, elem }) {
    commit('MutateCommonDialog', dialog);
    if (elem) {
      commit('MutateEditElement', elem);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
