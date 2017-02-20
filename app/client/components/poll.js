
// attach events to our poll template
Template.poll.events({

  // event to handle clicking a choice
  'click .vote': function(event) {

    // prevent the default behavior
    event.preventDefault();
  
    // get the parent (poll) id
    var pollID = $(event.currentTarget).parent('.poll').data('id');
    var voteID = $(event.currentTarget).data('id');

    // create the incrementing object so we can add to the corresponding vote
    var voteString = 'choices.' + voteID + '.votes';
    var action = {};
    action[voteString] = 1;
    
    // increment the number of votes for this choice
    Polls.update(
      { _id: pollID }, 
      { $inc: action }
    );

  },

  'click h3': function(event) {

    // prevent the default behavior
    event.preventDefault();

console.log($(event.currentTarget).next("a"));
    $(event.currentTarget).next("a").show();

  }

});

Template.poll.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      $(".vote").hide();
    }
}