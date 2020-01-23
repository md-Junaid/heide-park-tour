<template>
  <v-container class="mt-5" style="color: #424242;">
    <h2
      class="mt-5 display-1 font-weight-medium text-center green--text text--darken-2"
      :class="$vuetify.breakpoint.xsOnly ? 'title' : ''"
    >
      We help you plan your trip to Heide Park Resort
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
export default {
  name: 'welcomeInfo'
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
