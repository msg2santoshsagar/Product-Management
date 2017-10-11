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
		'ui.select',
		'ngDesktopNotification'
		]);

	app.config(config);
	app.run(run);

	run.$inject = ['stateHandler','AuthService','desktopNotification'];
	function run(stateHandler,AuthService,desktopNotification) {
		stateHandler.initialize();
		AuthService.getCurrentUser();

		if( desktopNotification.isSupported() ){
			console.log("Current Permission : ",desktopNotification.currentPermission());

			if( desktopNotification.currentPermission() ===  desktopNotification.permissions.granted){
				console.info("Notification permission already available");
			}else{
				desktopNotification.requestPermission().then(function successCallback(){
					console.info("User approved notification permisson");
				}, function errorCallback(){
					console.warn("User rejected notification permisson");
				});
			}

		}else{
			console.warn("This browser doesn't support Notification API");
		}

	}

	config.$inject = ['$locationProvider'];
	function config($locationProvider){
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true
		}).hashPrefix('!')
	}

})();
