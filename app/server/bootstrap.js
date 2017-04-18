Meteor.startup(function() {

  // if there are no polls available
  if (Polls.find().count() === 0) {

    // create sample polls
    var samplePolls = [
      {
        question: 'Recipe1',
        choices: [
          { text: 'Recipe1Ing1', votes: 100 },
          { text: 'Recipe1Ing2', votes: 200 },
          { text: 'Recipe1Ing3', votes: 300 }
        ]
      },
      {
        question: 'Recipe2',
        choices: [
          { text: 'Recipe2Ing1', votes: 100 },
          { text: 'Recipe2Ing2', votes: 200 },
          { text: 'Recipe2Ing3', votes: 300 }
        ]
      }
    ];

    // loop over each sample poll and insert into database
    _.each(samplePolls, function(poll) {
      Polls.insert(poll);
    });
  }

});