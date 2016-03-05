/**
 * Created by nastya on 2016-03-04.
 */
var view = {
    init : function() {
        this.displayList();
        this.createFilter();
    },

    //displays a list of places of interest on the screen
    displayList : function(){
        var list = modelview.getLocationNames();
        for (var i = 0; i < list.length; i++) {
            $("#locationList").append("<li>" + list[i] + "</li>");
        }
    },

    //displays a filter for places of interest
    createFilter : function (){
        //var filterBox = document.createElement('')
    }


}
