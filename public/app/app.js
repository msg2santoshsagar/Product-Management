(function() {
	'use strict';

	angular
	.module('productManagement', [
		'ngStorage',
		'ui.router'

		])
		.run(run);

	run.$inject = ['stateHandler'];

	function run(stateHandler) {
		stateHandler.initialize();
	}
})();
