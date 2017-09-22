/*jshint esversion: 6 */

(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('SaleController', SaleController);

	SaleController.$inject = ['$scope', '$state','$uibModal','ProductService','$window','uiGridConstants','$timeout'];

	function SaleController ($scope, $state, $uibModal,ProductService,$window,uiGridConstants,$timeout) {
		var vm = this;

		vm.availableProductList = [];

		var orderList = [];

		vm.orderGridOptions = {
				enableGridMenu: false,
				enableSorting: false,
				enableFiltering: false,
				enableColumnMenus: false,
				enableRowSelection: true,
				enableRowHeaderSelection: false,
				multiSelect : false,
				showGridFooter:false,
				showColumnFooter: false,
				columnDefs: [
					{ 
						name : 'Action',
						width: '4%',
						enableFiltering: false,
						cellTemplate: "<div></button><button class='btn btn-primary btn-xs' ng-click='grid.appScope.removeProduct(row.entity.id)'><span class='glyphicon glyphicon-remove'></span></button></div>",
						enableCellEdit : false 
					},
					{ 
						field : 'id',
						name: 'product_id',
						displayName : 'Product ID',
						type: 'number',
						enableCellEdit : false 
					},
					{ 
						field : 'name',
						name: 'name',
						displayName : 'Product Name',
						enableCellEdit : false 
					},
					{ 
						field : 'price', 
						name : 'price', 
						displayName : 'Price Per Unit',
						type: 'number',
						enableCellEdit : true 
					},
					{ 
						field : 'quantity', 
						name : 'quantity',
						displayName : 'Quantity',
						type: 'number',
						enableCellEdit : true 
					},
					{ 
						field : 'total',
						name: 'total',
						displayName : 'Total',
						type: 'number',
						enableCellEdit : false /*,
						aggregationType: uiGridConstants.aggregationTypes.sum, 
						aggregationHideLabel: false*/
					}
					],
					onRegisterApi : function(gridApi){
						$scope.gridApi = gridApi;
						gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
							console.log("Row Edidted --> ",rowEntity);
							rowEntity.total = rowEntity.price * rowEntity.quantity;
							$scope.calculateGrandTotal();
						});
					}
		};


		function initAvailableProductList(){
			ProductService.findAll().then(
					function(response){
						vm.availableProductList = response.data;
					},function(errResponse){
						console.error("Error occured while fetching product list ",errResponse);
					});
		}

		function setFocustToProductName(){
			var elem = $window.document.getElementById("product");
			if(elem !== null || elem !== undefined){
				elem.focus();
			}
		}

		function init(){
			initAvailableProductList();
			vm.orderGridOptions.data = [];
			setFocustToProductName();
			vm.product = {};
			vm.product.quantity = 1;
			vm.grandTotal = 0;
			/*var product = new Product();
			vm.orderGridOptions.data=[];
			vm.orderGridOptions.data.push(product);*/
		}
		init();

		vm.refresh = function(){
			init();
		};

		function calculateGrandTotal(){
			var currentProductList = vm.orderGridOptions.data;
			var grandTotal		   = 0;

			for(var i = 0; i < currentProductList.length; i++ ){
				var cp = currentProductList[i];
				grandTotal = grandTotal + cp.total;
			}

			$timeout(function(){
				vm.grandTotal = grandTotal;
			},0);
		}
		$scope.calculateGrandTotal =calculateGrandTotal;


		function removeProduct(id){
			var currentProductList = vm.orderGridOptions.data;
			var productListToUpdate = [];

			for(var i = 0; i < currentProductList.length; i++ ){
				var cp = currentProductList[i];
				if(cp.id !== id ){
					productListToUpdate.push(cp);
				}
			}
			$timeout(function(){
				vm.orderGridOptions.data = productListToUpdate;
				calculateGrandTotal();
			},0);
		}
		$scope.removeProduct =removeProduct;

		vm.totalProductCount = function(data){
			if(data === null || data === undefined || data.length === 0){
				return 0;
			}
			var totalProductCount = 0;

			for(var i = 0; i < data.length; i++ ){
				var cp = data[i];
				totalProductCount = totalProductCount + cp.quantity;
			}
			return totalProductCount;

		};


		function addProductToList(product){

			console.log("Add Product to list entry ::",product);

			var currentProductList = vm.orderGridOptions.data;
			var isProductExist 	   = false;

			for(var i = 0; i < currentProductList.length; i++ ){
				var cp = currentProductList[i];
				if(cp.id === product.id){
					isProductExist = true;
					cp.quantity   = parseInt(cp.quantity) + parseInt(product.quantity); 
					cp.total 	  = cp.price * cp.quantity;
				}
			}

			if(!isProductExist){
				vm.orderGridOptions.data.push(product);	
			}

			$timeout(function(){
				vm.orderGridOptions.data = currentProductList;
				calculateGrandTotal();
			},0);
		}

		vm.addProductToList = function(){
			console.log("Add Product To List Called");
			var product = vm.product;
			console.log("Product ==> ",product);

			if(product.selectedProduct === undefined){
				return;
			}

			var productObj = {};
			productObj.id  		= product.selectedProduct.id;
			productObj.name  	= product.selectedProduct.name;
			productObj.price  	= product.selectedProduct.price;
			productObj.quantity = product.quantity;
			productObj.total	= productObj.price * productObj.quantity ;

			addProductToList(productObj);

		};
		
		function validateProductList(productList){
			return true;
		}
		
		vm.createOrder = function (){
			var productList = vm.orderGridOptions.data;
			
			if( ! validateProductList(productList) ){
				$window.alert("product list validation failed");
				return;
			}
			
			console.log("Data to create order ==> ");
			console.log( JSON.stringify(productList) );
			
			
			
		};
		
		


	}
})();
