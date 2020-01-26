<template>
  <l-map
    :options="{scrollWheelZoom:$vuetify.breakpoint.smAndDown, zoomControl: false}"
    :zoom="zoom"
    :center="center"
    style="z-index: 5;"
    ref="mapElement"
    id="mapid"
  >
    <!-- <l-control-scale position="bottomleft" :imperial="true" :metric="false"></l-control-scale> -->
    <l-control-zoom position="bottomleft"  ></l-control-zoom>
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker
      v-for="(elem, index) in markers"
      :key="index"
      :lat-lng="computeLatLng(elem.geometry.coordinates[1], elem.geometry.coordinates[0])"
    >
      <l-popup>
        <div v-if="getUser.token">
          <div class="subtitle-1 d-flex text-capitalize font-weight-bold green--text text--darken-2 mb-1 ml-3">
            <p>{{ elem.tags.name }}</p>
          </div>
          <v-chip class="mb-2">id: {{ elem.id }}</v-chip>
          <table class="myTableTheme">
            <tbody>
              <tr v-for="(value, key) in elem.tags" :key="key" class="subtitle-2">
                <td class="px-1">{{ key }}</td>
                <td class="px-1">{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="subtitle-1 d-flex text-capitalize font-weight-bold green--text text--darken-2 mb-1 ml-3">
            <p>{{ elem.tags.name }}</p>
          </div>
          <div><v-icon>mdi-human-child</v-icon>: {{ elem.age }}</div>
          <div><v-icon>mdi-wheelchair-accessibility</v-icon>: {{ elem.tags.wheelchair }}</div>
          <div class="mt-4">
            <v-btn text :to="'/attractions'" class="light-blue--text">More info >></v-btn>
          </div>
        </div>
      </l-popup>
    </l-marker>
    <l-control v-if="filterOnMap" position="topleft" >
      <v-combobox
        v-model="filterdItems"
        :items="items"
        chips
        clearable
        label="Apply Filters"
        multiple
        hide-selected
        solo
        dense
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
    <!-- <l-control position="topright">
      <v-btn v-if="$vuetify.breakpoint.mdAndUp" color="success" @click="showContainer">To the Heide park</v-btn>
    </l-control> -->
    <v-skeleton-loader
      type="image"
    ></v-skeleton-loader>
  </l-map>
</template>

<script>
/* eslint-disable no-undef */
import { mapGetters } from 'vuex';
import {
  LMap,
  LTileLayer,
  LMarker,
  // LControlScale,
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
    if (this.navigation) {
      let mymap = this.$refs.mapElement.mapObject;
      var geocoder = L.Control.Geocoder.nominatim();
      var myRoutingControl = L.Routing.control({
        router: new L.Routing.GraphHopper('2d392f0a-b556-487b-b072-0f54927a2ea7'),
        waypoints: [
          this.start,
          this.destination
        ],
        routeWhileDragging: true,
        geocoder: geocoder
      }).addTo(mymap);

      // var controlContainer = myRoutingControl.getContainer();
      // var legendClickArea = document.createElement("DIV");
      // console.log("control: ", controlContainer);
      // legendClickArea.classList.add('legendClickArea');
      // controlContainer.appendChild(legendClickArea);

      // legendClickArea.onclick = function () {
      //   if (this.itineraryShown) { myRoutingControl.show(); } else {
      //     myRoutingControl.hide();
      //   }
      //   this.itineraryShown = !itineraryShown;
      // };
      var router = myRoutingControl.getRouter();
      router.on('response', function (e) {
        // console.log('This routing request consumed ' + e.credits + ' credit(s)');
        // console.log('You have ' + e.remaining + ' left');
      });
    }
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LControlScale,
    LPopup,
    LControlZoom,
    LControl
  },

  data () {
    return {
      show: true,
      markers: [],
      itineraryShown: false,
      start: L.latLng(53.6315628, 10.0069021), // hamburg airpot bus stop Location: 53.6315628, 10.0069021
      destination: L.latLng(53.0227112, 9.8707054),
      center: L.latLng(this.centerLat, this.centerLon), // default geo: 53.0252, 9.8762?z=16
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
    },
    geoLocationsMarkers: {
      type: Array,
      default: null
    },
    filterOnMap: {
      type: Boolean,
      default: true
    },
    centerLat: {
      type: Number,
      default: 53.0252
    },
    centerLon: {
      type: Number,
      default: 9.8762
    }
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getToggleFilter: 'getToggleFilter'
    })
  },

  methods: {
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
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.attraction === "roller_coaster") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Theaters":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "theatre") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Tourist Attractions":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.tourism) {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Fast Food Restaurants":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "fast_food") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Drinking Water":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "drinking_water") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Doctors":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "doctors") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Atm":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "atm") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Toilets":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "toilets") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Biergarten Rafting":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "biergarten") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Shops":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.shop) {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Bench":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "bench") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Vending Machines":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "vending_machine") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Car charging Station":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "charging_station") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Fountain":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "fountain") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Cafe":
          this.geoLocationsMarkers.forEach(elem => {
            if (elem.tags.amenity === "cafe") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        default:
          console.log("Couldn't find place");
      }
    }
  },

  watch: {
    filterdItems: {
      immediate: true,
      handler (value) {
        if (value.length === 0) {
          this.markers = this.geoLocationsMarkers;
        } else {
          console.log("filteredItems: ", value);
          this.filteredMarkers = [];
          value.forEach(item => {
            this.applyFilter(item)
          })
          this.markers = this.filteredMarkers;
        }
      }
    },

    geoLocationsMarkers: {
      immediate: true,
      handler (value) {
        this.markers = value;
      }
    }

    // start: {
    //   immediate: true,
    //   handler (value) {
    //     console.log("change center: ", value.lng)
    //     if ((value.lng === 10.0069021) && (value.lat === 53.6315628)) {
    //       console.log("Do nothing");
    //     } else {
    //       this.center = value;
    //     }
    //   }
    // }
  }
}
</script>
<style>
  @import '../../../node_modules/leaflet/dist/leaflet.css';
  @import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
  @import '../../../node_modules/leaflet-control-geocoder/dist/Control.Geocoder.css';

table.myTableTheme {
  border: 1px solid #0288D1;
  background-color: #0288D1;
  width: 94%;
  text-align: left;
  border-collapse: collapse;
}
table.myTableTheme td, table.myTableTheme th {
  /* border: 2px solid #0288D1; */
  /* border-radius: 3px; */
  padding: 5px 5px;
}
table.myTableTheme td:first-child {
  background-color: #0288D1;
}
table.myTableTheme tbody td {
  font-size: 14px;
  color: #FFFFFF;
  max-width: 47%;
  border: 1px solid #0288D1;
}
table.myTableTheme td:nth-child(even) {
  background: #E1F5FE;
  color: black;
}
table.myTableTheme thead {
  background: #278AB0;
}
table.myTableTheme thead th {
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  border-left: 2px solid #398AA4;
}
table.myTableTheme thead th:first-child {
  border-left: none;
}
.leaflet-control-container .leaflet-routing-container-hide {
    display: none;
}
</style>
