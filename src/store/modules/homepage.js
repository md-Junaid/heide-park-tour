import ApiService from '@/services/ApiService';
import router from '../../router/index';
import axios from "axios";

const state = {
  headlineObj: {
    id: null,
    headline: ''
  },
  geojson: [],
  toggleFilter: true
};

const getters = {
  getHeadline: (state) => state.headlineObj,
  getGeoJson: (state) => state.geojson,
  getToggleFilter: (state) => state.toggleFilter
};

const mutations = {
  mutateFetchHeadline: (state, headline) => {
    state.headlineObj = headline;
  },

  mutateFetchGeoJson: (state, res) => {
    state.geojson = [];
    res.forEach(elem => {
      if (elem.type === "node" && elem.tags) {
        state.geojson.push(elem);
      }
      // else if (elem.tags.name === "Parkplatz Heide Park Soltau") {
      //   this.geojson.push(elem);
      // }
    });
    state.toggleFilter = false;
  }
};

const actions = {

  // @desc Fetch entire homepage
  // @method GET
  // @access Public
  async fetchHomepage ({ commit }) {
    const response = await ApiService.getHomepage();
    const headline = response.data.headline[0];
    commit('mutateFetchHeadline', headline);
  },

  async setHeadlineText ({ commit }, { id, headline }) {
    const response = await ApiService.setHeadline({ id, headline });
    if (response.data.success === true) {
      router.go();
    }
  },

  // @desc Fetch GeoJson data from OverPass Turbo external API
  // @method GET
  // @access Public
  async fetchGeoJson ({ commit }) {
    await axios.get(
      "https://overpass-api.de/api/interpreter?data=%2F*%0AThis%20is%20an%20example%20Overpass%20query.%0ATry%20it%20out%20by%20pressing%20the%20Run%20button%20above%21%0AYou%20can%20find%20more%20examples%20with%20the%20Load%20tool.%0A*%2F%0A%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A%2F%2F%20gather%20results%0A%28%20%0A%20%20node%5B%22tourism%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22tourism%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22tourism%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22highway%22%3D%22pedestrian%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22highway%22%3D%22pedestrian%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22highway%22%3D%22pedestrian%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22amenity%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22amenity%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22amenity%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22shop%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22shop%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22shop%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22artwork_type%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22artwork_type%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22artwork_type%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22attraction%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22attraction%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22attraction%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22leisure%22%3D%22playground%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22leisure%22%3D%22playground%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22leisure%22%3D%22playground%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%29%3B%0A%2F%2F%20print%20results%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B%2F*fixed%20by%20auto%20repair*%2F"
    )
      .then(response => {
        console.log("Sent req, got res: ", response.data);
        let res = response.data.elements;
        commit('mutateFetchGeoJson', res);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
