(function() {
    'use strict';

    //Get core module
    angular.module('app.core')

        .config(function($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

                .state('dashboard', {
                    url: "/dashboard",
                    templateUrl: "app/dashboard/dashboard.html"
                });


            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/dashboard');

        })

})();