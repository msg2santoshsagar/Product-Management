/*jshint esversion: 6 */

(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('OrderModalController', OrderModalController);

	OrderModalController.$inject = ['$scope', '$state','$uibModalInstance'];

	function OrderModalController ($scope, $state, $uibModalInstance) {
		var vm = this;
		
		vm.orderDetail 	= $scope.orderDetail;
		vm.validatorObj = $scope.validatorObj;
		
		vm.ok = function(){
			$uibModalInstance.close('ok');
		};

	}
})();
