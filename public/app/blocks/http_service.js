(function() {
	'use strict';

	angular
	.module('productManagement')
	.service('HttpService', HttpService);

	HttpService.$inject = ['$q', '$http'];

	function HttpService($q, $http) {

		/**
		 * TO post the data from services.
		 */
		this.fetchPostData = function (url, data,config) {
			var deferred = $q.defer();

			$http.post(url,data,config).then(function (response) {
				deferred.resolve(response.data);
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		};

		/**
		 * TO get the data from services.
		 */
		this.fetchGetData = function (url) {
			var deferred = $q.defer();
			$http.get(url).then(function (response) {
				deferred.resolve(response.data);
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		};        
	}
})();