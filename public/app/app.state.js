(function() {
	'use strict';

	angular
	.module('productManagement')
	.config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	function stateConfig($stateProvider) {

		console.log("app state js 12");

		$stateProvider.state('app', {
			abstract: true,
			views: {
				'navbar@': {
					templateUrl: 'app/layouts/navbar/navbar.html',
					controller: 'NavbarController',
					controllerAs: 'vm'
				}
			}
		});
	}
})();