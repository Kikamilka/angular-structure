(function() {
    angular
        .module('app')
        .directive('countValidator', countValidator);

    function countValidator() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attr, mCtrl) {
                function myValidation(value) {
                    if (value > -1 && value != null) {
                        mCtrl.$setValidity('countValidator', true);
                    } else {
                        mCtrl.$setValidity('countValidator', false);
                    }
                    return value;
                }
                mCtrl.$parsers.push(myValidation);
            }
        }
    }
})();