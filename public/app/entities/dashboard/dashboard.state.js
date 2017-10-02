(function() {
    'use strict';

    angular
        .module('productManagement')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('dashboard', {
            parent: 'app',
            url: '/dashboard',
            views: {
                'content@': {
                    templateUrl: 'app/entities/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
