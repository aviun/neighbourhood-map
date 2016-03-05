//ModelView
var viewModel = {

    locationNames : ko.observableArray(),

    //app initialization function
    init : function(){
        model.init();
        this.fillLocationNames();
        view.init();

    },

    //sends a request to model for the location names.
    fillLocationNames : function (){
        for (var i = 0; i < model.placesOfInterest.length; i++) {
            this.locationNames.push(model.placesOfInterest[i][0]);
        }
    },

    getLocationNames : function (){
        return this.locationNames();
    }

};

ko.applyBindings(viewModel);
