(function() {
	'use strict';

	angular
	.module('productManagement')
	.service('ProductService', ProductService);

	ProductService.$inject = ['$q','HttpService'];

	function ProductService ($q,HttpService) {

		var PRODUCT_FIND_ALL_API_URL   = 'api/product/findAll'; 
		var PRODUCT_FIND_ONE_API_URL   = 'api/product/findOne'; 
		var PRODUCT_SAVE_ONE_API_URL   = 'api/product/saveOne';
		var PRODUCT_UPDATE_ONE_API_URL = 'api/product/updateOne';
		var PRODUCT_DELETE_ONE_API_URL = 'api/product/deleteOne';


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

		this.updateOne =function(userData){

			var deferred = $q.defer();

			HttpService.fetchPostData(PRODUCT_UPDATE_ONE_API_URL , userData).then(
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
