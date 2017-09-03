(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$state','LoginService'];

	function NavbarController ($state,LoginService) {
		var vm = this;
		console.log("Nav Bar Controller Created.");

		vm.login=function(){
			LoginService.open();
		}


	}
})();
