<template>
  <div class="cards">
    <p>Add and remove flashcards below</p>
    <br/>
    <p>Word</p>
    <input type="text" placeholder="ex. apple" v-model="word">
    <p>Definition</p>
    <input type="text" placeholder="ex. the round fruit of a tree of the rose family" v-model="definition">
    <br><br>
    <input 
      type="submit" 
      value="Add" 
      @click="addCard({ word: word, definition: definition })" 
      :disabled="!word || !definition">

    <hr/>
    <h3>Flashcards</h3>
    <p v-if="cards.length === 0">No Cards</p>
    <div class="card" v-for="(card, index) in cards" :key="index">
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
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
