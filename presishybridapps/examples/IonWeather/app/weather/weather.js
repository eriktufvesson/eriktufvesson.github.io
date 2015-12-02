(function () {
  'use strict';

  angular.module('ionWeather.weather', [])

    .factory('WeatherSvc', function ($http, $q, $ionicPlatform, $log, $cordovaGeolocation, WeatherApiUrl) {
      
      var service = {
        getWeatherForCurrentPos: getWeatherForCurrentPos,
        getWeatherForPos: getWeatherForPos,
        getFiveDayForecast: getFiveDayForecast,
        parseForecast: parseForcast
      };

      return service;
    
      ////////////////////
    
      function getWeatherForCurrentPos() {
        var deferred = $q.defer();

        $ionicPlatform.ready(function () {
          $cordovaGeolocation.getCurrentPosition({
            timeout: 10000,
            enableHighAccuracy: false
          })
            .then(function (pos) {
              $http.get(WeatherApiUrl + 'weather/' + pos.coords.latitude + '/' + pos.coords.longitude)
                .success(function (forecast) {
                  deferred.resolve(parseForcast(forecast, pos));
                })
                .error(function (err) {
                  $log.error('Error getting forecast from API', err);
                  deferred.reject(err);
                });               
              
            }, function (err) {
              $log.error('Error getting position', err);
              deferred.reject(err);
            });
        });

        return deferred.promise;
      }

      function getWeatherForPos(lat, lon) {
        var deferred = $q.defer();

        $http.get(WeatherApiUrl + 'weather/' + lat + '/' + lon)
          .success(function (forecast) {
            deferred.resolve(parseForcast(forecast, { coords: { latitude: lat, longitude: lon } }));
          })
          .error(function (err) {
            $log.error('Error getting forecast from API', err);
            deferred.reject(err);
          });

        return deferred.promise;
      }

      function getFiveDayForecast(lat, lon) {
        var deferred = $q.defer();

        $http.get(WeatherApiUrl + 'weather/5day/' + lat + '/' + lon)
          .success(function (forecast) {
            angular.forEach(forecast, function (day) {
              day = parseForcast(day, { coords: { latitude: lat, longitude: lon } });
            });
            deferred.resolve(forecast);
          })
          .error(function (err) {
            $log.error('Error getting forecast from API', err);
            deferred.reject(err);
          });

        return deferred.promise;
      }

      function parseForcast(forecast, pos) {

        forecast.pos = pos;

        var temperature = parseFloat(forecast.temperature.substring(0, forecast.temperature.indexOf(' ')));
        temperature = Math.round(temperature);
        var temperatureUnit = forecast.temperature.substring(forecast.temperature.indexOf(' ') + 1);
        temperatureUnit = temperatureUnit.replace('celsius', '°C');
        forecast.temperature = temperature.toString() + ' ' + temperatureUnit;
        forecast.description = forecast.icon.split(/(?=[A-Z])/).join(' ');
        forecast.icon = getIcon(forecast.icon);

        forecast.humidity = forecast.humidity.replace(' percent', '%');

        return forecast;
      }

      function getIcon(s) {
      
        /*
        1 Sun
  2 LightCloud
  3 PartlyCloud
  4 Cloud
  5 LightRainSun
  6 LightRainThunderSun
  7 SleetSun
  8 SnowSun
  9 LightRain
  10 Rain
  11 RainThunder
  12 Sleet
  13 Snow
  14 SnowThunder
  15 Fog
  20 SleetSunThunder
  21 SnowSunThunder
  22 LightRainThunder
  23 SleetThunder
  24 DrizzleThunderSun
  25 RainThunderSun
  26 LightSleetThunderSun
  27 HeavySleetThunderSun
  28 LightSnowThunderSun
  29 HeavySnowThunderSun
  30 DrizzleThunder
  31 LightSleetThunder
  32 HeavySleetThunder
  33 LightSnowThunder
  34 HeavySnowThunder
  40 DrizzleSun
  41 RainSun
  42 LightSleetSun
  43 HeavySleetSun
  44 LightSnowSun
  45 HeavysnowSun
  46 Drizzle
  47 LightSleet
  48 HeavySleet
  49 LightSnow
  50 HeavySnow
        */
        switch (s) {
          case 'Sun':
            return 'ion-ios-sunny';
          case 'LightClound':
          case 'PartlyCloud':
            return 'ion-ios-partlysunny';
          case 'Cloud':
          case 'Fog':
            return 'ion-ios-cloudy';
          case 'LightRainSun':
          case 'LightRainThunderSun':
          case 'LightRain':
            return 'ion-ios-rainy';
          case 'SleetSun':
          case 'SnowSun':
          case 'Sleet':
          case 'Snow':
          case 'SnowThunder':
            return 'ion-ios-snowy';
          default:
            return 'ion-ios-partlysunny'
        }
      }
    });

})();