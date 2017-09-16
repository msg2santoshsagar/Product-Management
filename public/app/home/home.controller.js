(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'ProductService','$window','$timeout'];

	function HomeController ($scope, $state, ProductService,$window,$timeout) {
		var vm = this;

		var WEBSOCKET_END_POINT = "/websocket";
		var sock  				= null;

		vm.dashBoardOption = {
				enableGridMenu : true,
				enableSorting : true,
				enableFiltering : true,
				//rowTemplate: '<div ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}" ng-cell></div>',
				columnDefs : [
					{
						field : 'id',
						name : 'id',
						displayName : 'ID',
						cellTooltip : true
					}, {
						field : 'name',
						name : 'name',
						displayName : 'Name',
						cellTooltip : true
					}, {
						field : 'price',
						name : 'price',
						displayName : 'Price',
						cellTooltip : true
					}, {
						field : 'current_stock',
						name : 'current_stock',
						displayName : 'Current Stock',
						cellTooltip : true
					}, {
						field : 'threshold_stock',
						name : 'threshold_stock',
						displayName : 'Threshold Stock',
						cellTooltip : true
					} ]
		};


		function initProductList() {
			ProductService.findAll().then(function(response) {
				vm.dashBoardOption.data = response.data;
			}, function(errData) {
				console.error("Error Occured while fetchig product data ",errData);
			});
		}

		function setDashboardProductList(data){
			console.log(" setDashboardProductList ===>  ",data);
			$timeout(function(){
				vm.dashBoardOption.data = data;
			},0);
		}

		function handleProductUpdatedEvent(productData){

			var productList = vm.dashBoardOption.data;

			if(productList === null || productList.length === 0){
				return;
			}

			for(var i = 0; i < productList.length ;i++){

				var product = productList[i]; 

				if( product.id === productData.id ){
					console.log("Data matched update it");
					product.name 			= productData.name;
					product.price	 		= productData.price;
					product.threshold_stock = productData.threshold_stock;
				}
			}

			setDashboardProductList( productList );
		}

		function handleProductAddedEvent(productData){

			var productList = vm.dashBoardOption.data;

			if(productList === null || productList === undefined){
				productList = [];
			}

			var product 			= {};
			product.id				= productData.id;
			product.current_stock	= 0;
			product.name 			= productData.name;
			product.price	 		= productData.price;
			product.threshold_stock = productData.threshold_stock;

			productList.push(product);

			setDashboardProductList( productList );
		}

		function handleProductDeletedEvent(productData){

			var productList = vm.dashBoardOption.data;
			var productListToUpdate = [];

			if(productList === null || productList.length === 0){
				return;
			}

			for(var i = 0; i < productList.length ;i++){

				var product = productList[i]; 

				if( product.id !== productData.id ){
					productListToUpdate.push(product);
				}
			}

			setDashboardProductList( productListToUpdate );
		}

		function dashBoardUpdateEventHandler(data){
			console.log('dashBoardUpdateEventHandler :: ', data);
			var eventCode = data.code;
			var eventData = data.data;

			switch(eventCode){
			case 'PRODUCT_ADDED' : handleProductAddedEvent(eventData);
			break;
			case 'PRODUCT_UPDATED' : handleProductUpdatedEvent(eventData);
			break;
			case 'PRODUCT_DELETED' : handleProductDeletedEvent(eventData);
			break;
			default : console.error("No Handler defined for event :: ",eventCode);

			}
		}

		function init(){
			initProductList();

			sock = new $window.SockJS(WEBSOCKET_END_POINT);
			sock.onopen = function() {
				console.log('connection established');
			};

			sock.onmessage = function(e) {
				dashBoardUpdateEventHandler(JSON.parse(e.data));

			};

			sock.onclose = function() {
				console.log('close');
			};


		}

		init();

		$scope.$on('$destroy', function() {
			//sock.close();
		});

	}
})();
