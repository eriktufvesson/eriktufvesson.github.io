(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('dashboard', dashboard);

    dashboard.$inject = [];

    /* @ngInject */
    function dashboard() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'dashboard';

        activate();

        ////////////////

        function activate() {
        }
    }
})();