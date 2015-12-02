(function () {
  'use strict';

  angular.module('ionWeather.start', [])

    .controller('StartCtrl', function ($scope, $rootScope, $translate, $ionicModal, location, locations, WeatherSvc, LocationSvc, $ionicLoading, $ionicPopover) {

      $scope.location = location;
      $scope.locationKeywords = '';

      var translationKeys = [
        'START.GETTING_FORCAST_FOR',
        'START.GETTING_5DAY_FORECAST'
      ];

      $translate(translationKeys).then(function (res) {
        $scope.translations = res;
        loadForecastForLocation();
      });

      $rootScope.$on('$translateChangeSuccess', function () {
        console.log('$translateChangeSuccess');
        $translate(translationKeys).then(function (res) {
          $scope.translations = res;
        });
      });

      function loadForecastForLocation() {
        $ionicLoading.show({ template: $scope.translations['START.GETTING_FORCAST_FOR'] + ' ' + location.name });
        WeatherSvc.getWeatherForPos(location.pos.coords.latitude, location.pos.coords.longitude)
          .then(function (forecast) {
            $ionicLoading.hide();
            $scope.forecast = forecast;
          });
      }

      $ionicModal.fromTemplateUrl('app/weather/fivedayforecast.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.fivedaymodal = modal;
      });
      $ionicModal.fromTemplateUrl('app/weather/selectlocation.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function (modal) {
        $scope.locationmodal = modal;
      });
      $ionicPopover.fromTemplateUrl('app/weather/forecast-popover.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.forecastPopover = popover;
      });

      $scope.openForecastPopover = function ($event) {
        $scope.forecastPopover.show($event);
      }
      $scope.closeForecastPopover = function () {
        $scope.forecastPopover.hide();
      }

      $scope.searchLocation = function (locationKeywords) {
        console.log(locationKeywords);
        if (locationKeywords && locationKeywords.length) {

          LocationSvc.searchLocation(locationKeywords)
            .then(function (res) {
              console.log(res);
              $scope.locations = res;
            });
        }
        else {
          $scope.locations = LocationSvc.getSavedLocations();
        }
      }

      $scope.saveLocation = function (location) {
        location.saved = true;
        LocationSvc.saveLocation(location);
      }

      $scope.removeLocation = function (location) {
        LocationSvc.removeLocation(location);
        location.saved = false;
      }

      $scope.selectLocation = function () {
        $scope.locationKeywords = '';
        $scope.locations = LocationSvc.getSavedLocations();
        $scope.locationmodal.show();
      };

      $scope.locationSelected = function (location) {
        //console.log(location);
        $scope.locationmodal.hide();
        $ionicLoading.show({ template: $scope.translations['START.GETTING_FORCAST_FOR'] + ' ' + location.name });
        WeatherSvc.getWeatherForPos(location.pos.coords.latitude, location.pos.coords.longitude)
          .then(function (forecast) {
            $ionicLoading.hide();

            $scope.location = location;
            $scope.forecast = forecast;
          });
      };

      $scope.getFiveDayForecast = function (pos) {
        $ionicLoading.show({ template: $scope.translations['START.GETTING_5DAY_FORCAST'] });
        WeatherSvc.getFiveDayForecast(pos.coords.latitude, pos.coords.longitude)
          .then(function (forecast_array) {
            $ionicLoading.hide();

            $scope.fivedayForecast = forecast_array;

            $scope.fivedaymodal.show();
          });
      }

      $scope.closeModal = function (modal) {
        modal.hide();
      };

      $scope.$on('$destroy', function () {
        $scope.fivedaymodal.remove();
        $scope.locationmodal.remove();
        $scope.forecastPopover.remove();
      });
    });

})();