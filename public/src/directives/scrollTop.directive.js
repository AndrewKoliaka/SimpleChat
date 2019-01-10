app.directive('scrollTop', function ($window) {
    return {
        restrict: 'A',
        controllerAs: 'ctrl',
        template: `
            <div data-ng-if="isVisible" data-ng-click="ctrl.scrollToTop()" class="scroll-top s-circle bg-primary c-hand">
                <i class="icon icon-upward"></i>
            </div>
        `,
        link ($scope) {
            $window.addEventListener('scroll', () => {
                let previousIsVisible = $scope.isVisible;

                $scope.isVisible = $window.scrollY > 500;

                if (previousIsVisible !== $scope.isVisible) {
                    $scope.$apply();
                }
            });
        },
        controller ($scope) {
            this.$onInit = () => {
                $scope.isVisible = false;
            };

            this.scrollToTop = () => {
                $window.scrollTo(0, 0);
            };
        }
    };
});
