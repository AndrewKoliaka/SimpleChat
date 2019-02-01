app.directive('popup', function () {
    return {
        restrict: 'A',
        scope: {
            model: '=popup',
            options: '<?popupOptions'
        },
        templateUrl: '../views/popup.html',
        transclude: {
            title: 'popupTitle',
            body: 'popupBody',
            footer: '?popupFooter'
        },
        controllerAs: 'ctrl',
        controller ($scope) {
            this.$onInit = () => {
                $scope.options = $scope.options || {};
            };

            this.close = () => {
                $scope.model.isActive = false;
            };
        }
    };
});
