(function() {
	'use strict';


	function ngTopMargin(){

		function linkFunc(scope, element, attrs) {
			element[0].style.marginTop  = attrs.ngTopMargin;
		}

		var directive = {
				restrict: 'C',
				link: linkFunc
		};
		return directive;

	}


	angular
	.module('productManagement')
	.directive('ngTopMargin', ngTopMargin);


})();