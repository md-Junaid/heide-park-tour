const state = {
  attractionsGeoJson: []
};

const getters = {
  getAttractions: (state) => state.attractionsGeoJson
};

const mutations = {
  mutateFetchAttractions: (state, geojson) => {
    geojson.forEach(elem => {
      if (elem.type === "node" && (elem.tags.tourism || elem.tags.attraction)) {
        state.attractionsGeoJson.push(elem);
      }
    });
  }
};

const actions = {
  fetchAttractions ({ commit }, geojson) {
    commit('mutateFetchAttractions', geojson);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
