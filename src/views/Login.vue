<template>
<v-content>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md6
        lg4
        xl2
      >
        <v-card
          width="500"
          style="border-radius: 15px;"
          class="elevation-8"
        >
          <v-toolbar
            color="green darken-3"
            dark
            flat
          >
            <v-toolbar-title>Admin Login</v-toolbar-title>
          </v-toolbar>
          <v-img class="mx-5 my-2" :src="require('@/assets/login.png')"></v-img>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                label="Username"
                name="login"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
                :error="required"
                type="text"
                :value="username"
                @keydown.enter="submit"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                :type="show1 ? 'text' : 'password'"
                :rules="[rules.required]"
                :error="required"
                @keydown.enter="submit"
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-text-field
                v-model="twoFac"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                label="Two Factor Authentication Code"
                name="code"
                prepend-icon="mdi-two-factor-authentication"
                :rules="[rules.required]"
                :type="show2 ? 'text' : 'password'"
                :error="required"
                @keydown.enter="submit"
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              width="60%"
              rounded
              x-large
              color="light-blue darken-2"
              dark
              class="mb-5"
              @click="submit"
              style="-webkit-box-shadow: 1px 1px 15px 1px rgba(2, 136, 209,0.75);
                      -moz-box-shadow: 1px 1px 15px 1px rgba(2, 136, 209,0.75);
                      box-shadow: 1px 1px 15px 1px rgba(2, 136, 209,0.75);"
            >
              Login
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <commonSnackBar  />
</v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import commonSnackBar from '@/components/common/commonSnackBar';

export default {
  name: 'Login',

  created () {
    if (this.getUser.token) {
      this.$router.push({ name: 'HomePage' });
    }
  },

  components: {
    commonSnackBar
  },

  data () {
    return {
      username: null,
      password: null,
      show1: false,
      show2: false,
      twoFac: null,
      rules: {
        required: value => !!value || 'Required.'
      },
      required: false
    }
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser'
    })
  },

  methods: {
    ...mapActions(['adminLogin', 'toggleSnackBar']),

    async submit () {
      const user = {
        username: this.username,
        password: this.password,
        twoFac: this.twoFac
      };
      if (this.username && this.password && this.twoFac) {
        const res = await this.adminLogin(user);
        if (res.loggedIn) {
          this.$router.push({ name: 'HomePage' });
        } else {
          const params = {
            snackbar: true,
            snackbarColor: "error",
            msg: res.msg
          };
          this.toggleSnackBar(params);
          if (res.type === "2Fac") {
            this.twoFac = null;
          } else {
            this.username = null;
            this.password = null;
            this.twoFac = null;
          }
        }
        this.required = false;
      } else {
        this.required = true;
      }
    }
  }
}
</script>
