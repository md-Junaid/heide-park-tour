<template>
  <v-container v-if="show" class="mb-5">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          label="ID"
          placeholder="Id of the place"
          :value="id"
          filled
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Age Requirement"
          placeholder="Fill age requirement for selected place"
          :value="age"
          hint="If you don't know age range, leave it as >20"
          persistent-hint
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="text-right mt-5">
      <v-btn color="grey darken-2" text :large="$vuetify.breakpoint.mdAndUp">cancel</v-btn>
      <v-btn color="light-blue darken-2" dark :large="$vuetify.breakpoint.mdAndUp" @click="submit()">Submit</v-btn>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'attractionsFilter',

  data () {
    return {
      name: 'Nothing selected, if you see this refresh page!',
      id: null,
      show: true,
      age: '>20',
      // starting editor's content
      content: `
        <h1>Yay Headlines!</h1>
        <p>All these <strong>cool tags</strong> are working now.</p>
      `
    }
  },

  props: {
    selectedItem: {
      type: Object,
      default: null
    }
  },

  watch: {
    selectedItem: {
      immediate: true,
      handler (value) {
        if (value === null) {
          this.show = false;
        } else {
          this.show = true;
          this.id = value.id;
          if (value.tags.name) {
            this.name = value.tags.name;
          } else {
            this.name = value.tags.tourism;
          }
        }
      }
    }
  },

  methods: {
    submit () {
      console.log("This is editor data: ", this.editorData);
    }
  }
}
</script>
