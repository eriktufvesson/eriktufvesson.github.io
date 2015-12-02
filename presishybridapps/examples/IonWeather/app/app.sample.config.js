(function () {
  'use strict';

  angular.module('ionWeather')
    
    .value('WeatherApiUrl', 'http://url-to-your.weather-api.com/')
    
    .config(function (uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        key: 'YOUR_GOOGLE_MAPS_API_KEY',
        sensor: true,
        libraries: 'geocoder'
      });
    });

})();