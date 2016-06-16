(function() {
    angular
        .module('app')
        .directive('nameValidator', nameValidator);

    function nameValidator() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attr, mCtrl) {
                function myValidation(value) {
                    if (value != "" && value.length < 16 && /[^\s]/.test(value)) {
                        mCtrl.$setValidity('nameValidator', true);
                    } else {
                        mCtrl.$setValidity('nameValidator', false);
                    }
                    return value;
                }
                mCtrl.$parsers.push(myValidation);
            }
        }
    }
})();