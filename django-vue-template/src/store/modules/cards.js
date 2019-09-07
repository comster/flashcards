import cardService from '../../services/cardService'
import Vue from 'vue'

const state = {
  cards: []
}

const getters = {
  cards: state => {
    return state.cards
  }
}

const actions = {
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
    })
  },
  answerCardIncorrect( { commit }, pk) {
    cardService.answerCardCorrect(pk, false)
    .then(card => {
      commit('updateCard', card)
    })
  }
}

const mutations = {
  setCards (state, cards) {
    state.cards = cards
  },
  addCard(state, card) {
    state.cards.push(card)
  },
  deleteCard(state, pk) {
    state.cards = state.cards.filter(obj => obj.pk !== pk)
  },
  updateCard(state, card) {
    var i = state.cards.findIndex(x => x.pk == card.pk);
    Vue.set(state.cards, i, card);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}