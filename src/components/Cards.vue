<template>
  <b-container class="bv-example-row cards">
    <!--<p>Add and remove flashcards below</p>-->
    <b-row align-h="center">
      <b-col col lg="4">
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
          <input type="hidden" id="wordPk" name="wordPk" v-model="pk">
          <b-button type="submit" variant="primary" @click="addCard({ word: word, definition: definition, pk: pk })" :disabled="!word || !definition"><span v-if="pk">Save</span><span v-else>Add</span> Card</b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-row><hr /></b-row>
    <b-row>
      <!--<p v-if="cards.length === 0">No Cards</p>-->
      <b-col col lg="4" v-for="(card, index) in cards" :key="index">
        <b-card>
          <p class="card-pk">ID#{{card.pk}}</p>
          <p class="card-word">
            Word:
            <b v-text="card.word"></b>
          </p>
          <p class="card-definition">
            Definition:
            <b v-text="card.definition"></b>
          </p>
          <p class="card-binNum">Bin #<span v-html="card.binNum"></span></p>
          <p class="card-nextReviewAt">Next review: 
            <span v-if="card.nextReviewAt" v-bind:title="card.nextReviewAt">{{ card.nextReviewAt | moment("from", true) }}</span>
            <span v-else>None</span>
          </p>
          <p class="card-wrongCount">Times answered incorrect: <span v-html="card.wrongCount"></span></p>
          
          <b-button-group size="sm">
            <b-button variant="success" @click="answerCardCorrect(card.pk)">Right 👍</b-button>
            <b-button variant="warning" @click="answerCardIncorrect(card.pk)">Wrong ❌</b-button>
            <b-button variant="primary" @click="editCard(card)">Edit ✒</b-button>
            <b-button variant="danger" @click="deleteCard(card.pk)">Delete 🗑️</b-button>
          </b-button-group>
          <!--<input type="submit" @click="answerCardCorrect(card.pk)" value="Correct" />-->
          <!--<input type="submit" @click="answerCardIncorrect(card.pk)" value="Incorrect" />-->
          <!--<input type="submit" @click="deleteCard(card.pk)" value="Delete" />-->
        </b-card>
        <br />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Vue from 'vue'
import utils from '@/utils'
import VueMoment from 'vue-moment'
import { FormGroupPlugin, FormPlugin, FormInputPlugin, LayoutPlugin, CardPlugin, ButtonGroupPlugin, ToastPlugin } from 'bootstrap-vue'

Vue.use(VueMoment);
Vue.use(ToastPlugin)
Vue.use(FormInputPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormPlugin)
Vue.use(CardPlugin)
Vue.use(ButtonGroupPlugin)

export default {
  name: "Cards",
  data() {
    return {
      pk: "",
      word: "",
      definition: "",
    };
  },
  computed: mapState({
    cards: state => state.cards.cards
  }),
  methods:
    {
      addCard(values) {
        this.$store.dispatch('cards/addCard', values)
          .then(() => {
            this.word = ""
            this.definition = ""
            this.pk = ""
            let au = values.pk ? 'updated' : 'added'
            this.$bvToast.toast(`Your card was ${au}`, {
              title: values.word,
              autoHideDelay: 5000,
              appendToast: false,
              variant: 'success'
            })
            
            document.getElementById("input-word").focus();
          })
      },
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
      editCard(card) {
        this.pk = card.pk
        this.word = card.word
        this.definition = card.definition
        window.scrollTo(0,0);
      },
      deleteCard(pk) {
        this.$store.dispatch('cards/deleteCard', pk)
          .then(() => {
            this.$bvToast.toast(`Card deleted`, {
              autoHideDelay: 5000,
              variant: 'danger'
            })
          })
      },
    }
    // mapActions('cards', [
    // 'addCard',
    // 'answerCardCorrect',
    // 'answerCardIncorrect',
    // 'deleteCard'
    // ])
  ,
  created() {
    this.$store.dispatch('cards/getCards')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
