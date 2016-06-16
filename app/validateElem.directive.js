(function() {
    angular
        .module('app')
        .directive('validateElem', validateElem);

    function validateElem($filter) {
        return {
            restrict: 'AC',
            link: function(scope, element, attrs) {
                element.val($filter('currency')(scope.amount));

                element.bind('focus', function() {
                    element.val(scope.amount);
                });

                element.bind('input', function() {
                    scope.amount = element.val();
                    scope.$apply();
                });

                element.bind('blur', function() {
                    element.val($filter('currency')(scope.amount));
                });
            }
        };
    }
})();