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


		function currentUser(){
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
			return currentUser();
		}

		var service = {
				currentUser		: 	currentUser,
				getUserDetail 	: getUserDetail
		};

		return service;

	}
})();