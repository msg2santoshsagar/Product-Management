(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('ProductController', ProductController);

	ProductController.$inject = ['$scope', '$state','$uibModal','UserService'];

	function ProductController ($scope, $state, $uibModal,UserService) {
		var vm = this;

		vm.gridOptions = {
				enableGridMenu: true,
				enableSorting: true,
				enableFiltering: true,
				columnDefs: [
					{ name : 'Action',width: '8%',enableFiltering: false,cellTemplate: "<div ng-if='row.entity.userid !== \"ADMIN\" ' ><button class='btn btn-primary btn-sm' ng-click='grid.appScope.editUser(row.entity.id)'><span class='glyphicon glyphicon-pencil'></span></button><button class='btn btn-primary btn-sm' ng-click='grid.appScope.openDeleteDialogBox(row.entity.id)'><span class='glyphicon glyphicon-remove'></span></button></div>" },
					{ field : 'id', name: 'id', displayName : 'ID' },
					{ field : 'userid', name: 'userid', displayName : 'User Id' },
					{ field : 'role', name : 'role', displayName : 'Role' },
					{ field : 'name', name : 'name', displayName : 'Name' },
					{ field : 'active', name: 'active', displayName : 'Active' }
					]
		};

		function init(){
			UserService.findAll().then(
					function(response){
						vm.gridOptions.data = response.data;
					},function(errData){
						console.error("Error Occured while fetchig user data");
					}
			);
		}

		function openEditDialog(data, isEditMode){

			$uibModal.open({
				templateUrl: 'app/entities/user/user-dialog.html',
				controller: 'UserDialogController',
				controllerAs: 'vm',
				backdrop: 'static',
				size: 'lg',
				resolve: {
					entity: function () {
						return data;
					}
				}
			}).result.then(
					function(res){
						init();
					},function(err){
						init();
					});
		}

		vm.creteUser = function (){
			var data =  {
					name: null,
					role: null,
					userid: null,
					password: null,
					active: null
			};
			openEditDialog(data, false);
		};

		vm.editUser = function (id){
			console.log("Request to edit user with id ",id);
			openEditDialog(UserService.findOne(id));
		};

		$scope.editUser = vm.editUser;

		$scope.openDeleteDialogBox = function( id ){
			$uibModal.open({
				templateUrl: 'app/entities/user/user-delete-dialog.html',
				controller: 'UserDeleteController',
				controllerAs: 'vm',
				backdrop: 'static',
				size: 'lg',
				resolve: {
					entity: function () {
						return {id : id};
					}
				}
			}).result.then(
					function(res){
						init();
					},function(err){
						init();
					});
		}

		init();


	}
})();
