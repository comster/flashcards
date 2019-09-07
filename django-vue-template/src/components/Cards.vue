<template>
  <b-container class="bv-example-row cards">
    <!--<p>Add and remove flashcards below</p>-->
    <b-row class="justify-content-md-center">
      <b-col col lg="2"> </b-col>
      <b-col cols="12" md="auto">
        
        <b-card>
          <b-form-group id="input-word" label="Word" label-for="input-word">
            <b-form-input
              id="input-word"
              required
              placeholder="ex. apple"
              v-model="word"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-def" label="Definition" label-for="input-def">
            <b-form-input
              id="input-def"
              required
              placeholder="ex. the round fruit of a tree of the rose family"
              v-model="definition"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" @click="addCard({ word: word, definition: definition })" :disabled="!word || !definition">Add Card</b-button>
        </b-card>
        <!--<input -->
        <!--  type="submit" -->
        <!--  value="Add" -->
        <!--  @click="addCard({ word: word, definition: definition })" -->
        <!--  :disabled="!word || !definition">-->
      </b-col>
      <b-col col lg="2"> </b-col>
    </b-row>
    <b-row><hr /></b-row>
    <b-row>
      <!--<p v-if="cards.length === 0">No Cards</p>-->
      <b-col col lg="3" v-for="(card, index) in cards" :key="index">
        <b-card>
          <p class="card-pk">ID#{{card.pk}}</p>
          <p class="card-word">
            Word:
            <b v-html="card.word"></b>
          </p>
          <p class="card-definition">
            Definition:
            <b v-html="card.definition"></b>
          </p>
          <p class="card-binNum">Bin #<span v-html="card.binNum"></span></p>
          <p class="card-nextReviewAt">Next review: <span v-html="card.nextReviewAt"></span></p>
          <p class="card-wrongCount">Times answered incorrect: <span v-html="card.wrongCount"></span></p>
          
          <input type="submit" @click="answerCardCorrect(card.pk)" value="Correct" />
          <input type="submit" @click="answerCardIncorrect(card.pk)" value="Incorrect" />
          <input type="submit" @click="deleteCard(card.pk)" value="Delete" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Vue from 'vue'
import { FormGroupPlugin, FormPlugin, FormInputPlugin, LayoutPlugin, CardPlugin } from 'bootstrap-vue'
Vue.use(FormInputPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormPlugin)
Vue.use(CardPlugin)

export default {
  name: "Cards",
  data() {
    return {
      pk: 0,
      binNum: 0,
      wrongCount: 0,
      nextReviewAt: null,
      word: "",
      definition: "",
    };
  },
  computed: mapState({
    cards: state => state.cards.cards
  }),
  methods: mapActions('cards', [
    'addCard',
    'answerCardCorrect',
    'answerCardIncorrect',
    'deleteCard'
  ]),
  created() {
    this.$store.dispatch('cards/getCards')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
