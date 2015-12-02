(function () {
  'use strict';

  angular.module('ionWeather')
    .run(function ($ionicPlatform, $cordovaGlobalization, $window, $translate) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          cordova.plugins.StatusBar.styleDefault();
        }

        if (navigator.globalization) {
          $cordovaGlobalization.getPreferredLanguage().then(function (res) {
            $translate.use(res.value.substring(0, 2));
          });
        }
        else {
          $translate.use('sv');
          console.log('now using sv');
        }
      });
    })
    .run(function ($rootScope, $state, $ionicLoading) {
      $rootScope.$on('$stateChangeStart', function (fromState, toState) {
        if (toState.resolve) {
          $ionicLoading.show({ template: '<ion-spinner></ion-spinner>' });
        }
      });
      $rootScope.$on('$stateChangeSuccess', function () {
        $ionicLoading.hide();
      });

    });

})();