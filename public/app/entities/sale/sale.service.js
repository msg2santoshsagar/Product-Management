(function() {
	'use strict';

	angular
	.module('productManagement')
	.service('SaleService', SaleService);

	SaleService.$inject = ['$q','HttpService'];

	function SaleService ($q,HttpService) {

		var CREATE_ORDER_API = "api/sale/createOrder";

		this.createOrder =function( productList ){

			var deferred = $q.defer();

			HttpService.fetchPostData(CREATE_ORDER_API, productList).then(
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
