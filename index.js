// Create a new collection: Foods
Foods = new Meteor.Collection("foods");

// Client specific code
if (Meteor.isClient) {

    /*
       Main Template Helpers and Events

       Get the list of foods to display in the template, add some helpers
       to add CSS classes when a food is selected, and add click events to
       allow us to select and vote for a food
    */

    // Get a list of the foods and sort by name
    Template.foodlist.foods = function () {
        return Foods.find({}, {sort: {name: 1}});
    };

    // Get Selected food and display it in the 'details' div
    Template.foodlist.selected_food = function () {
        var food = Foods.findOne(Session.get("selected_food"));
        return food && food.name;
    };

    // Return CSS class selected if this food is the chosen/selected one
    Template.food.selected = function () {
        return Session.equals("selected_food", this._id) ? "selected" : '';
    };

    // foodlist specific events
    Template.foodlist.events({

        // Vote for a selected food when we click the button
        'click input.inc': function () {
            Foods.update(Session.get("selected_food"), {$inc: {votes: 1}});
        }

    });

    // food template specific events
    Template.food.events({

        // Select a food when we click on the name
        'click': function () {
            Session.set("selected_food", this._id);
        }

    });

    /* 
        D3 Template Helpers

        This is where the magic happens: We set up an SVG based chart
        from the food vote data, and make it reactive.

        D3 is a 'client only' library, it really has no business being in
        the backend since it only manipulates the data from the backend.

    */
    Template.chart.created = function () {

        // We need to wait until the DOM is loaded, so we use defer
        _.defer(function () {

            window.chart = {}  // Create chart element in window namespace

            // We make this Reactive using Deps.autorun
            Deps.autorun(function () {

                // Theres some stuff we only want to run once
                if (Deps.currentComputation.firstRun) {
                    
                    // 1) Margin and Dimension Data

                    // 2) Scaling

                    // 3) Element Color Ranges

                    // 4) Select and Append a Group

                }

                // 5) Get the list of Foods sorted by name, and map results to possible colors

                // 6) Map the foods to the possible colors (up to 20 different colors)

                // 7) Get list of foods sorted by vote count 

                // 8) Map results to the x & y domain of the chart

                // 9) Binding - Bind the food data
            
                // 10) Select the chart bar elements

                // 11) Select the chart bar labels

                // 12) Create a bar element for each food item

                // 13) Create a label (Name + Vote count) for each food item

            });

        });
    };
}

if (Meteor.isServer) {

  Meteor.startup(function () {

    // Populate the collection if its empty (first run)
    if (Foods.find().count() === 0) {
      var f = [
                   "Pizza",
                   "Cheeseburger",
                   "Ham Sandwich",
                   "Chili Dog",
                   "Spicy Tuna Roll"
                ];
      for (var i = 0; i < f.length; i++)
        Foods.insert({name: f[i], votes: Math.floor(Math.random()*10)});
    }

  });

}
