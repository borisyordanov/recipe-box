Template.pollForm.events({

  // handle the form submission
  'submit form': function(event) {

    // stop the form from submitting
    event.preventDefault();

    // get the data we need from the form
    var newPoll = {
      question: event.target.question.value,
      choices: [
        {  text: event.target.ingredient1.value, votes: event.target.ingredient1Amount.value },
        {  text: event.target.ingredient2.value, votes: event.target.ingredient2Amount.value },
        {  text: event.target.ingredient3.value, votes: event.target.ingredient3Amount.value }
      ]
    };    
     
    // create the new poll
    Recipes.insert(newPoll);
  }

});