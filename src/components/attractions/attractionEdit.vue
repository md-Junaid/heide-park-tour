<template>
  <v-container v-if="show" class="mb-5">
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          label="ID"
          placeholder="Id of the place"
          :value="attraction.id"
          filled
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          label="Experience-Level"
          placeholder="Fill in the experience level for this attraction"
          :value="level"
          hint="Set Experience level to Relaxing, Moderate, or Wild"
          persistent-hint
          outlined
          @change="changeLevel"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" class="pa-0 pb-3">
        <clUpload
          @res="getImgUrl"
          :current-img="attraction.thumbnail"
          class="align" />
      </v-col>
    </v-row>
    <div>
      <tiptap-vuetify v-model="attraction.content" :extensions="extensions" :toolbar-attributes="{ color: 'light-blue darken-2', dark: true }" />
    </div>
    <div class="text-center mt-5">
      <v-btn color="light-grey lighten-5 ma-1" :width="$vuetify.breakpoint.smAndUp ? '250': ''" :large="$vuetify.breakpoint.mdAndUp" @click="cancel()">cancel</v-btn>
      <v-btn v-if="attraction.postId" color="light-blue darken-2 ma-1" :width="$vuetify.breakpoint.smAndUp ? '250': ''" :disabled="disable" :dark="!disable" :large="$vuetify.breakpoint.mdAndUp" @click.once="eidtCurrentPost()">Edit</v-btn>
      <v-btn v-else color="light-blue darken-2 ma-1" :width="$vuetify.breakpoint.smAndUp ? '250': ''" :disabled="disable" :dark="!disable" :large="$vuetify.breakpoint.mdAndUp" @click.once="submit()">Submit</v-btn>
    </div>
    <h3 class="mt-4 primary--text text-center">This is the preview of your post</h3>
    <v-divider/>
    <div class="tiptap-vuetify-editor__content" v-html="attraction.content"/>
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
import clUpload from '@/components/common/clUpload';

export default {
  name: 'attractionEdit',

  components: { TiptapVuetify, clUpload },

  data () {
    return {
      name: 'Nothing selected, if you see this refresh page!',
      attraction: {},
      show: true,
      level: 'Wild',
      thumbnail: null,
      disable: true,
      rules: [
        value => !value || value.size < 1020000 || 'Thumbnail image should be less than or equal to 1 MB!'
      ],
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
      ]
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
          this.attraction = value;
        }

        if (value.thumbnail) {
          this.disable = false;
          this.thumbnail = value.thumbnail;
        }
      }
    }
  },

  methods: {
    ...mapActions(['addAttractionsPost', 'toggleSnackBar', 'editAttractionPost']),

    submit () {
      const params = {
        markerId: this.attraction.id,
        level: this.level,
        thumbnail: this.thumbnail,
        content: this.attraction.content
      };

      var clearToSend = this.checkParams(params);
      if (clearToSend) {
        this.addAttractionsPost(params);
      } else {
        console.log("Please fill everything and submit -_-");
      }
    },

    cancel () {
      this.$emit('cancel');
    },

    changeLevel (item) {
      this.level = item;
      console.log("changed level: ", this.level);
    },

    eidtCurrentPost () {
      const params = {
        markerId: this.attraction.id,
        level: this.level,
        thumbnail: this.thumbnail,
        content: this.attraction.content,
        postId: this.attraction.postId
      };

      var clearToSend = this.checkParams(params);
      if (clearToSend) {
        this.editAttractionPost(params);
      } else {
        console.log("Please fill everything and submit -_-");
      }
    },

    getImgUrl (res) {
      this.thumbnail = res.secure_url;
      this.disable = false;
    },

    checkParams (params) {
      var snackbarObj = {};
      if (!params.content || params.thumbnail === null || params.level === "") {
        snackbarObj.snackbar = true;
        snackbarObj.snackbarColor = "error";
        snackbarObj.msg = "Please fill in all the details & upload thumbnail(compressed).";
        this.toggleSnackBar(snackbarObj);
        return false;
      } else if (params.thumbnail.size > 1020000) {
        snackbarObj.snackbar = true;
        snackbarObj.snackbarColor = "error";
        snackbarObj.msg = "Thumbnail size should be less than 1mb, please compress the image.";
        this.toggleSnackBar(snackbarObj);
        return false;
      } else {
        snackbarObj.snackbar = true;
        snackbarObj.snackbarColor = "primary";
        snackbarObj.msg = "Your Post about this place has been saved successfully.";
        console.log("before submit:", params)
        this.toggleSnackBar(snackbarObj);
        return true;
      }
    }
  }
}
</script>
