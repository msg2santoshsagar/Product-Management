(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('UserDialogController', UserDialogController);

	UserDialogController.$inject = ['UserService','entity','$uibModalInstance'];

	function UserDialogController (UserService,entity,$uibModalInstance) {

		var vm  = this;
		vm.user = entity;

		function clear () {
			$uibModalInstance.dismiss('cancel');
		}

		function onSuccess(response){
			console.log("Save Response found ",response);
			clear();

		}

		function onFail(errResponse){
			console.error("Error Occured while updating user ",errResponse);
			vm.error = true;
			var errData = errResponse.data;
			if(errData.MessageCode === "ER_DUP_ENTRY"){
				vm.errorMessage = "This User Id is already registered";
			}else{
				vm.errorMessage = errData.Message;
			}
		}

		function saveOne(user){
			UserService.saveOne(user).then(onSuccess,onFail);
		}

		function updateOne(user){
			UserService.updateOne(user).then(onSuccess,onFail);
		}

		vm.save = function(){

			vm.error        = false;
			vm.errorMessage = null; 

			var user = vm.user;
			console.log("Request to save user :: ",user);
			if( user.id === null || user.id === undefined ){
				saveOne(user);
			}else{
				updateOne(user);
			}

		};


		vm.clear = clear;
	}
})();
