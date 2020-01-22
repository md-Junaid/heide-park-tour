<template>
  <div>
    <v-sheet v-if="getUser.token">
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
    />
  </div>
</template>

<script>
import commonMap from '@/components/common/commonMap.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'mainMap',

  components: {
    commonMap
  },

  data () {
    return {
      file: null
    }
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser'
    })
  },

  methods: {
    uploadGeoJson () {
      console.log("This is the file thats going to upload: ", this.file)
    }
  }
}
</script>
