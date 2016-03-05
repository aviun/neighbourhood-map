//Kyiv latlng 50.454, 30.523

var placesOfInterest = [
    ['Home', 50.38, 30.46],
    ['Maidan Nezalezhnosti', 50.44, 30.52],
    ['Mariinsky Palace', 50.44, 30.53],
    ['Kyivo Pechersk Lavra', 50.43, 30.55],
    ['Richard Lionheart Castle', 50.46, 30.51]
];

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(50.454, 30.523),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker;

for (var i = 0; i < placesOfInterest.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(placesOfInterest[i][1], placesOfInterest[i][2]),
        map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infowindow.setContent(placesOfInterest[i][0]);
            infowindow.open(map, marker);
        }
    })(marker, i));
}