var view = {
map : '',
initMap : function () {
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50.454, lng: 30.523},
        zoom: 10
    });
}
};

view.initMap();