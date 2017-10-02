(function() {
	'use strict';

	angular
	.module('productManagement')
	.factory('LoginService', LoginService);

	LoginService.$inject = ['$uibModal','HttpService','$q','AuthService','$state'];

	function LoginService ($uibModal,HttpService,$q,AuthService,$state) {

		var LOGIN_API_URL 	= "api/login";
		var LOGOUT_API_URL 	= "api/logout";

		var modalInstance = null;

		var resetModal = function () {
			modalInstance = null;
		};

		function open () {
			if (modalInstance !== null){ 
				return;
			}
			modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/login/login.html',
				controller: 'LoginController',
				controllerAs: 'vm'
			});
			modalInstance.result.then(
					resetModal,
					resetModal
			);
		}

		function login(data){
			var deferred = $q.defer();

			HttpService.fetchPostData(LOGIN_API_URL,data).then(
					function(response){
						deferred.resolve(response);
						AuthService.getCurrentUser();
						$state.go('home');
					},function(errData){
						deferred.reject(errData);
					}
			);
			return deferred.promise;
		}

		function logout(){
			var deferred = $q.defer();

			HttpService.fetchPostData(LOGOUT_API_URL).then(
					function(response){
						deferred.resolve(response);
						AuthService.getCurrentUser();
						$state.go('home');
					},function(errData){
						deferred.reject(errData);
					}
			);
			return deferred.promise;
		}

		var service = {
				open	: 	open,
				login	:	login,
				logout	:	logout
		};

		return service;

	}
})();