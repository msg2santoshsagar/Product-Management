(function() {
	'use strict';

	angular
	.module('productManagement')
	.directive('hasAnyAuthority', hasAnyAuthority);

	hasAnyAuthority.$inject = ['AuthService'];

	function hasAnyAuthority(AuthService) {
		var directive = {
				restrict: 'A',
				link: linkFunc
		};

		return directive;

		function linkFunc(scope, element, attrs) {
			var authorities = attrs.hasAnyAuthority.replace(/\s+/g, '').split(',');

			var setVisible = function () {
				element.removeClass('hidden');
			},
			setHidden = function () {
				element.addClass('hidden');
			},
			defineVisibility = function (reset) {
				var result;
				if (reset) {
					setVisible();
				}

				result = AuthService.hasAnyAuthority(authorities);
				if (result) {
					setVisible();
				} else {
					setHidden();
				}
			};

			if (authorities.length > 0) {
				defineVisibility(true);

				scope.$watch(function() {
					return AuthService.isAuthenticated();
				}, function() {
					defineVisibility(true);
				});
			}
		}
	}
})();
