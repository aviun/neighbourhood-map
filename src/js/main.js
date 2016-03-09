var map = '';

//Google API script is calling this function to launch the app and render the map
var initMap = function () {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(50.442, 30.548),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
        viewModel.init();
    };

// VIEW MODEL.
// Displays the list of locations on the left side of the screen
var viewModel = {

    self: this,
    locations: ko.observableArray(),

    // variable used for search/filter functionality
    searchQuery: ko.observable(''),

    //this method is called by KO list item from index.html when the list item is clicked.
    // it activates a marker on the map.
    toggleMarker: function (location) {
        viewModel.disableMarkers();
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
        location.infowindow.open(map, location.marker);
    },

    //before activating a marker on the map, all the other markers should be deactivated
    disableMarkers: function () {
        for (var i = 0; i < this.locations().length; i++) {
            this.locations()[i].marker.setAnimation(null);
            this.locations()[i].infowindow.close();
        }
    },

    //ViewModel grabs the info from Model about locations
    fillLocations: function () {
        for (var i = 0; i < model.locations.length; i++) {
            this.locations.push(model.locations[i]);
        }
    },

    //setting all the data and applying KO bindings
    init: function () {
        model.init();
        this.fillLocations();
        ko.applyBindings(viewModel);
        viewModel.searchQuery.subscribe(this.filterItems);
    },

    //method is used for search and filter locations, KO updates the list when finds matches.
    //Markers appear and disappear when list is filtered
    filterItems: function () {
        var filter = viewModel.searchQuery().toLowerCase();

        for (var i = 0; i < model.locations.length; i++) {

            var searchedTitle = model.locations[i].title().toLowerCase();

            if (searchedTitle.indexOf(filter) > -1) {
                model.locations[i].isFiltered(true);
                model.locations[i].marker.setMap(map);
            }
            else {
                model.locations[i].isFiltered(false);
                model.locations[i].marker.setMap(null);
            }
        }
    }
};

//MODEL
//holds all the information about locations. Operates markers when clicked from map interface.
var model = {
    self: this,

    //the list of initial locations
    locations: [
        {
            title: ko.observable('Khreshchatyk'),
            lat: 50.44,
            lng: 30.51,
            isFiltered: ko.observable(true)
        },
        {
            title: ko.observable('Maidan Nezalezhnosti'),
            lat: 50.44,
            lng: 30.52,
            isFiltered: ko.observable(true)
        },
        {
            title: ko.observable('Mariyinsky Palace'),
            lat: 50.44,
            lng: 30.53,
            isFiltered: ko.observable(true)
        },
        {
            title: ko.observable('Kiev Pechersk Lavra'),
            lat: 50.43,
            lng: 30.55,
            isFiltered: ko.observable(true)
        },
        {
            title: ko.observable('Andriyivskyy Descent'),
            lat: 50.46,
            lng: 30.51,
            isFiltered: ko.observable(true)
        }
    ],

    //adds content info from Wikipedia to be displayed on the infowindow when marker is activated
    setContent: function () {
        for (var i = 0; i < this.locations.length; i++) {
            var wikiURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + this.locations[i].title();
            var wikiRequestTimeout = setTimeout(function () {
                article = "failed to get Wiki resources";
            }, 8000);
            var article = getWikiExtract(i, wikiRequestTimeout, wikiURL);

            function getWikiExtract(i, wikiRequestTimeout, wikiURL) {
                var result = '';
                $.ajax({
                    url: wikiURL,
                    dataType: "jsonp",
                    success: function (data) {
                        if (data && data.query && data.query.pages) {
                            var pages = data.query.pages;
                        }
                        // if error: no pages returned
                        else {
                            result = "No pages were found in Wiki";
                            model.locations[i].infowindow = new google.maps.InfoWindow({
                                content: model.locations[i].title() + "<br><br>" + "Wikipedia info:" + "<br>" + result,
                            })
                        }
                        for (var id in pages) {
                            result = pages[id].extract;
                            model.locations[i].infowindow = new google.maps.InfoWindow({
                                content: '<div style="width: 95%; height:200px; text-align: justify" <strong><b>' + model.locations[i].title() + '</b></strong>'+'<br><br>'+ "Wikipedia info:" + '<br>' + result + '</div>',
                                maxWidth: '200'
                            })
                        }
                        clearTimeout(wikiRequestTimeout);
                    },
                    //error handling for Wikipedia info
                    fail: function(){
                        alert("Unable to reach Wikipedia");
                        model.locations[i].infowindow = new google.maps.InfoWindow({
                            content: model.locations[i].title() + "<br><br>" + "Wikipedia info:" + "<br>" + "Unavailable"
                        })
                    }
                });
            }
        }
    },

    //creates a marker for each location.
    addMarkers: function () {
        for (var i = 0; i < this.locations.length; i++) {
            this.locations[i].marker = this.createMarker(this.locations[i], i);
        }
    },

    //adds marker animation - bouncing feature, when the marker is clicked
    toggleBounce: function (location) {
        viewModel.disableMarkers();
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
    },

    //marker creation function
    createMarker: function (location) {
        var marker = new google.maps.Marker({
            title: location.title(),
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(location.lat, location.lng)
        });
        marker.addListener('click', function () {
            model.toggleBounce(location);
            location.infowindow.open(map, marker);
        });
        return marker;
    },

    //sets all data in Model - adds markers for all locations and sets content for each marker
    init: function () {
        this.addMarkers();
        this.setContent();
    }
};
