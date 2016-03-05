/**
 * Created by nastya on 2016-03-04.
 */
var model = {

    map: "",
    markers: [],

    placesOfInterest: [
        ['Home', 50.38, 30.46],
        ['Maidan Nezalezhnosti', 50.44, 30.52],
        ['Mariinsky Palace', 50.44, 30.53],
        ['Kyivo Pechersk Lavra', 50.43, 30.55],
        ['Richard Lionheart Castle', 50.46, 30.51]
    ],

    //renders a map on the screen, adds markers and infowindows for all places of interest.
    init: function () {
        var marker = "";
        var infoWindow = "";

        //creates a map
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: new google.maps.LatLng(50.423123, 30.526792),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        infoWindow = new google.maps.InfoWindow();

        for (var i = 0; i < this.placesOfInterest.length; i++) {
            //creates markers for each place of interest
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(model.placesOfInterest[i][1], model.placesOfInterest[i][2]),
                map: model.map
            });
            this.markers.push(marker);

            //creates infowindows for each marker
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                   infoWindow.setContent(model.placesOfInterest[i][0]);
                   infoWindow.open(model.map, marker);
                }
            })(marker, i));
        }
    }
};