<template>
  <div>
    <v-sheet max-width="1000" class="mt-5 elevation-6" style="margin: 0 auto;">
      <v-container>
        <h2 class="text-center font-weight-regular mt-4 green--text text--darken-2 custom-font" style="font-size:2.8125rem;">Tourist Attractions</h2>
        <p style="" class="ma-5 text-center subtitle-1 text-justify">
          Welcome to Heide Park Tour's Attraction page, here you can get details for each tourist attraction offered by Heide
          Park Resort. Just use our search filters to get the details.
        </p>
        <v-container>
          <v-row align="center" class="ma-1">
            <v-col class="d-flex" cols="12" sm="6">
              <p class="font-weight-bold mt-2">Choose a place:</p>
              <v-select
                :items="items"
                :key="items.id"
                class="ml-2"
                label="All Tourist Attractions"
                solo
                v-model="items.name"
                background-color="green lighten-5"
                autofocus
                dense
                color="green darken-2"
                hint="Select any place to know more about them"
                item-text="name"
                item-value="id"
                item-color="green darken-2"
                persistent-hint
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
                hint="See the places where you are not allowed"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <attractionsFilter
          v-if="getUser.token"
          :selected-item="selectedMarker[0]"
        />
        <div v-else class="container">
          <div class="tiptap-vuetify-editor__content" v-html="content"/>
        </div>
        <commonMap
          :zoom="15"
          :geo-locations-markers="markers"
          :filter-on-map="false"
          :center-lat="53.0250"
          :center-lon="9.8784"
          class="mb-5 container"
          style="margin: 0 auto;"
          :style="$vuetify.breakpoint.mdAndUp ? 'height:500px;' : 'height:350px;'"
        />
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import commonMap from '@/components/common/commonMap.vue';
import attractionsFilter from '@/components/attractions/attractionsFilter';

export default {
  name: 'Attractions',

  created () {
    this.fetchAttractions(this.getGeoJson);
    this.fetchAttractionsPosts();
  },

  data () {
    return {
      // currentSelected: {
      //   id: 306152172,
      //   name: "Panoramabahn"
      // },
      items: [],
      markers: [],
      selectedMarker: [],
      hideContent: false,
      ageRanges: ['<10', '<15', '<20', '>20'],
      content: `
        <h1>PLACE NAME COMES HERE</h1>
        <p>This is what will be visible to <strong>users</strong>. To add new info login</p>
      `
    }
  },

  components: {
    commonMap,
    attractionsFilter
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getGeoJson: 'getGeoJson',
      getAttractions: 'getAttractions',
      getAllAttractionsPosts: 'getAllAttractionsPosts'
    })
  },

  watch: {
    selectedMarker: {
      immediate: true,
      handler (value) {
        if (value.length === 0) {
          this.markers = this.getAttractions;
          this.content = `
            <h1>PLACE NAME COMES HERE</h1>
            <p>This is what will be visible to <strong>users</strong>. To add new info login</p>
          `
        } else {
          this.markers = value;
        }
      }
    }
  },

  methods: {
    ...mapActions(['fetchAttractions', 'fetchAttractionsPosts']),

    selectedItem (itemId) {
      this.selectedMarker = [];
      this.content = `
            <h1>PLACE NAME COMES HERE</h1>
            <p>This is what will be visible to <strong>users</strong>. To add new info login</p>
          `
      if (itemId) {
        this.showContent(itemId);
        this.getAttractions.forEach(elem => {
          if (elem.id === itemId) {
            this.selectedMarker.push(elem);
          }
        });
        this.selectedMarker[0].content = this.content;
      }
    },

    showContent (itemId) {
      this.getAllAttractionsPosts.forEach(elem => {
        if (elem.markerId === itemId) {
          this.content = elem.content;
        }
      });
    }
  },

  mounted () {
    this.markers = this.getAttractions;
    this.getAttractions.forEach(elem => {
      if (elem.tags.name) {
        const params = {
          id: elem.id,
          name: elem.tags.name
        }
        this.items.push(params);
      } else {
        const params = {
          id: elem.id,
          name: elem.tags.tourism
        }
        this.items.push(params);
      }
    });
  }
}
</script>
