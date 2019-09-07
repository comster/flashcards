import Vue from 'vue'
import Vuex from 'vuex'
import messages from './modules/messages'
import cards from './modules/cards'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    messages,
    cards
  }
})