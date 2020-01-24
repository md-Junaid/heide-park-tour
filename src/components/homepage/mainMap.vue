<template>
  <div>
    <v-sheet v-if="false">
      <v-file-input
        chips
        label="Upload GeoJson Data"
        v-model="file"
        prepend-icon="mdi-paperclip"
        style="max-width:50%"
        append-icon="mdi-file-upload"
        @click:append="uploadGeoJson()"
      ></v-file-input>
    </v-sheet>
    <commonMap
      :zoom="15"
      :navigation="true"
      :waypoint-from-lat="53.6315628"
      :waypoint-from-lon="10.0069021"
      :center-lat="53.0255"
      :center-lon="9.8792"
      :style="$vuetify.breakpoint.mdAndUp ? 'height:500px;' : 'height:350px;'"
      :geo-locations-markers="markers"
    />
  </div>
</template>

<script>
import commonMap from '@/components/common/commonMap.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'mainMap',

  components: {
    commonMap
  },

  data () {
    return {
      file: null,
      markers: []
    }
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getAllMarkers: 'getGeoJson'
    })
  },

  methods: {
    ...mapActions(['fetchGeoJson'])
  },

  watch: {
    getAllMarkers: {
      immediate: true,
      handler (value) {
        if (value.length === 0) {
          this.fetchGeoJson();
        } else {
          this.markers = value;
        }
      }
    }
  }
}
</script>
