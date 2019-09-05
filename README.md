# Flashcards

This project is a web application implementing the provided **Project Specs**.

The structure of the project is a django application running as a web server backend, and a Vue.js application providing the web browser client user interface.

Development is being done on an EC2 instance with the Cloud9 IDE, and can easily be deployed to Heroku.


## TODO

- Add user authentication and roles
- Add documentation
- Add unit tests
- Add CI/CD


--------------

## Getting started

```
cd django-vue-template

# run the backend web server
source venv/bin/activate && ./manage.py runserver 0.0.0.0:8000

# serve the frontend for development
yarn serve
```


--------------

## Project Specs

### Overview

The user creates vocabulary flashcards she wants to study.

When reviewing a flashcard, the user can choose whether she got it right or not.

Each time she gets it right, the time for the card to reappear is increased.

If she gets it wrong, the card is reset to reappear much sooner.

This is a basic spaced repetition learning model.


### Feature Specs

Admin Interface:

- Create tool where the user can create a single word and definition

- View cards tool that displays all cards and their current status (bin, time to next appearance, # of times answered incorrect)


Flashcard Logic:

- There are 12 bins of cards that represent increasing levels of mastery.

-- Each user-word starts out in bin 0.

-- If a user gets a word right, it moves to the next bin, up to bin 11.

-- If a user gets a word wrong, it goes back to bin 1.

-- Bins 1-11 are associated with the following timespans:  
    
    5 seconds,
    25 seconds,
    2 minutes,
    10 minutes,
    1 hour,
    5 hours,
    1 day,
    5 days,
    25 days,
    4 months,
    and never.
    
    The timespans reflect the amount of time to wait before the next review of that card.

- Reviewing Words:

-- If any words have reached 0 time or less, review these first.

--- For the subset above, review higher-numbered bins before lower bins.

-- If all words have positive timers on them, start drawing new words from bin 0.

-- If there are no words in bin 0 and all words still have positive timers, display a message: “You are temporarily done; please come back later to review more words.”

- Forgetting Words:

-- If a user has gotten any single word wrong 10 times ever (even if they got the word right in between; this is a lifetime count), the word gets put into a “hard to remember” bin and is never shown again.

-- If all words are either in the last bin (never review) or in “hard to remember”, display a message “you have no more words to review; you are permanently done!”

 

User Interaction:

- When a user loads the app, he is a shown a word.

-- When he sees a word and clicks “show definition” the definition displays.

-- After seeing the definition, he clicks “I got it” or “I did not get it”

- Status messages may also be shown as defined above

- UI can be simple and utilitarian. 


Optional Bonuses:

The above specs are the bare-bones functionality we're looking for. You are free to go beyond these specs in ways that improve the user experience or better showcase your skills. Here are a few examples:

- Using AJAX for the flashcards

- Building a single-page app

- Better looking UI

- Using our specific stack, particularly Django/AWS EC2

- Full flashcard CRUD capabilities for Admin

- Implementing multiple users

- Documentation

- Automated testing
