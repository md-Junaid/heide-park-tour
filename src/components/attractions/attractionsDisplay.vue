<template>
  <v-row class="mx-4">
    <v-col
      v-for="(attraction, index) in attractions"
      :key="index"
      cols="12"
      sm="6"
      :md="tour ? '2' : '3'"
    >
      <v-skeleton-loader
        class="mx-auto"
        max-width="400"
        type="card"
      >
        <v-card
          class="mx-auto mb-3"
          :max-width="tour ? '200' : '400'"
        >
          <v-img
            class="white--text align-end"
            :height="tour ? '100px' : '200px'"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
            :src="attraction.thumbnail? attraction.thumbnail: alt"
          >
            <v-card-title>{{ attraction.tags.name }}</v-card-title>
          </v-img>

          <!-- <v-card-subtitle class="pb-0">{{ attraction.tags.tourism }}</v-card-subtitle> -->

          <v-card-actions>
            <v-chip v-if="!tour">Level: <span class="light-blue--text text--darken-2">{{ attraction.level }}</span></v-chip>
            <div v-else>
              <span>{{ index + 1 }} </span>
            </div>
            <v-spacer v-if="!tour"></v-spacer>
            <v-btn
              color="green darken-2"
              text
              @click="open(attraction)"
              v-if="!tour"
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
    },
    tour: {
      type: Boolean
    }
  },

  methods: {
    open (attraction) {
      this.$emit('clicked', attraction);
    }
  }
}
</script>
