(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('LoginController', LoginController);

	LoginController.$inject = ['$rootScope', '$state', '$uibModalInstance'];

	function LoginController ($rootScope, $state, $uibModalInstance) {
		var vm = this;
		console.log("Login Controller created");

		vm.cancel = function (){
			$uibModalInstance.dismiss('cancel');
		}

	}
})();
