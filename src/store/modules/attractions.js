import ApiService from '@/services/ApiService';
import router from '../../router/index';

const state = {
  attractionsGeoJson: [],
  allAttractionsPosts: []
};

const getters = {
  getAttractions: (state) => state.attractionsGeoJson,
  getAllAttractionsPosts: (state) => state.allAttractionsPosts
};

const mutations = {
  mutateFetchAttractions: (state, geojson) => {
    if (state.attractionsGeoJson === []) {
      geojson.forEach(elem => {
        if (elem.type === "node" && (elem.tags.tourism || elem.tags.attraction)) {
          state.attractionsGeoJson.push(elem);
        }
      });
    }
  },

  mutateAttractionsPosts: (state, attractionsPosts) => {
    state.allAttractionsPosts = attractionsPosts;
  }
};

const actions = {
  fetchAttractions ({ commit }, geojson) {
    commit('mutateFetchAttractions', geojson);
  },

  async fetchAttractionsPosts ({ commit }) {
    const response = await ApiService.fetchAllPosts();
    const attractionsPosts = response.data.allPosts;
    commit('mutateAttractionsPosts', attractionsPosts);
  },

  async addAttractionsPost ({ _ }, params) {
    const response = await ApiService.addPost(params);
    if (response.status === 201) {
      router.go();
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
