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


		function saveOne(product){
			ProductOrderHistoryService.saveOne(product).then(
					function onSuccess(response){
						console.log("Save Response found ",response);

						if(response.code  === 200){
							clear();
						}else if(response.code  === 500){
							vm.error = true;
							if(response.MessageCode === "ER_DUP_ENTRY"){
								vm.errorMessage = response.Message;
							}
						}


					},function onFail(errResponse){
						console.error("Error Occured while saving product ",errResponse);
					});
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
