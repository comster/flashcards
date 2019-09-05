<template>
  <div class="cards">
    <p>Add and remove flashcards below</p>
    <br/>
    <p>Word</p>
    <input type="text" placeholder="ex. apple" v-model="subject">
    <p>Definition</p>
    <input type="text" placeholder="ex. the round fruit of a tree of the rose family" v-model="msgBody">
    <br><br>
    <input 
      type="submit" 
      value="Add" 
      @click="addMessage({ subject: subject, body: msgBody })" 
      :disabled="!subject || !msgBody">

    <hr/>
    <h3>Flashcards</h3>
    <p v-if="cards.length === 0">No Cards</p>
    <div class="msg" v-for="(msg, index) in cards" :key="index">
        <p class="card-number">#{{index+1}}</p>
        <p class="card-word">
          Word:
          <b v-html="msg.subject"></b>
        </p>
        <p class="msg-body">
          Definition:
          <b v-html="msg.body"></b>
        </p>
        <input type="submit" @click="deleteMessage(msg.pk)" value="Delete" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "Cards",
  data() {
    return {
      subject: "",
      msgBody: "",
    };
  },
  computed: mapState({
    cards: state => state.cards.cards
  }),
  methods: mapActions('cards', [
    'addCard',
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
