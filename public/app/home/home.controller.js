(function() {
    'use strict';

    angular
        .module('productManagement')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state'];

    function HomeController ($scope, $state) {
        var vm = this;

        console.log("Home COntroller called");
    }
})();
