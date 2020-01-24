<template>
  <v-carousel
    cycle
    flat
    hide-delimiters
    hide-delimiter-background
    :show-arrows="false"
    interval="5000"
    height="600"
    continuous
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="require(`@/assets/Intro-Page/${item}`)"
    >
      <v-row
        class="fill-height overlay"
        align="center"
        no-gutters
      >
        <v-col cols="12">
          <v-card
            class="pa-2 transparent"
            flat
            tile
          >
            <v-card-title
              class="justify-center headline font-weight-medium"
              :class="$vuetify.breakpoint.xsOnly ? 'caption' : ''"
            >
              <!-- eslint-disable-next-line vue/no-parsing-error -->
              <h1 class="font-weight-regular custom-font">Welcome to Heide Park Tour</h1>
            </v-card-title>
            <v-card-subtitle class="pt-2 font-italic text-center">
              A whole new way of experiencing Heide Park Resort
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-carousel-item>
    <div class="wave"></div>
  </v-carousel>
</template>

<script>
export default {
  name: 'carousel',

  data () {
    return {
      items: ['heide_park1.jpg', 'heide_park2.jpg', 'heide_park3.jpg', 'heide_park4.jpg']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.overlay {
  background-color: rgba(0,0,0,0.4);
  z-index: 10;
}

.wave {
  position: absolute;
  width: 100%;
  height: 75px;
  transform: rotate(180deg);
  bottom: 0;
  margin-bottom: -1px;
  left: 0;
  background: url('../../assets/wave1.svg');
}
</style>
