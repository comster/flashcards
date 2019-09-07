import api from '@/services/api'

export default {
  fetchCards() {
    return api.get(`cards/`)
              .then(response => response.data)
  },
  postCard(payload) {
    return api.post(`cards/`, payload)
              .then(response => response.data)
  },
  deleteCard(pk) {
    return api.delete(`cards/${pk}`)
              .then(response => response.data)
  },
  putCard(card) {
    return api.put(`cards/${card.pk}/`, card)
              .then(response => response.data)
  },
  answerCardCorrect(pk, isCorrect) {
    return api.put(`cards/${pk}/answer/`, {is_correct: isCorrect})
              .then(response => response.data)
  }
}