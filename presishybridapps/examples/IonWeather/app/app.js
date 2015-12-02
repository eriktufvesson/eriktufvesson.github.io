(function () {
  'use strict';

  angular.module('ionWeather',
    [
      'ionic',        
    //3rd party modules
      'ngCordova',
      'uiGmapgoogle-maps',
      'ngStorage',
      'pascalprecht.translate',
        
    //app modules
      'ionWeather.start',
      'ionWeather.weather',
      'ionWeather.location'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/start');

      $stateProvider.state({
        name: 'start',
        url: '/start',
        controller: 'StartCtrl',
        templateUrl: 'app/start/start.html',
        resolve: {
          // forecast: function (WeatherSvc) {
          //   return WeatherSvc.getWeatherForCurrentPos();
          // },
          location: function (LocationSvc) {
            return LocationSvc.getCurrentPosition(true);
          },
          locations: function (LocationSvc) {
            return LocationSvc.getSavedLocations();
          }
        }
      });

    })
    .config(function ($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'localization/locale-',
        suffix: '.json'
      });
      $translateProvider.preferredLanguage('en');
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    });

})();



  

