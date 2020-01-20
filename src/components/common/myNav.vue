<template>
  <div>
    <v-toolbar
      dense
      dark
      tile
      color="green darken-3"
      height="60"
    >
      <v-toolbar-title>
        <v-btn
          color="transparent"
          depressed
          :to="'/'"
          :ripple="false"
          outlined
        >
          <v-img class="ml-1 pl-1" width="140" :src="require('@/assets/HPTlogo.png')"></v-img>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-app-bar-nav-icon > -->
        <v-menu
          offset-y
          v-if="$vuetify.breakpoint.xsOnly"
          transition="slide-y-transition"
          nudge-bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              dark
              icon
              v-on="on"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="routes in links"
              :key="routes.id"
              :to="`${routes.page}`"
            >
              <v-list-item-title>{{ routes.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      <!-- </v-app-bar-nav-icon> -->

      <v-toolbar-items v-else>
        <v-btn
          v-for="routes in links"
          :key="routes.id"
          text
          class="pa-0 mx-1 .route-style"
          :to="`${routes.page}`"
          :disabled="routes.disable"
        >
          <span
            class="caption custom-font"
          >
            {{routes.text}}
          </span>
        </v-btn>
      </v-toolbar-items>
      <v-menu offset-y v-if="getUser.token">
        <template v-slot:activator="{ on }">
          <v-avatar size="40" class="ml-5" color="blue darken-2" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
        </template>
        <v-list max-width="220">
          <v-list-item>{{ getUser.fullname }}</v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="logout()">
            <v-list-item-avatar><v-icon>mdi-logout</v-icon></v-list-item-avatar>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'myNav',

  data () {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page: '/'
        },
        {
          id: 1,
          text: 'Attractions',
          page: '/posts',
          disable: false
        },
        {
          id: 2,
          text: 'Tour Planner',
          page: '/myTour',
          disable: true
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser'
    })
  },

  methods: {
    ...mapActions(['adminLogout']),
    logout () {
      this.adminLogout();
      this.$router.go();
    }
  }
}
</script>

<style>
.route-style {
  text-decoration: none;
}

.custom-font {
  font-family: 'Permanent Marker', cursive;
}

.my-grad {
  background: #278AB0;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #1C4670, #278AB0);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #1C4670, #278AB0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
