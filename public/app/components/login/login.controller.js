(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('LoginController', LoginController);

	LoginController.$inject = ['$rootScope', '$state', '$uibModalInstance','LoginService'];

	function LoginController ($rootScope, $state, $uibModalInstance,LoginService) {
		var vm = this;
		console.log("Login Controller created");

		vm.cancel = function (){
			$uibModalInstance.dismiss('cancel');
		};

		vm.login = function(){
			
			 vm.authenticationError = null;

			var loginData = vm.user;

			console.log("Login Data ==> ",loginData);

			LoginService.login(loginData).then(function successCallback(response){
				console.log("Login Response  ==> ",response);
				if(response.status === "pass"){
					vm.cancel();
					$state.go('home');
				}else{
					vm.authenticationError = {
						message : response.reason	
					};
				}
			},function errorCallback(err){
				console.error("Error occured while login  ==> ",err);
			});

		};

	}
})();
