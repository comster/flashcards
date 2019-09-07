<template>
  <div class="study">
    <div class="flashcard" v-if="card">
      <p class="card-number">ID#{{card.pk}}</p>
      <p class="card-word">
        Word:
        <b v-html="card.word"></b>
      </p>
      <p class="card-definition">
        Definition:
        <b v-html="card.definition"></b>
      </p>
      <input type="submit" @click="answerCardCorrect(card.pk)" value="Correct" />
      <input type="submit" @click="answerCardIncorrect(card.pk)" value="Incorrect" />
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
    done: state => state.cards.done,
    cards: state => state.cards.cards,
    card: state => state.cards.card,
  }),
  methods: mapActions('cards', [
    'answerCardCorrect',
    'answerCardIncorrect',
  ]),
  created() {
    this.$store.dispatch('cards/getCard')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
