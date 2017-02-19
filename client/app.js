
Template.body.helpers({
  
  polls: function() {
    return Polls.find();
  }
  
});

UI.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index;
      return item;
    });
  }
});

Template.body.events({
  'click .delete'() {
    Polls.remove(this._id)
    //console.log(this._id)
    // Set the checked property to the opposite of its current value
    //Tasks.update(this._id, {
    //  $set: { checked: ! this.checked },
    //});
  },
});