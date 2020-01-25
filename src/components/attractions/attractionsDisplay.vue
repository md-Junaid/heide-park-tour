<template>
  <v-row class="mx-4">
    <v-col
      v-for="(attraction, index) in attractions"
      :key="index"
      cols="12"
      sm="6"
      md="3"
    >
      <v-skeleton-loader
        class="mx-auto"
        max-width="400"
        type="card"
      >
        <v-card
          class="mx-auto mb-3"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
            :src="attraction.thumbnail? attraction.thumbnail: alt"
          >
            <v-card-title>{{ attraction.tags.name }}</v-card-title>
          </v-img>

          <!-- <v-card-subtitle class="pb-0">{{ attraction.tags.tourism }}</v-card-subtitle> -->

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-2"
              text
              @click="open(attraction)"
            >
              <span class="font-weight-bold">More Info </span><v-icon>mdi-arrow-right-thick</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'attractionsDisplay',

  data () {
    return {
      alt: require('@/assets/hpr.jpg')
    }
  },

  props: {
    attractions: {
      type: Array
    }
  },

  methods: {
    open (attraction) {
      this.$emit('clicked', attraction);
    }
  }
}
</script>
