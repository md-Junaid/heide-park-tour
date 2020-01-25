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
      if (elem.tags.tourism || elem.tags.attraction) {
        if ((elem.tags.tourism === 'viewpoint') ||
            (elem.tags.tourism === 'hotel') ||
            (elem.tags.tourism === 'hostel') ||
            (elem.tags.tourism === 'picnic_site') ||
            (elem.tags.tourism === 'information')) {
          return;
        }
        attractionsMarkers.push(elem);
      }
    });
    commit('mutateFetchAttractions', attractionsMarkers);
    dispatch('fetchAttractionsPosts');
  },

  async fetchAttractionsPosts ({ commit, dispatch }) {
    const response = await ApiService.fetchAllPosts();
    const attractionsPosts = response.data.allPosts;
    console.log(response.data.allPosts)
    commit('mutateAttractionsPosts', { attractionsPosts, dispatch });
  },

  async addAttractionsPost ({ dispatch }, params) {
    const response = await ApiService.addPost(params);
    if (response.status === 201) {
      router.go({ name: 'Attractions' });
      // dispatch('fetchAttractionsPosts');
    }
  },

  mergeAttractionsObjs ({ commit, getters }) {
    getters.getAttractions.forEach(marker => {
      getters.getAllAttractionsPosts.forEach(post => {
        if (marker.id === post.markerId) {
          marker.content = post.content;
          marker.thumbnail = post.thumbnail;
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
