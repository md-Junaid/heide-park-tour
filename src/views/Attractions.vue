<template>
  <div>
    <v-sheet max-width="1000" class="mt-5 elevation-6" style="margin: 0 auto;">
      <h2 class="text-center">Attractions</h2>
      <p style="max-width:800px; margin: Auto Auto;" class="text-center">
        Welcome to Heide Park Tour's Attraction page, here you can get details for each tourist attraction offered by Heide
        Park Resort. Just use our search filters to get the details.
      </p>
      <commonMap
        :zoom="16"
        :geo-locations-markers="getAttractions"
        :filter-on-map="false"
        class="mb-5"
        style="margin: 0 auto;"
        :style="$vuetify.breakpoint.mdAndUp ? 'height:500px; width: 800px;' : 'height:350px;'"
      />
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
