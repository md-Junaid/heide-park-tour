<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    top
    :color="snackbarColor"
  >
    {{ msg }}
    <v-btn
      text
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'commonSnackBar',

  data () {
    return {
      timeout: 5000,
      snackbar: false,
      snackbarColor: null,
      msg: null
    }
  },

  computed: {
    ...mapGetters({
      getSnackBarVal: 'getSnackBarVal'
    })
  },

  watch: {
    getSnackBarVal: {
      immediate: true,
      handler (val) {
        this.snackbar = val.snackbar;
        this.msg = val.msg;
        this.snackbarColor = val.snackbarColor;
      }
    },
    snackbar: {
      immediate: true,
      handler (val) {
        if (val === true) {
          var self = this;
          setTimeout(function () {
            self.toggleSnackBar({
              snackbar: false,
              msg: null,
              snackbarColor: null
            });
          }, 5000);
        }
      }
    }
  },

  methods: {
    ...mapActions(['toggleSnackBar'])
  }
}
</script>
