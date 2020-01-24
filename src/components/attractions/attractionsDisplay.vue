<template>
  <v-row class="mx-4">
    <v-col
      v-for="(attraction, index) in attractions"
      :key="index"
      cols="3"
    >
      <v-card
        class="mx-auto mb-3"
        max-width="400"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
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
            More Info >>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'attractionsDisplay',

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
