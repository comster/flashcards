<template>
  <b-container class="bv-example-row study">
  <!--<div class="study">-->
    <!--<div class="flashcard" v-if="card">-->
    <b-row class="flashcard justify-content-md-center" v-if="card">
      <!--<p class="card-number">ID#{{card.pk}}</p>-->
      <div class="card-front" v-if="cardSide == 'front'">
        
        <b-card
          v-bind:title="card.word"
          tag="article"
          class="mb-2 text-center"
        >
          <b-button href="#" variant="primary" @click="showDefinition(card.pk)">Show definition</b-button>
        </b-card>
        
        <!--<p class="card-word">-->
        <!--  <h1 v-html="card.word"></h1>-->
        <!--</p>-->
        <!--<button @click="showDefinition(card.pk)">Show definition</button>-->
      </div>
      <div class="card-back" v-if="cardSide == 'back'">
        
        <b-card v-bind:title="card.word" v-bind:sub-title="card.definition">
          <b-link href="#" class="card-link" @click="answerCardCorrect(card.pk)">I got it</b-link>
          <b-link href="#" class="card-link" @click="answerCardIncorrect(card.pk)">I did not get it</b-link>
        </b-card>
        
        <!--<p class="card-definition">-->
        <!--  Definition:-->
        <!--  <b v-html="card.definition"></b>-->
        <!--</p>-->
        <!--<input type="submit" @click="answerCardCorrect(card.pk)" value="I got it" />-->
        <!--<input type="submit" @click="answerCardIncorrect(card.pk)" value="I did not get it" />-->
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
  methods: mapActions('cards', [
    'answerCardCorrect',
    'answerCardIncorrect',
    'showDefinition',
  ]),
  // props: {
    
  // },
  created() {
    this.$store.dispatch('cards/getCard')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
