(function () {
  'use strict';

  angular.module('ionWeather.location', [])

    .factory('LocationSvc', function ($q, $log, $cordovaGeolocation, uiGmapGoogleMapApi, $ionicPlatform, $localStorage) {

      var service = {
        getCurrentPosition: getCurrentPosition,
        searchLocation: searchLocation,
        getSavedLocations: getSavedLocations,
        saveLocation: saveLocation,
        removeLocation: removeLocation
      };

      return service;
    
      ////////////////////
      
      function getCurrentPosition(getLocationName) {

        var deferred = $q.defer();

        $ionicPlatform.ready(function () {
          $cordovaGeolocation.getCurrentPosition({
            timeout: 10000,
            enableHighAccuracy: false
          })
            .then(function (pos) {
              if (getLocationName) {
                uiGmapGoogleMapApi.then(function (maps) {
                  //Also try to get the name of the current location
                  var geocoder = new maps.Geocoder();
                  var latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                  geocoder.geocode({ 'location': latlng }, function (results, status) {
                    if (results[2]) {
                      deferred.resolve({
                        name: results[2].formatted_address,
                        pos: pos
                      });
                    }
                    else {
                      deferred.resolve({
                        name: 'your position',
                        pos: pos
                      });
                    }
                  })
                });
              }
              else {
                deferred.resolve({
                  name: 'your position',
                  pos: pos
                });
              }
            }, function (err) {
              $log.error('Error getting position', err);
              deferred.reject(err);
            });
        });

        return deferred.promise;
      }

      function searchLocation(cityName) {
        var deferred = $q.defer();
        uiGmapGoogleMapApi.then(function (maps) {
          var geocoder = new maps.Geocoder();
          geocoder.geocode({ 'address': cityName }, function (results, status) {
            var locations = [];
            angular.forEach(results, function(location) {
              locations.push({
                name: location.formatted_address,
                pos: {
                  coords: {
                    latitude: location.geometry.location.G,
                    longitude: location.geometry.location.K
                  }
                }
              });
            });
            deferred.resolve(locations);
          })
        });
        return deferred.promise;
      }
      
      function getSavedLocations() {
        return $localStorage.savedLocations;
      }
      
      function saveLocation(location) {
        if (!$localStorage.savedLocations) {
          $localStorage.savedLocations = [];
        }
        $localStorage.savedLocations.push(location);
      }
      
      function removeLocation(location) {
        $localStorage.savedLocations.splice($localStorage.savedLocations.indexOf(location), 1);
      }

    });
})();