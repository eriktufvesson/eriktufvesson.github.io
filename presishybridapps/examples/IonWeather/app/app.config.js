(function () {
  'use strict';

  angular.module('ionWeather')
    
    .value('WeatherApiUrl', 'http://yr-weather-api.herokuapp.com/')
    
    .config(function (uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyD1tizeQzqlu6zZ_q3IpCg5CM6k6vnUVNk',
        sensor: true,
        libraries: 'geocoder'
      });
    });

})();