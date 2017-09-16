(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'ProductService'];

	function HomeController ($scope, $state, ProductService) {
		var vm = this;

		vm.dashBoardOption = {
				enableGridMenu : true,
				enableSorting : true,
				enableFiltering : true,
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

		initProductList();

	}
})();
