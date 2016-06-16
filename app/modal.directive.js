(function() {
    angular
        .module('app')
        .directive('modal', modal);

    function modal($filter) {
        return {
            template: '<div class="modal fade">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title">{{ title }}</h4>' +
                '</div>' +
                '<div class="modal-body" ng-transclude></div>' +
                '</div>' +
                '</div>' +
                '</div>',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function(value) {
                    if (value == true) {
                        $(element).modal('show');
                    } else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function() {
                    scope.$apply(function() {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function() {
                    scope.$apply(function() {
                        scope.$parent[attrs.visible] = false;
                    });
                });

                //Add/Edit modal open
                $('#modalChange').on("show.bs.modal", function() {
                    console.log("Edit" + scope.$parent.editProduct);
                    if (scope.$parent.editProduct == null) {
                        scope.title = "Add product";
                    } else {
                        scope.title = "Edit product";
                        $("#nameModal").val(scope.$parent.editProduct.name);
                        $("#priceModal").val(scope.$parent.editProduct.price);
                        $("#countModal").val(scope.$parent.editProduct.count);
                        $("#emailModal").val(scope.$parent.editProduct.email);
                    }
                });

                //Add/Edit modal hidden      
                $('#modalChange').on("hidden.bs.modal", function() {
                    $("#nameModal, #emailModal").val("");
                    $("#countModal").val("");
                    $("#priceModal").val("");
                });

                // Info modal open
                $("#modalInfo").on("show.bs.modal", function() {
                    scope.title = "Info about product";
                    $("#nameInfo").text(scope.$parent.infoProduct.name);
                    $("#priceInfo").text($filter('currency')(scope.$parent.infoProduct.price));
                    $("#countInfo").text(scope.$parent.infoProduct.count);
                    $("#emailInfo").text(scope.$parent.infoProduct.email);
                });

                //Delete modal open
                $("#modalDelete").on("show.bs.modal", function() {
                    scope.title = "Are you sure?";
                    $("#question").text("Are you sure you want to delete product " + scope.$parent.deleteProduct.name + "?");
                });

                // Add/Edit product
                $("#doneProd").on("click", function() {
                    if ($("#nameModal").val()) {
                        if (scope.$parent.editProduct == null) {
                            if (scope.$parent.validForm) {
                                scope.$parent.products.push({
                                    name: $("#nameModal").val(),
                                    price: parseFloat($("#priceModal").val(), 10),
                                    count: parseInt($("#countModal").val(), 10),
                                    email: $("#emailModal").val()
                                });
                            }
                            console.log("add" + $("#nameModal").val());
                        } else {
                            if (scope.$parent.validForm) {
                                scope.$parent.products[
                                    scope.$parent.products
                                    .indexOf(scope.$parent.editProduct)
                                ] = {
                                    name: $("#nameModal").val(),
                                    price: parseFloat($("#priceModal").val(), 10),
                                    count: parseInt($("#countModal").val(), 10),
                                    email: $("#emailModal").val()
                                };
                            }
                            console.log("edit" + $("#nameModal").val());
                        }
                        if (scope.$parent.validForm) {
                            $('#modalChange').modal("hide");
                            $("#nameModal, #emailModal").val("");
                            $("#countModal").val("");
                            $("#priceModal").val("");
                        }
                    }
                });

                //Delete product
                $("#yesDelete").on("click", function() {
                    scope.$parent.products
                        .splice(scope.$parent.products
                            .indexOf(scope.$parent.deleteProduct), 1);
                    $("#modalDelete").modal("hide");
                });
                $("#noDelete").on("click", function() {
                    $("#modalDelete").modal("hide");
                });
            }
        }
    }
})();