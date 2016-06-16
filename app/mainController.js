(function() {
    angular
        .module('app')
        .controller('mainController', MainController);

    function MainController($scope) {
        $scope.sortType = ''; // set the default sort type
        $scope.sortReverse = false; // set the default sort order
        $scope.searchItem = ''; // set the default search/filter term
        $scope.products = [{
            name: "Товар 1",
            count: 5,
            price: 12000,
            email: "abc@example.com"
        }, {
            name: "Товар 3",
            count: 5,
            price: 12001,
            email: "def@example.com"
        }, {
            name: "Товар 5",
            count: 4,
            price: 12002,
            email: "abc@example.com"
        }, {
            name: "Товар 4",
            count: 7,
            price: 12020,
            email: "ser"
        }, {
            name: "Товар 2",
            count: 7,
            price: 12020,
            email: "tgy"
        }];

        $scope.addRow = function() {
            $scope.products.push({
                'name': $scope.name,
                'email': $scope.email,
                'count': $scope.count,
                'price': $scope.price
            });
            $scope.name = '';
            $scope.email = '';
            $scope.count = '';
            $scope.price = '';
            $('#myModal').modal("hide");
        };


        $scope.modalShown = false;
        $scope.changeModal = function(product) {
            $scope.editProduct = product;
            $scope.modalShown = !$scope.modalShown;
        };
        $scope.modalInfoShown = false;
        $scope.infoModal = function(product) {
            $scope.infoProduct = product;
            $scope.modalInfoShown = !$scope.modalInfoShown;
        };
        $scope.modalDeleteShown = false;
        $scope.deleteModal = function(product) {
            $scope.deleteProduct = product;
            $scope.modalDeleteShown = !$scope.modalDeleteShown;
        };

        $scope.validForm = false; // сохранять или нет форму
        $scope.myAction = function(isValid) {
            if (isValid) {
                $scope.validForm = true;
                //You can place your ajax call/http request here
            } else {
                $scope.validForm = false;
                $('ng-disabled').$invalid;
                $('input.ng-invalid').first().focus();

            }
        };
    }
})();