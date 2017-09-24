(function() {
	'use strict';

	angular
	.module('productManagement')
	.factory('LoginService', LoginService);

	LoginService.$inject = ['$uibModal','HttpService','$q'];

	function LoginService ($uibModal,HttpService,$q) {

		var LOGIN_API_URL = "api/login";
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
					},function(errData){
						deferred.reject(errData);
					}
			);
			return deferred.promise;
		}

		var service = {
				open	: 	open,
				login	:	login
		};

		return service;

	}
})();