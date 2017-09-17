(function() {
	'use strict';

	angular
	.module('productManagement')
	.service('SaleService', SaleService);

	SaleService.$inject = ['$q','HttpService'];

	function SaleService ($q,HttpService) {

		var USER_FIND_ALL_API_URL   = 'api/user/findAll'; 
		var USER_FIND_ONE_API_URL   = 'api/user/findOne'; 
		var USER_SAVE_ONE_API_URL   = 'api/user/saveOne';
		var USER_UPDATE_ONE_API_URL = 'api/user/updateOne';
		var USER_DELETE_ONE_API_URL = 'api/user/deleteOne';


		this.findAll =function(){

			var deferred = $q.defer();

			HttpService.fetchPostData(USER_FIND_ALL_API_URL).then(
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

			HttpService.fetchPostData(USER_FIND_ONE_API_URL,{id : id}).then(
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

			HttpService.fetchPostData(USER_SAVE_ONE_API_URL, userData).then(
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

			HttpService.fetchPostData(USER_UPDATE_ONE_API_URL , userData).then(
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

			HttpService.fetchPostData( USER_DELETE_ONE_API_URL , userData).then(
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
