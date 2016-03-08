//Google API script is calling this function to launch the app

var map = '';

var initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(50.423123, 30.526792),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    viewModel.init();

};

var viewModel = {
    self: this,
    locations: ko.observableArray(),

    toggleMarker: function (location) {
        viewModel.disableMarkers();
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
        location.infowindow.open(map, location.marker);
    },

    disableMarkers: function() {
        for (var i = 0; i < this.locations().length; i++) {
            this.locations()[i].marker.setAnimation(null);
            this.locations()[i].infowindow.close();
        }
    },

    fillLocations: function () {
        for (var i = 0; i < model.locations.length; i++) {
            this.locations.push(model.locations[i]);
        }
    },

    init: function () {
        model.init();
        this.fillLocations();
        ko.applyBindings(viewModel);
    }
};

var model = {
    self: this,
    locations: [
        {
            title: 'Home',
            lat: 50.38,
            lng: 30.46
        },
        {
            title: 'Maidan Nezalezhnosti',
            lat: 50.44,
            lng: 30.52
        },
        {
            title: 'Mariinsky Palace',
            lat: 50.44,
            lng: 30.53
        },
        {
            title: 'Kyivo Pechersk Lavra',
            lat: 50.43,
            lng: 30.55
        },
        {
            title: 'Richard Lionheart Castle',
            lat: 50.46,
            lng: 30.51
        }
    ],

    setContent: function () {
        for (var i = 0; i < this.locations.length; i++) {
            this.locations[i].infowindow = new google.maps.InfoWindow({
                content: this.locations[i].title
            });
        }
    },

    addMarkers: function () {
        for (var i = 0; i < this.locations.length; i++) {
            this.locations[i].marker = this.createMarker(this.locations[i], i);
        }
    },

    toggleBounce: function (location) {
        viewModel.disableMarkers();
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
    },

    createMarker: function (location) {
        var marker = new google.maps.Marker({
            title: location.title,
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(location.lat, location.lng)
        });
        marker.addListener('click', function(){
            model.toggleBounce(location);
            location.infowindow.open(map, marker);
        });
        return marker;
    },

    init: function () {
        this.setContent();
        this.addMarkers();
    }
};
