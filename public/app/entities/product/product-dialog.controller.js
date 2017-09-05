(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('ProductDialogController', ProductDialogController);

	ProductDialogController.$inject = ['UserService','entity','$uibModalInstance'];

	function ProductDialogController (UserService,entity,$uibModalInstance) {

		var vm  = this;
		vm.user = entity;


		console.log("ENTITY --- ",entity);

		function clear () {
			$uibModalInstance.dismiss('cancel');
		}


		function saveOne(user){
			UserService.saveOne(user).then(
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
						console.error("Error Occured while saving user ",errResponse);
					});
		}

		function updateOne(user){
			UserService.updateOne(user).then(
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
						console.error("Error Occured while saving user ",errResponse);
					});
		}

		vm.save = function(){

			vm.error        = false;
			vm.errorMessage = null; 

			var user = vm.user;
			console.log("Request to save user :: ",user);
			if(user.id == null){
				saveOne(user);
			}else{
				updateOne(user);
			}

		};


		vm.clear = clear;
	}
})();
