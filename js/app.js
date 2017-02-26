var map;

var placesLocations = [{
        name: 'Universal Blvd',
        address: '6000 Universal Blvd, Orlando, FL 32819',
        lat: 28.476175,
        lng: -81.467918,
        fsID: '4ad62c90f964a5208c0521e3'
    },
    {
        name: 'Walt Disney World Resort',
        address: 'Orlando, FL 32836',
        lat: 28.385228,
        lng: -81.563874,
        fsID: '4d91f168cbc1224bd50224d5'

    },
    {
        name: 'Cocoa Beach',
        address: '3655 N Atlantic Ave, FL 32931',
        lat: 28.352385,
        lng: -80.607898,
        fsID: '536d1457498e475dc5830dea'

    },
    {
        name: 'Daytona Beach',
        address: 'Daytona Beach,FL 32114',
        lat: 29.211363,
        lng: -81.015932,
        fsID: '4ff5ef6ce4b033b23af6400f'
    },
    {
        name: 'Panama Beach',
        address: 'Panama City,FL 32413',
        lat: 30.224217,
        lng: -85.871010,
        fsID: '4e65686cae60e9edf704ae84'
    },
    {
        name: 'Kissimmee Parks',
        address: '201 Lakeview Dr, Kissimmee, FL 34741',
        lat: 28.290922,
        lng: -81.404432,
        fsID: '4e3e683fa809ba757c170072'
    },
];

var infoWindow;



var initMap = function() {

    infoWindow = new google.maps.InfoWindow({
        content: '<div><h4 id="places-name"></h4><p id="places-address"></p><p id="textLink"></p></div>'
    });

    var mapCanvas = document.getElementById('map');
    var cenLatLng = new google.maps.LatLng(28.538336, -81.379234);
    var mapOptions = {
        center: cenLatLng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);

    ko.applyBindings(new ViewModel());
};

var ViewModel = function() {
    var self = this;
    this.placesList = ko.observableArray([]);
    this.filteredPlacesList = ko.observableArray([]);

    this.query = ko.observable("");

    self.initialize = function() {};

    self.buildPlacesLocations = function() {
        placesLocations.forEach(function(placeItem) {
            self.placesList.push(new Places(placeItem));
        });
    };

    self.setPlacesClickFunctions = function() {
        self.placesList().forEach(function(places) {
            google.maps.event.addListener(places.marker(), 'click', function() {
                self.placesClick(places);
            });
        });
    };

    self.placesClick = function(places) {
        infoContent = '<div class="tooltip"><h3 id="places-name">' + places.name() + '</h3>' + '<h5 id="places-address">' + places.address() + '</h5>' + '<a target="_blank" id="places-fsID" href="http://foursquare.com/v/' + places.fsID() + '">Photos of the place</a></div>';
        infoWindow.setContent(infoContent);
        infoWindow.open(map, places.marker());
        self.setMarkerAnimation(places);
    };

    self.setMarkerAnimation = function(places) {
        places.marker().setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            places.marker().setAnimation(null);
        }, 750);
    };


    self.filterPlaces = function() {
        self.filteredPlacesList([]);

        var searchString = self.query().toLowerCase();
        var len = self.placesList().length;

        for (var i = 0; i < len; i++) {
            var placesName = self.placesList()[i].name().toLowerCase();
            if (placesName.indexOf(searchString) > -1) {
                self.filteredPlacesList.push(self.placesList()[i]);
                self.placesList()[i].marker().setMap(map);
            } else {
                self.placesList()[i].marker().setMap(null);
            }
        }
    };

    google.maps.event.addDomListener(window, 'load', function() {
        self.initialize();
        self.buildPlacesLocations();
        self.setPlacesClickFunctions();
        self.filteredPlacesList(self.placesList());
    });
};

var Places = function(data) {
    var marker;

    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.fsID = ko.observable(data.fsID);

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat(), this.lng()),
        map: map,
        title: this.name()
    });

    this.marker = ko.observable(marker);
};


function googleError() {
    alert("Google Maps did not load.");
}


$(document).ready(function() {
    $('#nav-expander').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('nav-expanded');
    });
    $('.mobile-list').on('click', function(e) {
        console.log('clicked');
        e.preventDefault();
        $('body').toggleClass('nav-expanded');
    });
});