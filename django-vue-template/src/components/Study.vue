<template>
  <div class="study">
    <div class="flashcard" v-if="card">
      <!--<p class="card-number">ID#{{card.pk}}</p>-->
      <div class="card-front" v-if="cardSide == 'front'">
        <p class="card-word">
          <h1 v-html="card.word"></h1>
        </p>
        <button @click="showDefinition(card.pk)">Show definition</button>
      </div>
      <div class="card-back" v-if="cardSide == 'back'">
        <p class="card-definition">
          Definition:
          <b v-html="card.definition"></b>
        </p>
        <input type="submit" @click="answerCardCorrect(card.pk)" value="I got it" />
        <input type="submit" @click="answerCardIncorrect(card.pk)" value="I did not get it" />
      </div>
    </div>
    <div v-if="done == 'temp'">
      <p>You are temporarily done; please come back later to review more words.</p>
    </div>
    <div v-if="done == 'complete'">
      <p>You have no more words to review; you are permanently done!</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
