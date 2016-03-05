//ModelView
var modelview = {

    //app initialization function
    init : function(){
        model.init();
        view.init();
    },

    //sends a request to model for the location names.
    getLocationNames : function (){
        var locationNames = [];
        for (var i = 0; i < model.placesOfInterest.length; i++) {
            locationNames.push(model.placesOfInterest[i][0]);
        }
        return locationNames;
    }
};

