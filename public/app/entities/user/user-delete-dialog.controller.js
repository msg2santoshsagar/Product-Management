(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('UserDeleteController',UserDeleteController);

	UserDeleteController.$inject = ['$uibModalInstance', 'entity', 'UserService'];

	function UserDeleteController($uibModalInstance, entity, UserService) {
		var vm = this;

		vm.user = entity;
		vm.clear = clear;
		vm.confirmDelete = confirmDelete;

		function clear () {
			$uibModalInstance.dismiss('cancel');
		}

		function confirmDelete (id) {

			UserService.deleteOne( {id: id} ).then(function (result) {
				$uibModalInstance.close(true);
			},function (result) {
				$uibModalInstance.close(false);
			});

		}
	}
})();
