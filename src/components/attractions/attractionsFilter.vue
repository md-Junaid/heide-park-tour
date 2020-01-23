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
    <div>
      <tiptap-vuetify v-model="content" :extensions="extensions" :toolbar-attributes="{ color: 'light-blue darken-2', dark: true }" />
    </div>
    <div class="text-right mt-5">
      <v-btn color="grey darken-2" text :large="$vuetify.breakpoint.mdAndUp">cancel</v-btn>
      <v-btn color="light-blue darken-2" dark :large="$vuetify.breakpoint.mdAndUp" @click="submit()">Submit</v-btn>
    </div>
    <h3 class="mt-4 primary--text text-center">This is the preview of your post above</h3>
    <v-divider/>
    <div class="tiptap-vuetify-editor__content" v-html="content"/>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import {
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image
} from "tiptap-vuetify";

export default {
  name: 'attractionsFilter',

  components: { TiptapVuetify },

  data () {
    return {
      name: 'Nothing selected, if you see this refresh page!',
      id: null,
      show: true,
      age: '>20',
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem, // if you need to use a list (BulletList, OrderedList)
        BulletList,
        OrderedList,
        Image,
        [
          Heading,
          {
          // Options that fall into the tiptap's extension
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak // line break on Shift + Ctrl + Enter
      ],
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
          if (value.content) {
            this.content = value.content;
          } else {
            this.content = `
              <h1>Yay Headlines!</h1>
              <p>All these <strong>cool tags</strong> are working now.</p>
            `;
          }
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
    ...mapActions(['addAttractionsPost']),

    submit () {
      const params = {
        marker_id: this.id,
        age: this.age,
        content: this.content
      };
      this.addAttractionsPost(params);
    }
  }
}
</script>
