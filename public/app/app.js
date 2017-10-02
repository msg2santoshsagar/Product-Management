(function() {
	'use strict';

	var app = angular
	.module('productManagement', [
		'ngStorage',
		'ngSanitize',
		'ui.router',
		'ui.bootstrap',
		'ui.grid',
		'ui.grid.resizeColumns',
		'ui.grid.edit',
		'ui.grid.selection',
		'ui.select'
		]);

	app.config(config);
	app.run(run);

	run.$inject = ['stateHandler','AuthService'];
	function run(stateHandler,AuthService) {
		stateHandler.initialize();
		AuthService.getCurrentUser();
		
	}

	config.$inject = ['$locationProvider'];
	function config($locationProvider){
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true
		}).hashPrefix('!')
	}

})();
