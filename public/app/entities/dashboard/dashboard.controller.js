(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$state', 'ProductService','$window','$timeout','desktopNotification'];

	function DashboardController ($scope, $state, ProductService,$window,$timeout,desktopNotification) {
		var vm = this;

		var WEBSOCKET_END_POINT = "/websocket";
		var sock  				= null;
		var showNotificationFlag = desktopNotification.isSupported() && desktopNotification.currentPermission() ===  desktopNotification.permissions.granted;

		var rowtpl='<div class="color-white" ><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader , \'backgroud-green\':row.entity.current_stock >= row.entity.threshold_stock, \'background-red\':row.entity.current_stock < row.entity.threshold_stock }" ui-grid-cell></div></div>';


		vm.dashBoardOption = {
				enableGridMenu : true,
				enableSorting : true,
				enableFiltering : true,
				rowTemplate: rowtpl,
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


		/**
		 * 	options.body - the message of the notification
		 *	options.icon - a string path of an icon, jpg and etc.
		 *	options.autoClose - a boolean property that will close the notification after the duration specified (Defaults to true)
		 *	options.duration - an integer that will set the seconds before the notification is automatically closed (Defaults to 5)
		 *	options.showOnPageHidden - a boolean property that will only show the notification if the page is hidden (Defaults to false)
		 *	options.onClick*/
		function showNotification(title , options){
			if ( showNotificationFlag ){
				desktopNotification.show(title, options);
			}
		}


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
			var productName = null

			if(productList === null || productList.length === 0){
				return;
			}

			for(var i = 0; i < productList.length ;i++){

				var product = productList[i]; 

				if( product.id === productData.id ){
					console.log("Data matched update it");
					product.name 			= productData.name;
					productName 			= productData.name;
					product.price	 		= productData.price;
					product.threshold_stock = productData.threshold_stock;
				}
			}

			setDashboardProductList( productList );

			if(productName !== null){
				showNotification("Product Detail Updated",{
					"body" 				: productName+" detail updated in product list",
					"autoClose" 		: true,
					"duration" 			: 30,
					"showOnPageHidden" 	: false
				});
			}


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


			showNotification("New Product Added",{
				"body" 				: productData.name+" got added in product list",
				"autoClose" 		: true,
				"duration" 			: 30,
				"showOnPageHidden" 	: false
			});

		}

		function handleProductOrderAddedEvent(productData){

			var productList = vm.dashBoardOption.data;

			if(productList === null || productList === undefined){
				return;
			}

			for(var i = 0; i < productList.length ;i++){

				var product = productList[i]; 

				if( product.id === productData.product_id ){

					product.price 			= productData.price;
					product.current_stock 	= productData.current_stock;

				}
			}
			setDashboardProductList( productList );


			showNotification("Product Detail updated",{
				"body" 				: "Some of the product detail got updated",
				"autoClose" 		: true,
				"duration" 			: 30,
				"showOnPageHidden" 	: true
			});
		}

		function handleNewOrderPlaced(param){

			var productList = vm.dashBoardOption.data;

			if(productList === null || productList.length === 0){
				return;
			}

			for(var i = 0; i < productList.length ;i++){

				var product = productList[i]; 

				for(var j = 0; j < param.length; j++){

					if(product.id === param[j].id){
						product.current_stock = param[j].quantity;
					}

				}

			}

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
			
			showNotification("Product Removed",{
				"body" 				: productData.name+" product is removed from product list",
				"autoClose" 		: true,
				"duration" 			: 30,
				"showOnPageHidden" 	: false
			});
		}

		function dashBoardUpdateEventHandler(data){
			console.log('dashBoardUpdateEventHandler :: ', data);
			var eventCode = data.code;
			var eventData = data.data;

			switch(eventCode){
			case 'PRODUCT_ADDED'   : handleProductAddedEvent(eventData);
			break;
			case 'PRODUCT_UPDATED' : handleProductUpdatedEvent(eventData);
			break;
			case 'PRODUCT_DELETED' : handleProductDeletedEvent(eventData);
			break;
			case 'PRODUCT_ORDER_ADDED' : handleProductOrderAddedEvent(eventData);
			break;
			case 'NEW_ORDER_PLACED' : handleNewOrderPlaced(eventData);
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
			sock.close();
		});
		
		
		const messaging = firebase.messaging();
		
		messaging.requestPermission()
		.then(function() {
		  console.log('Notification permission granted.');
		  // TODO(developer): Retrieve an Instance ID token for use with FCM.
		// Get Instance ID token. Initially this makes a network call, once retrieved
		  // subsequent calls to getToken will return from cache.
		  messaging.getToken()
		  .then(function(currentToken) {
		    if (currentToken) {
		      sendTokenToServer(currentToken);
		      updateUIForPushEnabled(currentToken);
		    } else {
		      // Show permission request.
		      console.log('No Instance ID token available. Request permission to generate one.');
		      // Show permission UI.
		      updateUIForPushPermissionRequired();
		      setTokenSentToServer(false);
		    }
		  })
		  .catch(function(err) {
		    console.log('An error occurred while retrieving token. ', err);
		    showToken('Error retrieving Instance ID token. ', err);
		    setTokenSentToServer(false);
		  });
		
		})
		.catch(function(err) {
		  console.log('Unable to get permission to notify.', err);
		});
		
		
		
		

	}
})();
