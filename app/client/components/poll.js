// Session.set("clicked", false);

// Handlebars.registerHelper('isClicked', function(input) {
//   return Session.get("clicked");
// });

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
    Polls.update({ _id: pollID }, { $inc: action });

  },

  'click h3': function(event, instance) {
    // Session.set("clicked", true);
    console.log(instance.find('#amount'));
    var a = instance.find('#amount');
    console.log(a);
    a.toggle();
    // a.style.display = 'block';
  }

});

Template.poll.rendered = function() {
  if (!this._rendered) {
    this._rendered = true;
    $("#amount").hide();
  }
}
