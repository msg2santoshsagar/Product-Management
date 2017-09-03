(function() {
	'use strict';

	var app = angular
	.module('productManagement', [
		'ngStorage',
		'ui.router',
		'ui.bootstrap'

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
			requireBase: false
		}).hashPrefix('!')
	}

})();
