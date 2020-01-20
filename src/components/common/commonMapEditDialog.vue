<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600" style="z-index:9;">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Update Information
        </v-card-title>
        <v-card-text class="mt-3">
          <v-icon color="warning">mdi-alert</v-icon><strong class="orange--text">Important!!</strong> Once the information is
          updated, I cannot be reverted back. Please Double check before Saving. After saving the new information is visible to
          public.
        </v-card-text>
        <div class="d-flex align-center mb-5 justify-center">
        <table class="myTableTheme">
          <thead>
            <tr>
            <th>Key</th>
            <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(value, key) in elem.tags"
              :key="key"
            >
              <td>{{ key }}</td>
              <v-text-field
                placeholder="Enter New Value"
                :value="value"
                class="mr-2"
                dark
              ></v-text-field>
            </tr>
          </tbody>
        </table>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey darken-2" text @click="cancel()">Cancel</v-btn>
          <v-btn color="primary darken-1" @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'commonMapEditDialog',

  data () {
    return {
      dialog: false,
      modal: false,
      elem: {}
    }
  },

  computed: {
    ...mapGetters({
      getOpenDialog: 'getOpenDialog',
      getCurrentElement: 'getCurrentElement'
    })
  },

  watch: {
    getOpenDialog: {
      immediate: true,
      handler (value) {
        if (this.getOpenDialog === true) {
          this.dialog = true;
        } else {
          this.dialog = false;
        }
      }
    },
    getCurrentElement: {
      immediate: true,
      handler (value) {
        this.elem = this.getCurrentElement;
      }
    }
  },

  methods: {
    ...mapActions(['toggleCommonDialog']),

    save () {
      this.dialog = false;
      this.toggleCommonDialog({ dialog: false });
    },

    cancel () {
      this.dialog = false;
      this.toggleCommonDialog({ dialog: false });
    },

    editValue () {
      this.modal = true;
    },

    setNewValue () {
      this.modal = false;
    }
  }
}
</script>

<style>
table.myTableTheme {
  border: 1px solid #494949;
  background-color: #494949;
  width: 94%;
  text-align: left;
  border-collapse: collapse;
}
table.myTableTheme td, table.myTableTheme th {
  /* border: 2px solid #494949; */
  /* border-radius: 3px; */
  padding: 10px 5px;
}
table.myTableTheme td:first-child {
  background-color: #494949;
}
table.myTableTheme tbody td {
  font-size: 14px;
  color: #FFFFFF;
  max-width: 47%;
  border: 1px solid #494949;
}
table.myTableTheme td:nth-child(even) {
  background: #8F8F8F;
}
table.myTableTheme thead {
  background: #278AB0;
}
table.myTableTheme thead th {
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  border-left: 2px solid #398AA4;
}
table.myTableTheme thead th:first-child {
  border-left: none;
}
</style>
