(function() {
	'use strict';

	angular
	.module('productManagement')
	.config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	function stateConfig($stateProvider) {

		$stateProvider.state('product', {
			parent: 'app',
			url: '/product',
			views: {
				'content@': {
					templateUrl: 'app/entities/product/product.html',
					controller: 'ProductController',
					controllerAs: 'vm'
				}
			}
		});
	}
})();