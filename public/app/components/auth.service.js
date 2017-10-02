(function() {
	'use strict';

	angular
	.module('productManagement')
	.factory('AuthService', AuthService);

	AuthService.$inject = ['HttpService','$q'];

	function AuthService (HttpService,$q) {

		var CURRENT_USER_API_URL = "api/currentUser";

		var userData	 	= {};
		var isLoggedIn 		= false;


		function getCurrentUser(){
			var deferred = $q.defer();
			userData = {};
			HttpService.fetchPostData(CURRENT_USER_API_URL).then(
					function(response){
						isLoggedIn = response.user.loggedIn;
						if(isLoggedIn === true){
							userData = response.user;
						}
						deferred.resolve(response);
					},function(errData){
						console.error("Error occured while fetching current user detail ",errData);
						deferred.reject(errData);
					}
			);
			return deferred.promise;
		}

		function getUserDetail(){
			return userData;
		}

		function isAuthenticated(){
			return isLoggedIn;
		}

		function hasAnyAuthority (authorities) {
			if (! isLoggedIn || authorities === undefined || userData === undefined || userData.role === undefined ) {
				return false;
			}

			for (var i = 0; i < authorities.length; i++) {
				if (userData.role.indexOf(authorities[i]) !== -1) {
					return true;
				}
			}

			return false;
		}

		var service = {
				getCurrentUser		: 	getCurrentUser,
				getUserDetail 		: 	getUserDetail,
				isAuthenticated		: 	isAuthenticated,
				hasAnyAuthority		:   hasAnyAuthority
		};

		return service;

	}
})();