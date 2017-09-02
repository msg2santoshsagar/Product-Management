(function() {
    'use strict';

    angular
        .module('productManagement')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state'];

    function NavbarController ($state) {
        var vm = this;
        console.log("Nav Bar Controller Created.");

    }
})();
