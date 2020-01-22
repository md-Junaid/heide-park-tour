<template>
  <div>
    <carousel
      :style="$vuetify.breakpoint.smAndUp ? 'clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 51.5% 95%, 50% 100%, 48.5% 95%, 0 95%);' : ''"
    />
    <welcomeInfo />
    <commonMapEditDialog />
    <mainMap />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import carousel from '@/components/homepage/carousel';
import welcomeInfo from '@/components/homepage/welcomeInfo';
import mainMap from '@/components/homepage/mainMap';
import commonMapEditDialog from '@/components/common/commonMapEditDialog';

export default {
  name: 'HomePage',

  created () {
    this.fetchHomepage();
  },

  components: {
    carousel,
    welcomeInfo,
    mainMap,
    commonMapEditDialog
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser'
    })
  },

  methods: {
    ...mapActions(['fetchHomepage'])
  }
}
</script>
