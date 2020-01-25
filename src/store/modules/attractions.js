import ApiService from '@/services/ApiService';
import router from '../../router/index';

const state = {
  attractionsGeoJson: [],
  allAttractionsPosts: [],
  attractions: []
};

const getters = {
  getAttractionsMarkers: (state) => state.attractionsGeoJson,
  getAllAttractionsPosts: (state) => state.allAttractionsPosts,
  getAttractions: (state) => state.attractions
};

const mutations = {
  mutateFetchAttractions: (state, attractionsMarkers) => {
    state.attractionsGeoJson = attractionsMarkers;
  },

  mutateAttractionsPosts: (state, { attractionsPosts, dispatch }) => {
    state.allAttractionsPosts = attractionsPosts;
    dispatch('mergeAttractionsObjs');
  },

  attractionsWithFullInfo: (state, attractions) => {
    state.attractions = attractions;
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
    // console.log(response.data.allPosts)
    commit('mutateAttractionsPosts', { attractionsPosts, dispatch });
  },

  async addAttractionsPost ({ dispatch }, params) {
    const response = await ApiService.addPost(params);
    if (response.status === 201) {
      router.go({ name: 'Attractions' });
    }
    // dispatch('fetchAttractionsPosts');
  },

  async editAttractionPost ({ dispatch }, params) {
    const response = await ApiService.editPost(params);
    if (response.status === 201) {
      router.go({ name: 'Attractions' });
    }
  },

  mergeAttractionsObjs ({ commit, getters }) {
    getters.getAttractionsMarkers.forEach(marker => {
      getters.getAllAttractionsPosts.forEach(post => {
        if (marker.id === post.markerId) {
          marker.content = post.content;
          marker.thumbnail = post.thumbnail;
          marker.postId = post._id;
          marker.level = post.level;
        }
      });
    });
    const attractions = getters.getAttractionsMarkers;
    commit('attractionsWithFullInfo', attractions);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
