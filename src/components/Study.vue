<template>
  <b-container class="bv-example-row study">
    <b-row class="flashcard justify-content-md-center" v-if="card">
      
      <b-col col lg="3" sm="1"> </b-col>
      <b-col col lg="6">
        <div class="card-flip">
  				<div :class="cardSide == 'front' ? '' : 'flip'">
            <div class="front">
              <b-card
                v-bind:title="card.word"
                tag="article"
                class="mb-2 text-center"
              >
                <br />
                <br />
                <br />
                <b-button href="#" variant="primary" @click="showDefinition(card.pk)">Show definition</b-button>
              </b-card>
            </div>
          <!--  </b-row>-->
          <!--<b-row align-v="end">-->
            <div class="back">
              <b-card v-bind:title="card.word" v-bind:sub-title="card.definition">
                <br />
                <br />
                <br />
                <b-link href="#" class="card-link" @click="answerCardCorrect(card.pk)">I got it</b-link>
                <b-link href="#" class="card-link" @click="answerCardIncorrect(card.pk)">I did not get it</b-link>
              </b-card>
            </div>
          </div>
        </div>
      </b-col>
      <b-col col lg="3" sm="1"> </b-col>
      
    </b-row>
    <div v-if="done == 'temp'">
      <p>You are temporarily done; please come back later to review more words.</p>
    </div>
    <div v-if="done == 'complete'">
      <p>You have no more words to review; you are permanently done!</p>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import utils from '@/utils'
import { ToastPlugin, ButtonPlugin, FormGroupPlugin, FormPlugin, FormInputPlugin, LayoutPlugin, CardPlugin } from 'bootstrap-vue'

Vue.use(ToastPlugin)
Vue.use(ButtonPlugin)
Vue.use(FormInputPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormPlugin)
Vue.use(CardPlugin)

export default {
  name: 'Study',
  // data() {
  //   return {
  //     cardSide: 'front'
  //   };
  // },
  computed: mapState({
    done: state => state.cards.done,
    cards: state => state.cards.cards,
    card: state => state.cards.card,
    cardSide: state => state.cards.cardSide,
  }),
  methods: {
    answerCardCorrect(pk) {
      this.$store.dispatch('cards/answerCardCorrect', pk)
      .then((card) => {
          utils.toastCard(this.$bvToast, card, true)
        })
    },
    answerCardIncorrect(pk) {
      this.$store.dispatch('cards/answerCardIncorrect', pk)
        .then((card) => {
          utils.toastCard(this.$bvToast, card, false)
        })
    },
    showDefinition(pk) {
      this.$store.dispatch('cards/showDefinition', pk)
    }
  },
  // methods: mapActions('cards', [
  //   'answerCardCorrect',
  //   'answerCardIncorrect',
  //   'showDefinition',
  // ]),
  created() {
    this.$store.dispatch('cards/getCard')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-body {
  background: #EEEEEE;
  /*min-width: 400px;*/
  min-height: 200px;
}


.card-flip {
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.card-flip .flip, .card-flip.hover .flip {
  -webkit-transform: rotateY(180deg);
          transform: rotateY(180deg);
}

.card-flip,
.front,
.back {
  width: 100%;
  /*height: 480px;*/
}

.flip {
  transition: 0.6s;
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
  position: relative;
}

.front,
.back {
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.front {
  z-index: 2;
  -webkit-transform: rotateY(0deg);
          transform: rotateY(0deg);
}

.back {
  -webkit-transform: rotateY(180deg);
          transform: rotateY(180deg);
}

</style>
