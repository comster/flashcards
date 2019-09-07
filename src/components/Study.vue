<template>
  <b-container class="bv-example-row study">
    <b-row class="flashcard justify-content-md-center" v-if="card">
      <div class="card-front" v-if="cardSide == 'front'">
        <b-card
          v-bind:title="card.word"
          tag="article"
          class="mb-2 text-center"
        >
          <b-button href="#" variant="primary" @click="showDefinition(card.pk)">Show definition</b-button>
        </b-card>
      </div>
      <div class="card-back" v-if="cardSide == 'back'">
        <b-card v-bind:title="card.word" v-bind:sub-title="card.definition">
          <b-link href="#" class="card-link" @click="answerCardCorrect(card.pk)">I got it</b-link>
          <b-link href="#" class="card-link" @click="answerCardIncorrect(card.pk)">I did not get it</b-link>
        </b-card>
      </div>
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
          this.$bvToast.toast(`Answered correctly and moved to bin ${card.binNum}`, {
            title: card.word,
            autoHideDelay: 10000,
            variant: 'success'
          })
        })
    },
    answerCardIncorrect(pk) {
      this.$store.dispatch('cards/answerCardIncorrect', pk)
        .then((card) => {
          this.$bvToast.toast(`Answered wrong ${card.wrongCount} times`, {
            title: card.word,
            autoHideDelay: 10000,
            variant: 'warning'
          })
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
}
</style>
