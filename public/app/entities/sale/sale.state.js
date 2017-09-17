(function() {
	'use strict';

	angular
	.module('productManagement')
	.config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	function stateConfig($stateProvider) {

		$stateProvider.state('sale', {
			parent: 'app',
			url: '/sale',
			views: {
				'content@': {
					templateUrl: 'app/entities/sale/sale.html',
					controller: 'SaleController',
					controllerAs: 'vm'
				}
			}
		});
	}
})();