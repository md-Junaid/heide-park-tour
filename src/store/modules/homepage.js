import ApiService from '@/services/ApiService';

const state = {
  geojson: [],
  toggleFilter: true
};

const getters = {
  getGeoJson: (state) => state.geojson,
  getToggleFilter: (state) => state.toggleFilter
};

const mutations = {
  mutateFetchGeoJson: (state, res) => {
    state.geojson = res;
    state.toggleFilter = false;
  }
};

const actions = {

  // @desc Fetch entire GeoJson markers from database
  // @method GET
  // @access Public
  async fetchGeoJson ({ commit }) {
    const response = await ApiService.getHomepage();
    let res = response.data.markers;
    commit('mutateFetchGeoJson', res);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
