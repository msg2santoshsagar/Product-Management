(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('ProductDeleteController',ProductDeleteController);

	ProductDeleteController.$inject = ['$uibModalInstance', 'entity', 'ProductService'];

	function ProductDeleteController($uibModalInstance, entity, ProductService) {
		var vm = this;

		vm.user = entity;
		vm.clear = clear;
		vm.confirmDelete = confirmDelete;

		function clear () {
			$uibModalInstance.dismiss('cancel');
		}

		function confirmDelete (id) {

			ProductService.deleteOne( {id: id} ).then(function (result) {
				$uibModalInstance.close(true);
			},function (result) {
				$uibModalInstance.close(false);
			});

		}
	}
})();
