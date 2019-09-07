import Vue from 'vue'

export default {
    toastCard(toast, card, is_correct) {
        
        let next_review_at = card.nextReviewAt ? Vue.moment(card.nextReviewAt).fromNow() : 'never'
        
        if(is_correct) {
            toast.toast(`Answered correctly and moved to bin ${card.binNum} for next review ${next_review_at}`, {
              title: card.word,
              autoHideDelay: 10000,
              variant: 'success'
            })
        } else {
            toast.toast(`Answered wrong ${card.wrongCount} times. Next review ${next_review_at}`, {
              title: card.word,
              autoHideDelay: 10000,
              variant: 'warning'
            })

        }
    }
}