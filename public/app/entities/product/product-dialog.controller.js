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


		function saveOne(product){
			ProductService.saveOne(product).then(
					function onSuccess(response){
						console.log("Save Response found ",response);

						if(response.code  === 200 && response.data.affectedRows === 1){
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

		function updateOne(product){
			ProductService.updateOne(product).then(
					function onSuccess(response){
						console.log("Save Response found ",response);

						if(response.code  === 200 && response.data.affectedRows === 1){
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
