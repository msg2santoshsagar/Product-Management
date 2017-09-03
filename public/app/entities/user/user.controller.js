(function() {
	'use strict';

	angular
	.module('productManagement')
	.controller('UserController', UserController);

	UserController.$inject = ['$scope', '$state','$uibModal','HttpService'];

	function UserController ($scope, $state, $uibModal,HttpService) {
		var vm = this;

		vm.gridOptions = {
				enableGridMenu: true,
				enableSorting: true,
				enableFiltering: true,
				columnDefs: [
					{ name : 'Action',width: '8%',enableFiltering: false },
					{ field : 'id', name: 'id', displayName : 'ID' },
					{ field : 'userid', name: 'userid', displayName : 'User Id' },
					{ field : 'role', name : 'role', displayName : 'Role' },
					{ field : 'name', name : 'name', displayName : 'Name' },
					{ field : 'active', name: 'active', displayName : 'Active' }
					]
		};

		function openEditDialog(data){

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
			openEditDialog(data);
		};


		function init(){
			HttpService.fetchPostData('api/user/findAll').then(
					function(response){
						vm.gridOptions.data = response.data;
					},function(errData){
						console.error("Error Occured while fetchig user data");
					}
			);
		}

		init();


	}
})();
