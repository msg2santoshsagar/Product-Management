(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('UserDialogController', UserDialogController);

	UserDialogController.$inject = ['$scope', '$state','entity','$uibModalInstance'];

	function UserDialogController ($scope, $state,entity,$uibModalInstance) {
		
		var vm = this;
		
		function clear () {
			$uibModalInstance.dismiss('cancel');
		}

		
		vm.clear = clear;
	}
})();
