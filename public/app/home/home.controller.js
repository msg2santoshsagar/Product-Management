(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'ProductService','AuthService'];

	function HomeController ($scope, $state, ProductService,AuthService) {
		var vm = this;
		
		vm.user = {};

		vm.user 			= AuthService.getUserDetail;
		vm.isAuthenticated 	= AuthService.isAuthenticated;

	}
})();
