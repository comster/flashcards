from django.db import models
from rest_framework import serializers


class Message(models.Model):
    subject = models.CharField(max_length=200)
    body = models.TextField()


class MessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = ('url', 'subject', 'body', 'pk')


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


class Card(models.Model):
    # Front of card
    word = models.CharField(max_length=200)
    
    # Back of card
    definition = models.TextField()
    
    # Bin number
    binNum = models.IntegerField()
    
    # Number of times this card was answered wrong
    wrongCount = models.IntegerField()
    
    # Next time able to review this card
    nextReviewAt = models.DateTimeField()


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('pk', 'word', 'definition', 'binNum', 'wrongCount', 'nextReviewAt')
