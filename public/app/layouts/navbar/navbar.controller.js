(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$state','LoginService','AuthService','$stateParams'];

	function NavbarController ($state,LoginService,AuthService,$stateParams) {
		var vm = this;

		vm.isAuthenticated =  AuthService.isAuthenticated;

		vm.$state = $state ;

		//console.log("Nav Bar Controller Created.");

		vm.login=function(){
			LoginService.open();
		};

		vm.logout = function(){
			LoginService.logout();
		};


	}
})();
