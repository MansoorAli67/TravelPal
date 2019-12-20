/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
// function storeLocation(){


function getLocation() {

navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}
function geoSuccess(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    codeLatLng(lat, long);
}

function geoError() {
    alert("Geocoder failed.");
}
var geocoder;
function initMap() {
    geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, long) {
    var latlng = new google.maps.LatLng(lat, long);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
            var country = null,city = null;
            var c, lc, component;
            for (var r = 0, rl = results.length; r < rl; r += 1) {
                var result = results[r];

                if (!city && result.types[0] === 'locality') {
                    for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                        component = result.address_components[c];

                        if (component.types[0] === 'locality') {
                            city = component.long_name;
                            break;
                        }
                    }
                }
                 else if (!country && result.types[0] === 'country') {
                    country = result.address_components[0].long_name;
                }
                console.log(result);
                var output = document.getElementById("output");
                output.innerHTML =  city + ", " + country;
                
            }
        }

}
});

}
function getWeather() {

    var lat;
    var long;
    var temp;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        
// create API with Geolocation
    var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=784b74887cd51b5f4f873506a0315414";
    var ktemp = temp; // in  kelvin
    var fTemp = Math.round((ktemp)*(9/5)-459.67); // in fehrenhiegth
    var cTemp = Math.round((fTemp - 32) * (5/9)); //temp in c
    //for output
    var output1 = document.getElementById("output");
    output1.innerHTML =  temp;
});
}
}