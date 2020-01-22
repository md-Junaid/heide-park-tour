<template>
  <div>
    <v-sheet max-width="1000" class="mt-5 elevation-6" style="margin: 0 auto;">
      <v-container>
        <h2 class="text-center">Attractions</h2>
        <p style="max-width:800px; margin: Auto Auto;" class="text-center">
          Welcome to Heide Park Tour's Attraction page, here you can get details for each tourist attraction offered by Heide
          Park Resort. Just use our search filters to get the details.
        </p>
        <v-row align="center" class="ma-5">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="items"
              label="Outlined style"
              outlined
            ></v-select>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="items"
              label="Solo field"
              solo
            ></v-select>
          </v-col>
        </v-row>
        <commonMap
          :zoom="15"
          :geo-locations-markers="getAttractions"
          :filter-on-map="false"
          :center-lat="53.0250"
          :center-lon="9.8784"
          class="mb-5"
          style="margin: 0 auto;"
          :style="$vuetify.breakpoint.mdAndUp ? 'height:500px; width: 800px;' : 'height:350px;'"
        />
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import commonMap from '@/components/common/commonMap.vue';

export default {
  name: 'Attractions',

  created () {
    this.fetchAttractions(this.getGeoJson);
  },

  data () {
    return {
      items: ['Foo', 'Bar', 'Fizz', 'Buzz']
    }
  },

  components: {
    commonMap
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getGeoJson: 'getGeoJson',
      getAttractions: 'getAttractions'
    })
  },

  methods: {
    ...mapActions(['fetchAttractions'])
  }
}
</script>
