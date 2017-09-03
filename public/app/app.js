(function() {
	'use strict';

	var app = angular
	.module('productManagement', [
		'ngStorage',
		'ui.router',
		'ui.bootstrap',
		'ui.grid'
		]);

	app.config(config);
	app.run(run);

	run.$inject = ['stateHandler'];
	function run(stateHandler) {
		stateHandler.initialize();
	}

	config.$inject = ['$locationProvider'];
	function config($locationProvider){
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true
		}).hashPrefix('!')
	}

})();
