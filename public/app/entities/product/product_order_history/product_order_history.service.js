(function() {
	'use strict';

	angular
	.module('productManagement')
	.service('ProductOrderHistoryService', ProductOrderHistoryService);

	ProductOrderHistoryService.$inject = ['$q','HttpService'];

	function ProductOrderHistoryService ($q,HttpService) {

		var PRODUCT_FIND_ALL_API_URL   = 'api/productOrderHistory/findAll'; 
		var PRODUCT_FIND_ONE_API_URL   = 'api/productOrderHistory/findOne'; 
		var PRODUCT_SAVE_ONE_API_URL   = 'api/productOrderHistory/saveOne';
		var PRODUCT_DELETE_ONE_API_URL = 'api/productOrderHistory/deleteOne';


		this.findAll =function(){

			var deferred = $q.defer();

			HttpService.fetchPostData(PRODUCT_FIND_ALL_API_URL).then(
					function(response){
						deferred.resolve(response);
					},function(errData){
						deferred.reject(errData);
					}
			);
			return deferred.promise;
		};

		this.findOne =function(id){

			var deferred = $q.defer();

			HttpService.fetchPostData(PRODUCT_FIND_ONE_API_URL,{id : id}).then(
					function(response){
						deferred.resolve(response.data);
					},function(errData){
						deferred.reject(errData);
					}
			);
			return deferred.promise;
		};

		this.saveOne =function(userData){

			var deferred = $q.defer();

			HttpService.fetchPostData(PRODUCT_SAVE_ONE_API_URL, userData).then(
					function(response){
						deferred.resolve(response);
					},function(errData){
						deferred.reject(errData);
					}
			);
			return deferred.promise;
		};

		this.deleteOne =function(userData){

			var deferred = $q.defer();

			HttpService.fetchPostData( PRODUCT_DELETE_ONE_API_URL , userData).then(
					function(response){
						deferred.resolve(response);
					},function(errData){
						deferred.reject(errData);
					}
			);
			return deferred.promise;
		};

	}
})();
