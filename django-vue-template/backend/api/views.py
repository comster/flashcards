from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from rest_framework import viewsets

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Card, CardSerializer
# from .models import Message, MessageSerializer


# Serve Vue Application
index_view = never_cache(TemplateView.as_view(template_name='index.html'))


"""
Saving card flash answers:

- Correct:
    - inc card.binNum
    - If card.binNum < 11:
        - set card.nextReviewAt timestamp based on card.binNum associated timespan + now
    - Else: 
        - unset card.nextReviewAt timestamp
- Incorrect: 
    - inc card.wrongCount
    - If card.wrongCount >= 10:
        - set card.binNum to -1
        - unset card.nextReviewAt timestamp
    - Else:
        - set card.binNum to 1
        - set card.nextReviewAt timestamp based on card.binNum associated timespan + now

"""

class CardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows cards to be viewed or edited.
    """
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    
    @action(methods=['put'], detail=True)
    def answer(self, request, *args, **kwargs):
        
        # Input parameter
        is_correct = request.data['is_correct']
        
        # Card object
        instance = self.get_object()
        
        if is_correct == True:
            # A card that was reviewed with a correct response
            instance.answeredCorrect()
        else:
            # When a card that was reviewed with an incorrect answer
            instance.answeredIncorrect()
            
        instance.save()
        
        # Responsd with the Card data
        s = self.get_serializer(instance)
        
        return Response(data=s.data)
