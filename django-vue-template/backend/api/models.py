from django.db import models
from rest_framework import serializers
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

"""
Flash cards
-----------

Query next card:

- `Cards` where `nextReviewAt` is less than now(), sorted by `binNum` asc
- If result length is 0:
    - `Cards` where `binNum` == 0
- If result length is 0:
    - If count of `Cards` where `nextReviewAt` != `null` is 0:
        - display message ~ "perm done"
    - Else:
        - display message ~ "temp done"


Saving card flash:

- Right:
    - inc card.binNum
    - If card.binNum < 11:
        - set card.nextReviewAt timestamp based on card.binNum associated timespan + now
    - Else: 
        - unset card.nextReviewAt timestamp
- Wrong: 
    - inc card.wrongCount
    - If card.wrongCount >= 10:
        - set card.binNum to -1
        - unset card.nextReviewAt timestamp
    - Else:
        - set card.binNum to 1
        - set card.nextReviewAt timestamp based on card.binNum associated timespan + now

"""

# Corresponding wait times for each bin
def getBinWait(n):

    if(n > 10 or n < 1):
        raise ValueError('Only bins 1-10 are expected to have a wait time!')

    if n == 1:
        return timedelta(seconds=5)
    if n == 2:
        return timedelta(seconds=25)
    if n == 3:
        return timedelta(minutes=2)
    if n == 4:
        return timedelta(minutes=10)
    if n == 5:
        return timedelta(hours=1)
    if n == 6:
        return timedelta(hours=5)
    if n == 7:
        return timedelta(days=1)
    if n == 8:
        return timedelta(days=5)
    if n == 9:
        return timedelta(days=25)
    if n == 10:
        return relativedelta(months=+4)

# Card model
class Card(models.Model):
    # Front of card
    word = models.CharField(max_length=200)
    
    # Back of card
    definition = models.TextField()
    
    # Bin number
    binNum = models.IntegerField(default=0, blank=False)
    
    # Number of times this card was answered wrong
    wrongCount = models.IntegerField(default=0, blank=True)
    
    # Next time able to review this card
    nextReviewAt = models.DateTimeField(default=None, null=True, blank=True)

    def getBinWaitUntil(self):
        return datetime.now() + getBinWait(self.binNum)
        
    # Mutation on card data when a user answers correctly
    def answeredCorrect(self):
        
        # Increment the bin number
        self.binNum = self.binNum + 1
        
        if self.binNum < 11:
            # Set the next possible review time
            self.nextReviewAt = self.getBinWaitUntil()
        else:
            # In bin 11, don't set a next review time
            self.nextReviewAt = None
    
    # Mutation on card data when a user answers incorrectly
    def answeredIncorrect(self):
        
        self.wrongCount = self.wrongCount + 1
            
        # When a card is wrong 10 times
        if self.wrongCount > 9:
            # Set it to bin -1
            self.binNum = -1
            
            # Don't set a next review time
            self.nextReviewAt = None
            
        else:
            # Put the card back into bin 1
            self.binNum = 1
            
            # Set the next possible review time
            self.nextReviewAt = self.getBinWaitUntil()

# Card REST API serializer
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('pk', 'word', 'definition', 'binNum', 'wrongCount', 'nextReviewAt')
