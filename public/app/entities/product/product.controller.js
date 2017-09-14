(function() {
	'use strict';

	angular.module('productManagement').controller('ProductController',
			ProductController);

	ProductController.$inject = [ '$scope', '$state', '$uibModal',
		'ProductService','ProductOrderHistoryService' ];

	function ProductController($scope, $state, $uibModal, ProductService,ProductOrderHistoryService) {
		var vm = this;

		vm.currentTabIndex = 0;

		function initProduct() {
			ProductService.findAll().then(function(response) {
				vm.productGridOptions.data = response.data;
			}, function(errData) {
				console.error("Error Occured while fetchig product data ",errData);
			});
		}

		function initProductOrderHistory() {
			ProductOrderHistoryService.findAllCustom().then(function(response) {
				vm.productOrderHistorygridOptions.data = response.data;
			}, function(errData) {
				console.error("Error Occured while fetchig product history data");
			});
		}

		vm.setTab =function(tabIndex){
			vm.currentTabIndex = tabIndex;
			if( tabIndex === 0 ){
				initProduct();
			}else if( tabIndex === 1 ){
				initProductOrderHistory();
			}
		};


		vm.productGridOptions = {
				enableGridMenu : true,
				enableSorting : true,
				enableFiltering : true,
				columnDefs : [
					{
						name : 'Action',
						width : '8%',
						enableFiltering : false,
						cellTemplate : "<div><button class='btn btn-primary btn-sm' ng-click='grid.appScope.editProduct(row.entity.id)'><span class='glyphicon glyphicon-pencil'></span></button><button class='btn btn-primary btn-sm' ng-click='grid.appScope.openDeleteDialogBox(row.entity.id)'><span class='glyphicon glyphicon-remove'></span></button></div>"
					}, {
						field : 'id',
						name : 'id',
						displayName : 'ID'
					}, {
						field : 'name',
						name : 'name',
						displayName : 'Name'
					}, {
						field : 'price',
						name : 'price',
						displayName : 'Price'
					}, {
						field : 'current_stock',
						name : 'current_stock',
						displayName : 'Current Stock'
					}, {
						field : 'threshold_stock',
						name : 'threshold_stock',
						displayName : 'Threshold Stock'
					} ]
		};



		vm.productOrderHistorygridOptions = {
				enableGridMenu : true,
				enableSorting : true,
				enableFiltering : true,
				columnDefs : [
					{
						field : 'id',
						name : 'id',
						displayName : 'ID'
					},{
						field : 'product_id',
						name : 'product_id',
						displayName : 'Product ID'
					}, {
						field : 'product_name',
						name : 'product_name',
						displayName : 'Product Name'
					}, {
						field : 'price',
						name : 'price',
						displayName : 'Price'
					}, {
						field : 'quantity',
						name : 'quantity',
						displayName : 'Quantity'
					}, {
						field : 'createdDate',
						name : 'createdDate',
						displayName : 'Date',
						cellTooltip : true
					} ]
		};






		function openEditDialog(data) {

			$uibModal.open({
				templateUrl : 'app/entities/product/product-dialog.html',
				controller : 'ProductDialogController',
				controllerAs : 'vm',
				backdrop : 'static',
				size : 'lg',
				resolve : {
					entity : function() {
						return data;
					}
				}
			}).result.then(function(res) {
				initProduct();
			}, function(err) {
				initProduct();
			});
		}

		vm.createProduct = function() {
			var data = {
					id : null,
					name : null
			};
			openEditDialog(data);
		};

		vm.editProduct = function(id) {
			console.log("Request to edit product with id ", id);
			openEditDialog(ProductService.findOne(id));
		};

		$scope.editProduct = vm.editProduct;

		$scope.openDeleteDialogBox = function(id) {
			$uibModal
			.open({
				templateUrl : 'app/entities/product/product-delete-dialog.html',
				controller : 'ProductDeleteController',
				controllerAs : 'vm',
				backdrop : 'static',
				size : 'lg',
				resolve : {
					entity : function() {
						return {
							id : id
						};
					}
				}
			}).result.then(function(res) {
				initProduct();
			}, function(err) {
				initProduct();
			});
		};


		function openProductEditDialog(data) {
			console.log("Request to open Product Edit Dialog");
			$uibModal.open({
				templateUrl : 'app/entities/product/product_order_history/product-order-history-dialog.html',
				controller : 'ProductOrderHistoryDialogController',
				controllerAs : 'vm',
				backdrop : 'static',
				size : 'lg',
				resolve : {
					entity : function() {
						return data;
					}
				}
			}).result.then(function(res) {
				initProductOrderHistory();
			}, function(err) {
				initProductOrderHistory();
			});
		}

		vm.createProductOrder = function() {
			var data = {
					id 				: 	null,
					product_id 		: 	null,
					product_name	:	null,
					quantity 		:	null

			};
			openProductEditDialog(data);
		};


		initProduct();

	}
})();
