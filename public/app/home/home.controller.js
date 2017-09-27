(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'ProductService','AuthService'];

	function HomeController ($scope, $state, ProductService,AuthService) {
		var vm = this;
		
		vm.user = {};

		AuthService.getUserDetail().then(function(response){
			vm.user = response.user;
		},function(err){
			console.error("Error occured while fetching user detail");
		});

	
		
	}
})();
