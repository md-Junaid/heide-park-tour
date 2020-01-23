<template>
  <div>
    <carousel
      :style="$vuetify.breakpoint.smAndUp ? 'clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 51.5% 95%, 50% 100%, 48.5% 95%, 0 95%);' : ''"
    />
    <welcomeInfo />
    <mainMap />
  </div>
</template>

<script>
import carousel from '@/components/homepage/carousel';
import welcomeInfo from '@/components/homepage/welcomeInfo';
import mainMap from '@/components/homepage/mainMap';

export default {
  name: 'HomePage',

  components: {
    carousel,
    welcomeInfo,
    mainMap
  }
}
</script>
