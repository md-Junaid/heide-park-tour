<template>
  <l-map
    :style="$vuetify.breakpoint.mdAndUp ? 'height:500px;' : 'height:350px;'"
    :options="{scrollWheelZoom:false, zoomControl: false}"
    :zoom="zoom"
    :center="center"
    style="z-index: 5;"
    ref="mapElement"
    id="mapid"
  >
    <!-- <l-control-scale position="bottomleft" :imperial="true" :metric="false"></l-control-scale> -->
    <l-control-zoom position="bottomleft"  ></l-control-zoom>
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-geo-json
        v-if="show"
        :geojson="geojson"
      />
    <!-- <RoutingControl from='{[57.74, 11.94]}' to='{[57.6792, 11.949]}' /> -->
    <div v-if="filterdItems.length === 0">
      <l-marker
        v-for="(elem, index) in geojson"
        :key="index"
        :lat-lng="computeLatLng(elem.lat, elem.lon)"
      >
        <l-popup
          v-if="!elem.tags.name"
          class="subtitle-1 text-capitalize"
        >
          <v-row class="justify-space-between align-center">
            <p class="subtitle-1 d-flex text-capitalize font-weight-bold mb-1">
              {{ elem.tags.amenity }}
              {{ elem.tags.tourism }}
            </p>
            <v-btn v-if="getUser.token" x-small color="primary" class="d-flex mt-2" @click.stop="editItem(elem)"><v-icon small>mdi-pencil</v-icon></v-btn>
          </v-row>
        </l-popup>
        <l-popup v-else>
          <v-row class="justify-space-between align-center">
            <p class="subtitle-1 d-flex text-capitalize font-weight-bold mb-1 ml-3">{{ elem.tags.name }}</p>
            <v-btn v-if="getUser.token" x-small color="primary" class="d-flex mr-3 mt-2" @click.stop="editItem(elem)"><v-icon small>mdi-pencil</v-icon></v-btn>
          </v-row>
          <table class="myTableTheme">
            <tbody>
              <tr v-for="(value, key) in elem.tags" :key="key" class="subtitle-2">
                <td class="px-1">{{ key }}</td>
                <td class="px-1">{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </l-popup>
      </l-marker>
    </div>
    <div v-else>
      <l-marker
        v-for="(elem, index) in filteredMarkers"
        :key="index"
        :lat-lng="computeLatLng(elem.lat, elem.lon)"
      >
        <l-popup
          v-if="!elem.tags.name"
          class="subtitle-1 text-capitalize"
        >
          <v-row class="justify-space-between align-center">
            <p class="subtitle-1 d-flex text-capitalize font-weight-bold mb-1 ml-3">
              {{ elem.tags.amenity }}
              {{ elem.tags.tourism }}
            </p>
            <v-btn v-if="getUser.token" x-small color="primary" class="d-flex mr-3 mt-2" @click.stop="editItem(elem)"><v-icon small>mdi-pencil</v-icon></v-btn>
          </v-row>
        </l-popup>
        <l-popup v-else>
          <v-row class="justify-space-between align-center">
            <p class="subtitle-1 d-flex text-capitalize font-weight-bold mb-1 ml-3">{{ elem.tags.name }}</p>
            <v-btn v-if="getUser.token" x-small color="primary" class="d-flex mr-3 mt-2" @click.stop="editItem(elem)"><v-icon small>mdi-pencil</v-icon></v-btn>
          </v-row>
          <table class="myTableTheme">
            <tbody>
              <tr v-for="(value, key) in elem.tags" :key="key" class="subtitle-2">
                <td class="px-1">{{ key }}</td>
                <td class="px-1">{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </l-popup>
      </l-marker>
    </div>
    <l-control position="topleft" >
      <v-combobox
        v-model="filterdItems"
        :items="items"
        chips
        clearable
        label="Apply Filters"
        multiple
        hide-selected
        solo
        :disabled="getToggleFilter"
        style="max-width: 550px;"
      >
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip
            v-bind="attrs"
            :input-value="selected"
            close
            @click="select"
            @click:close="remove(item)"
          >
            <strong>{{ item }}</strong>&nbsp;
          </v-chip>
        </template>
      </v-combobox>
    </l-control>
    <v-skeleton-loader
      type="image"
    ></v-skeleton-loader>
  </l-map>
</template>

<script>
/* eslint-disable no-undef */
import { mapGetters, mapActions } from 'vuex';
import {
  LMap,
  LTileLayer,
  LMarker,
  // LControlScale,
  LGeoJson,
  LPopup,
  LControlZoom,
  LControl
} from 'vue2-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import 'leaflet-control-geocoder';

export default {
  name: 'commonMap',

  mounted () {
    if (this.getGeoJson.length === 0) {
      this.fetchGeoJson();
    }
    if (this.navigation) {
      let mymap = this.$refs.mapElement.mapObject;
      var geocoder = L.Control.Geocoder.nominatim();
      var myRoutingControl = L.Routing.control({
        router: new L.Routing.GraphHopper('2d392f0a-b556-487b-b072-0f54927a2ea7'),
        waypoints: [
          L.latLng(this.waypointFromLat, this.waypointFromLon),
          L.latLng(53.0227112, 9.8707054) // hamburg airpot bus stop Location: 53.6315628, 10.0069021
        ],
        routeWhileDragging: true,
        geocoder: geocoder
      }).on('markgeocode', function (e) {
        var bbox = e.geocode.bbox;
        var poly = L.polygon([
          bbox.getSouthEast(),
          bbox.getNorthEast(),
          bbox.getNorthWest(),
          bbox.getSouthWest()
        ]).addTo(map);
        map.fitBounds(poly.getBounds());
      }).addTo(mymap);
      console.log(mymap)
      var router = myRoutingControl.getRouter();
      router.on('response', function (e) {
        console.log('This routing request consumed ' + e.credits + ' credit(s)');
        console.log('You have ' + e.remaining + ' left');
      });
    }
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LControlScale,
    LGeoJson,
    LPopup,
    LControlZoom,
    LControl
  },

  data () {
    return {
      geojson: [],
      show: true,
      center: L.latLng(53.0252, 9.8762), // geo: 53.0252, 9.8762?z=16
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(53.0252, 9.8762),
      filterdItems: [],
      filteredMarkers: [],
      items: [
        'Roller Coasters',
        'Theaters',
        'Tourist Attractions',
        'Fast Food Restaurants',
        'Drinking Water',
        'Cafe',
        'Doctors',
        'Atm',
        'Toilets',
        'Biergarten Rafting',
        'Shops',
        'Bench',
        'Vending Machines',
        'Car charging Station',
        'Fountain'
      ]
    }
  },

  props: {
    zoom: {
      type: Number,
      default: 16
    },
    waypointFromLat: {
      type: Number,
      default: null
    },
    waypointFromLon: {
      type: Number,
      default: null
    },
    navigation: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getGeoJson: 'getGeoJson',
      getToggleFilter: 'getToggleFilter'
    })
  },

  methods: {
    ...mapActions(['toggleCommonDialog', 'fetchGeoJson']),

    computeLatLng (lat, lon) {
      return L.latLng(lat, lon);
    },

    remove (item) {
      this.filterdItems.splice(this.filterdItems.indexOf(item), 1)
      this.filterdItems = [...this.filterdItems]
    },

    applyFilter (item) {
      switch (item) {
        case "Roller Coasters":
          this.geojson.forEach(elem => {
            if (elem.tags.attraction === "roller_coaster") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Theaters":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "theatre") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Tourist Attractions":
          this.geojson.forEach(elem => {
            if (elem.tags.tourism) {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Fast Food Restaurants":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "fast_food") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Drinking Water":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "drinking_water") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Doctors":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "doctors") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Atm":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "atm") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Toilets":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "toilets") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Biergarten Rafting":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "biergarten") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Shops":
          this.geojson.forEach(elem => {
            if (elem.tags.shop) {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Bench":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "bench") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Vending Machines":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "vending_machine") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Car charging Station":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "charging_station") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Fountain":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "fountain") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Cafe":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "cafe") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        default:
          console.log("Couldn't find place");
      }
    },

    editItem (elem) {
      this.toggleCommonDialog({ dialog: true, elem });
    }
  },

  watch: {
    filterdItems: {
      immediate: true,
      handler (value) {
        this.filteredMarkers = [];
        value.forEach(item => {
          this.applyFilter(item)
        })
      }
    },

    getGeoJson: {
      immediate: true,
      handler (value) {
        this.geojson = this.getGeoJson;
        if (this.getGeoJson.length === 0) {
          this.fetchGeoJson();
        }
      }
    }
  }
}
</script>
<style>
  @import '../../../node_modules/leaflet/dist/leaflet.css';
  @import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
  @import '../../../node_modules/leaflet-control-geocoder/dist/Control.Geocoder.css';
</style>
