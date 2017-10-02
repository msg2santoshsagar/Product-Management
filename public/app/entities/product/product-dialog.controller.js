(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('ProductDialogController', ProductDialogController);

	ProductDialogController.$inject = ['ProductService','entity','$uibModalInstance'];

	function ProductDialogController (ProductService,entity,$uibModalInstance) {

		var vm  = this;
		vm.product = entity;


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
			if(errData.MessageCode === "ER_DUP_ENTRY"){
				vm.errorMessage = "This product name is already registered";
			}else{
				vm.errorMessage = errData.Message;
			}
		}

		function saveOne(product){
			ProductService.saveOne(product).then(onSuccess,onFail);
		}

		function updateOne(product){
			ProductService.updateOne(product).then(onSuccess,onFail);
		}

		vm.save = function(){

			vm.error        = false;
			vm.errorMessage = null; 

			var product = vm.product;
			console.log("Request to save product :: ",product);
			if(product.id === null || product.id === undefined ){
				saveOne(product);
			}else{
				updateOne(product);
			}

		};


		vm.clear = clear;
	}
})();
