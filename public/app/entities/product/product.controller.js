(function() {
	'use strict';

	angular.module('productManagement').controller('ProductController',
			ProductController);

	ProductController.$inject = [ '$scope', '$state', '$uibModal',
			'ProductService' ];

	function ProductController($scope, $state, $uibModal, ProductService) {
		var vm = this;

		vm.gridOptions = {
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
						field : 'current_stock',
						name : 'current_stock',
						displayName : 'Current Stock'
					}, {
						field : 'threshold_stock',
						name : 'threshold_stock',
						displayName : 'Threshold Stock'
					} ]
		};

		function init() {
			ProductService.findAll().then(function(response) {
				vm.gridOptions.data = response.data;
			}, function(errData) {
				console.error("Error Occured while fetchig user data");
			});
		}

		function openEditDialog(data, isEditMode) {

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
				init();
			}, function(err) {
				init();
			});
		}

		vm.createProduct = function() {
			var data = {
				id : null,
				name : null
			};
			openEditDialog(data, false);
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
				init();
			}, function(err) {
				init();
			});
		};

		init();

	}
})();
