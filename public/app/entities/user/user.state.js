(function() {
	'use strict';

	angular
	.module('productManagement')
	.config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	function stateConfig($stateProvider) {

		$stateProvider.state('user', {
			parent: 'app',
			url: '/user',
			views: {
				'content@': {
					templateUrl: 'app/entities/user/user.html',
					controller: 'UserController',
					controllerAs: 'vm'
				}
			}
		});
	}
})();