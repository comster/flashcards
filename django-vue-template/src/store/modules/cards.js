import cardService from '../../services/cardService'
import Vue from 'vue'

const state = {
  cards: [],
  card: {},
  done: null
}

const getters = {
  cards: state => {
    return state.cards
  },
  // done: state => {
  //   return state.done
  // }
}

const actions = {
  getCard ({ commit }) {
    // Get the next card to show to the student for review
    cardService.fetchCards()
    .then(cards => {
      commit('setCards', cards)
      commit('setCard', cards)
    })
  },
  getCards ({ commit }) {
    cardService.fetchCards()
    .then(cards => {
      commit('setCards', cards)
    })
  },
  addCard({ commit }, card) {
    cardService.postCard(card)
    .then((card) => {
      commit('addCard', card)
    })
  },
  deleteCard( { commit }, pk) {
    cardService.deleteCard(pk)
    commit('deleteCard', pk)
  },
  answerCardCorrect( { commit }, pk) {
    cardService.answerCardCorrect(pk, true)
    .then(card => {
      commit('updateCard', card)
      commit('setCard', state.cards)
    })
  },
  answerCardIncorrect( { commit }, pk) {
    cardService.answerCardCorrect(pk, false)
    .then(card => {
      commit('updateCard', card)
      commit('setCard', state.cards)
    })
  }
}

const mutations = {
  setCards (state, cards) {
    state.cards = cards
  },
  setCard (state, cards) {
    // state.cards = cards
    
    // Find the next card to show the student
      
      // TODO move this server side?
      
      // Logic
      // - `Cards` where `nextReviewAt` is less than now(), sorted by `binNum` asc
      // - If result length is 0:
      //     - `Cards` where `binNum` == 0
      // - If result length is 0:
      //     - If count of `Cards` where `nextReviewAt` != `null` is 0:
      //         - display message ~ "perm done"
      //     - Else:
      //         - display message ~ "temp done"
      
      state.done = false
      
      console.log("CARD STATE", cards.length, state)
      cards = cards.filter(obj => obj.binNum !== -1)
      cards.sort(function(a, b) {
        return a.binNum < b.binNum ? -1 : 1;
      });
      
      let cardsToReview = 0
      for(var c in cards) {
        let card = cards[c]
        // console.log(card)
        
        if(card.nextReviewAt) {
          cardsToReview++
          if(new Date(card.nextReviewAt) < new Date()) {
            state.card = card
            state.done = ""
            return
          }
        }
      }
      
      let binZeroCards = cards.filter(obj => obj.binNum === 0)
      
      if(binZeroCards.length > 0) {
        state.card = binZeroCards[0]
      } else if(cardsToReview !== 0) {
        console.log('TEMP DONE')
        state.card = null
        state.done = "temp"
        Vue.set(state, 'done', "temp");
      } else {
        console.log('COMPLETELY DONE')
        state.done = "complete"
        state.card = null
        Vue.set(state, 'done', "complete");
      }
      // console.log(cards, cards[0])
      // return false
    
  },
  addCard(state, card) {
    state.cards.push(card)
  },
  deleteCard(state, pk) {
    state.cards = state.cards.filter(obj => obj.pk !== pk)
  },
  updateCard(state, card) {
    var i = state.cards.findIndex(x => x.pk == card.pk);
    Vue.set(state.cards, i, card); // notify vue of change to render
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}