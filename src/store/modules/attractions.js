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
  mutateFetchAttractions: (state, attractionsMarkers) => {
    state.attractionsGeoJson = attractionsMarkers;
  },

  mutateAttractionsPosts: (state, { attractionsPosts, dispatch }) => {
    state.allAttractionsPosts = attractionsPosts;
    dispatch('mergeAttractionsObjs');
  }
};

const actions = {
  fetchAttractions ({ commit, dispatch }, geojson) {
    const attractionsMarkers = [];
    geojson.forEach(elem => {
      if (elem.type === "node" && (elem.tags.tourism || elem.tags.attraction)) {
        attractionsMarkers.push(elem);
      }
    });
    commit('mutateFetchAttractions', attractionsMarkers);
    dispatch('fetchAttractionsPosts');
  },

  async fetchAttractionsPosts ({ commit, dispatch }) {
    const response = await ApiService.fetchAllPosts();
    const attractionsPosts = response.data.allPosts;
    commit('mutateAttractionsPosts', { attractionsPosts, dispatch });
  },

  async addAttractionsPost ({ _ }, params) {
    const response = await ApiService.addPost(params);
    if (response.status === 201) {
      router.go();
    }
  },

  mergeAttractionsObjs ({ commit, getters }) {
    getters.getAttractions.forEach(marker => {
      getters.getAllAttractionsPosts.forEach(post => {
        if (marker.id === post.markerId) {
          marker.content = post.content;
        }
      });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
