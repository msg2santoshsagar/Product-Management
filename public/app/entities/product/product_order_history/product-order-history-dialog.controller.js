(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('ProductOrderHistoryDialogController', ProductOrderHistoryDialogController);

	ProductOrderHistoryDialogController.$inject = ['ProductService','entity','$uibModalInstance','ProductOrderHistoryService'];

	function ProductOrderHistoryDialogController (ProductService,entity,$uibModalInstance,ProductOrderHistoryService) {

		var vm  = this;
		vm.product = entity;

		vm.productList = [];

		console.log("ENTITY --- ",entity);

		function clear () {
			$uibModalInstance.dismiss('cancel');
		}

		function onSuccess(response){
			console.log("Save Response found ",response);
			clear();

		}

		function onFail(errResponse){
			console.error("Error Occured while updating product ",errResponse);
			vm.error = true;
			var errData = errResponse.data;
			vm.errorMessage = errData.Message;
		}

		function saveOne(product){
			ProductOrderHistoryService.saveOne(product).then(onSuccess,onFail);
		}

		vm.save = function(){

			vm.error        = false;
			vm.errorMessage = null; 

			var product = vm.product;
			product.product_id =  product.product.id;
			product.price 	   =  product.product.price; 
			console.log("Request to save product order :: ",product);
			saveOne(product);

		};

		vm.clear = clear;

		function init(){
			ProductService.findAll().then(
					function(response){
						vm.productList = response.data;
						console.log("Product List Fetched ::  ",vm.productList);
					},function(errResponse){
						console.error("Error occured while fetching product list ",errResponse);
					});
		}

		init();

	}
})();
