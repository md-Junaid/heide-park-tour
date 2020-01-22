<template>
  <v-container class="mt-5" style="color: #424242;">
    <v-text-field
      label="Headline"
      v-if="headline"
      placeholder="Enter some headline"
      append-icon="mdi-check"
      v-model="headlineText"
      solo
      @keydown.enter="setHeadline()"
      @click:append="setHeadline()"
    ></v-text-field>
    <h2
      v-else
      class="mt-5 display-1 font-weight-medium text-center green--text text--darken-2"
      :class="$vuetify.breakpoint.xsOnly ? 'title' : ''"
      @click="editHeadline()"
    >
      {{ getHeadline.headline }}
    </h2>
    <div style="width:125px; margin:0 auto;" class="mt-5"><v-divider class="hr green darken-2"/></div>
    <v-card
      class="container mt-5"
      :width="$vuetify.breakpoint.mdAndUp ? '800px' : ''"
      flat
      color="transparent"
    >
      <p>
        This web application is a Master's project for WISUG, our aim is to make users explore the Heide Park Resort beforehand and plan
        their trip accordingly. We provide features that makes it easier for user to see what Heide Park Resort provides without even visiting
        the resort. With our map filters, user can filter out different rides available and also look for directions from one attraction to the
        other. Some of the following places you can see on our map are:
      </p>
      <ul>
        <li>Water Rides</li>
        <li>Attractions</li>
        <li>Theaters</li>
        <li>Shops</li>
        <li>Resort Building</li>
        <li>Restaurants</li>
        <li>Washrooms</li>
        <li>Park platz</li>
      </ul>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'welcomeInfo',

  data () {
    return {
      headlineText: null,
      headline: false
    }
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getHeadline: 'getHeadline'
    })
  },

  watch: {
    getHeadline: {
      immediate: true,
      handler (value) {
        this.headlineText = value.headline;
      }
    }
  },

  methods: {
    ...mapActions(['setHeadlineText']),
    setHeadline () {
      this.setHeadlineText({ id: this.getHeadline._id, headline: this.headlineText });
    },

    editHeadline () {
      if (this.getUser.token) {
        this.headline = true;
      }
    }
  }
}
</script>

<style>
.hr{
  border-top: 5px solid;
  border-radius: 50px;
  max-height: 15px !important;
  height: 5px !important;
}
</style>
