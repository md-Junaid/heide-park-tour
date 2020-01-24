<template>
  <div>
    <carousel
    />
    <welcomeInfo />
    <mainMap />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import carousel from '@/components/homepage/carousel';
import welcomeInfo from '@/components/homepage/welcomeInfo';
import mainMap from '@/components/homepage/mainMap';

export default {
  name: 'HomePage',
  created () {
    this.fetchGeoJson();
  },

  components: {
    carousel,
    welcomeInfo,
    mainMap
  },

  methods: {
    ...mapActions(['fetchGeoJson'])
  }
}
</script>
