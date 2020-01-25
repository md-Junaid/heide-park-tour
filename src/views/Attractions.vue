<template>
  <div class="mb-5">
    <v-sheet max-width="1200" class="mt-5 elevation-6" style="margin: 0 auto;">
      <h2
        class="text-center font-weight-regular container mt-4 green--text text--darken-2 custom-font"
        :style="$vuetify.breakpoint.smAndDown ? 'font-size: 2.2rem;': 'font-size: 2.8125rem;'"
      >Tourist Attractions</h2>
      <p style="" class="text-center subtitle-1 container text-justify">
        Welcome to Heide Park Tour's Attraction page, here you can get details for each tourist attraction offered by Heide
        Park Resort. Just use our search filters to get the details.
      </p>
      <v-img
        v-if="showAttraction && attraction.thumbnail"
        class="white--text align-end"
        height="400px"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
        :src="attraction.thumbnail"
      >
      </v-img>
      <v-carousel
        v-else
        cycle
        interval="6000"
        height="400"
        continuous
      >
        <v-carousel-item
          v-for="(item,i) in carouselItems"
          :key="i"
          :src="require(`@/assets/attractions/${item}`)"
        >
        <div class="overlay" style="width:100%; height: 100%"></div>
        </v-carousel-item>
      </v-carousel>
      <v-divider v-if="!showAttraction" class="mt-5 hr"></v-divider>
      <v-container class="py-0" v-if="!showAttraction">
        <v-row align="center" class="ma-1 mb-0">
          <v-col class="d-flex" cols="12" sm="6">
            <p class="font-weight-bold mt-2">Experience Level:</p>
            <v-select
              :items="items"
              :key="items.id"
              class="ml-2"
              label="All Tourist Attractions"
              solo
              multiple
              v-model="items.name"
              background-color="green lighten-5"
              autofocus
              dense
              color="green darken-2"
              hint="Filter attractions according to experience level"
              item-text="name"
              item-value="id"
              item-color="green darken-2"
              persistent-hint
              :disabled="disableFilters"
              clearable
              @change="selectedItem"
            ></v-select>
          </v-col>

          <v-col class="d-flex ml-5" cols="12" sm="3">
            <p class="font-weight-bold mt-2">Age:</p>
            <v-select
              :items="ageRanges"
              background-color="green lighten-5"
              class="ml-2"
              label="Age Range"
              solo
              dense
              color="green darken-2"
              item-color="green darken-2"
              persistent-hint
              :disabled="disableFilters"
              hint="See the places where you are not allowed"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
      <div>
        <attractionsDisplay
          :attractions="getAttractions"
          @clicked="displayAttraction"
          v-if="!showAttraction"
        />
        <div v-else class="container">
          <v-row>
            <v-btn v-show="!editAttraction" text color="light-blue light-2 pl-0" @click="goBack()">
              <v-icon>mdi-arrow-left-thick</v-icon> back
            </v-btn>
            <v-spacer></v-spacer>
            <h2 class="light-blue--text text--darken-2 custom-font">{{ attraction.tags.name }}</h2>
            <v-spacer></v-spacer>
            <v-btn v-show="!editAttraction" color="light-blue darken-2 mr-5" dark @click="edit()">Edit</v-btn>
          </v-row>
          <div v-if="editAttraction">
            <attractionEdit
              :selected-item="attraction"
              @cancel="cancelEdit"
            />
          </div>
          <div v-else class="tiptap-vuetify-editor__content" v-html="attraction.content? attraction.content: emptyContent"/>
        </div>
      </div>
      <commonMap
        :zoom="15"
        :geo-locations-markers="showAttraction ? markers : getAttractions"
        :filter-on-map="false"
        :center-lat="53.0250"
        :center-lon="9.8784"
        class="container"
        style="margin: 0 auto;"
        :style="$vuetify.breakpoint.mdAndUp ? 'height:500px;' : 'height:350px;'"
      />
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import commonMap from '@/components/common/commonMap.vue';
import attractionsDisplay from '@/components/attractions/attractionsDisplay';
import attractionEdit from '@/components/attractions/attractionEdit';

export default {
  name: 'Attractions',

  created () {
    this.fetchAttractions(this.getAllMarkers);
    // this.fetchAttractionsPosts();
  },

  data () {
    return {
      items: [],
      markers: [],
      showAttraction: false,
      editAttraction: false,
      disableFilters: true,
      selectedMarker: [],
      carouselItems: ['heide_park1.jpg', 'heide_park2.jpg', 'heide_park3.jpg', 'heide_park4.jpg', 'heide_park5.jpg', 'heide_park6.jpg'],
      ageRanges: ['<10', '<15', '<20', '>20'],
      attraction: {},
      emptyContent: `
        <div class="text-center"><h2>Oops seems like our admins didn't fill in the information ¯\\_(ツ)_/¯</h2>
            <p>We will update the info here asap, in the meantime you can use other features on our website :)</p></div>
      `
    }
  },

  components: {
    commonMap,
    attractionEdit,
    attractionsDisplay
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getAllMarkers: 'getGeoJson',
      getAttractions: 'getAttractions'
    })
  },

  methods: {
    ...mapActions(['fetchAttractions', 'fetchAttractionsPosts']),

    selectedItem (itemId) {
      console.log(itemId);
    },

    displayAttraction (attraction) {
      this.showAttraction = true;
      this.attraction = attraction;
      const currentMarker = [attraction];
      this.markers = currentMarker;
    },

    goBack () {
      this.showAttraction = false;
      this.markers = this.getAttractions;
    },

    edit () {
      this.editAttraction = true;
    },

    cancelEdit () {
      this.editAttraction = false;
    }
  },

  mounted () {
    this.disableFilters = false;
  }
}
</script>
