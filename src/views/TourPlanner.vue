<template>
  <div class="container">
    <v-sheet max-width="1200" class="my-5 elevation-6" style="margin: 0 auto;">
      <h2
          class="text-center font-weight-regular container mt-4 green--text text--darken-2 custom-font"
          :style="$vuetify.breakpoint.smAndDown ? 'font-size: 2.2rem;': 'font-size: 2.8125rem;'"
        >Tour Packages</h2>
        <p style="" class="text-center subtitle-1 mx-5 text-justify">
          Welcome to Heide Park Tour's Tour packages page, we have three different tour packages based on levels such as
           Relaxed, Moderate and Wild. With our tour packages you will be visting attractions/Rides according to their level, for example
           with relaxed tour package you will be going on rides which are more suitable for children and also suggested for people
           who are afraid of extreme rides like roller costers.
        </p>
        <div class="" style="width: 1000px; margin: auto auto;">
          <span class="title light-blue--text text--darken-2 font-weight-bold">Relaxed Tour Package:</span>
          <p>
            Relaxed tour packge has the most basic rides, one of them is Panoramabahn which is a monorail where you will have the best
            view of the Heide Park Resort. The ride will take you past the front of the park and to a detour in the beautiful
            heather garden. This package is suggested for children, photographers and also for the people who would love to have good view
            of the park.
          </p>
          <span class="font-weight-bold">Attractions you will visit in this package in order:</span>
          <ol>
            <li>
              Starting from Heide park entrance move towards the small lake Move along the small lake to pepa pig land just opposite of
              Frau Mummel's Kiosk, stop there and experience great fun for the little ones in <strong>Peppa Pig Land!</strong>.
            </li>
            <li>
               After that move along lake on the same route and you will see kiosk shop and take right from kiosk shop and keep moving
              on same route you will see Restaurant Capitol and keep moving on the same route and take a right turn from the children's
              park and stop there, you can have a good look of the <strong>statue of liberty</strong>. Heide-Park also celebrated on the very day on
              which the world-famous Statue of Liberty celebrated its 100th birthday in New York: on July 4, 1986, a copy of the
              "Statue of Liberty", faithfully reproduced in every detail, was made in the middle of the Lüneburg Heath inaugurated.
            </li>
            <li>
              After watching the statue we move towards Panoramabahn, just turn around and move in the opposite direction from the
              route you just came. Move on the same route until you see Hide park express and from there move on the same route
              and take left. Just move straight and take first right and you will be at <strong>Panoramabahn</strong> Get onboard in this monorail
              to see a good view of heide park. It will then drop you at the same position where you started.
            </li>
            <li>
              Right after you get down from the Panoramabahn, go on the same route until you see Heide park express and from there
              take right turn and keep moving straight and you will see <strong>Opa pigs zugfahrt</strong> on your left. In the middle
              of the Peppa Pig theme area, Grandpa Pig invites you on a fantastic ride on his small train. The lovingly designed facility
               enables the smallest guests of the park to enjoy an exciting ride with the whole family.
            </li>
            <li>
              Now we move towards Lady Moon Carousel, Move on the same route you came from and just move along the lake. Keep moving
              along the lake until you see <strong>Lady Moon</strong> Carousel on your right. A wonderful white swan, a blue and
              red hot air balloon with gondola and a team of horses with a gold-decorated carriage revolve around the old steam engine
              - simply magical!
            </li>
            <li>
              After Carousel we move towards ToPiLauLa-Schlacht, just go to the opposite direction you came from along the lake
              and from heide park express take a left keep moving straight and take right turn and at your right <strong>ToPiLauLa-Schlacht</strong>.
              A better way to end the tour with pirate themed attraction for you and your family.
            </li>
          </ol>
          <attractionsDisplay
            :attractions="relaxedMarkers"
            :tour="true"
          />
          <commonMap
            :zoom="16"
            :geo-locations-markers="relaxedMarkers"
            :filter-on-map="false"
            :center-lat="53.0250"
            :center-lon="9.8784"
            class="container"
            style="margin: 0 auto;"
            :style="$vuetify.breakpoint.mdAndUp ? 'height:500px;' : 'height:350px;'"
          />
        </div>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import commonMap from '@/components/common/commonMap.vue';
import attractionsDisplay from '@/components/attractions/attractionsDisplay';
// import L from 'leaflet';

export default {
  name: 'TourPlanner',

  components: {
    commonMap,
    attractionsDisplay
  },

  data () {
    return {
      relaxedMarkers: [],
      moderateMarkers: [],
      wildMarkers: []
    }
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getAttractions: 'getAttractions'
    })
  },

  watch: {
    getAttractions: {
      immediate: true,
      handler (value) {
        value.forEach(elem => {
          if (elem.level === "Relaxing") {
            this.relaxedMarkers.push(elem);
          } else if (elem.level === "Moderate") {
            this.moderateMarkers.push(elem);
          } else {
            this.wildMarkers.push(elem);
          }
        })
      }
    }
  }

  // methods: {
  //   from (item) {
  //     this.markers = [];
  //     this.getAttractions.forEach(elem => {
  //       if (elem.tags.name === item) {
  //         console.log(elem)
  //         this.centerLat = elem.geometry.coordinates[1];
  //         this.centerLng = elem.geometry.coordinates[0];
  //         this.markers.push(elem);
  //         this.start = L.latLng(this.centerLat, this.centerLng);
  //       }
  //     })
  //   },

  //   to (item) {
  //     const fromItem = this.markers[0];
  //     this.markers = [];
  //     this.markers.push(fromItem);
  //     this.getAttractions.forEach(elem => {
  //       if (elem.tags.name === item) {
  //         this.markers.push(elem);
  //         this.destination = L.latLng(elem.geometry.coordinates[1], elem.geometry.coordinates[0])
  //       }
  //     });
  //   }
  // }
}
</script>
