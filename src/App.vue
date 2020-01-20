<template>
  <v-app id="app">
    <myNav v-show="showComp"></myNav>
    <router-view id="body-view" />
    <myFooter v-show="showComp" id="footer"/>
  </v-app>
</template>

<script>
import myNav from '@/components/common/myNav';
import myFooter from '@/components/common/myFooter';

export default {
  name: 'App',

  components: {
    myNav,
    myFooter
  },

  computed: {
    showComp () {
      if (this.$route.path === '/admin') {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* background-color: #EAEAE0; */
  background-color: rgba(165, 230, 157, 0.1);
  /* background-size: cover; */
  background-image: url("https://www.transparenttextures.com/patterns/arches.png");
}

html{
  overflow-y: auto;
}

#footer {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 108px;
}

#body-view {
  position: relative;
  padding-bottom: 108px;
}
</style>
