app.controller('auth.controller', function ($scope, $authData, $state) {
    this.$onInit = () => {
        $scope.auth = {
            data: {
                name: '',
                email: '',
                password: '',
                passwordRepeat: ''
            },
            userId: null
        };

        $scope.auth.userId = $authData.getUserId();
    };

    this.checkIsLogged = () => $authData.isLogged();

    this.login = async () => {
        if (
            !$scope.auth.data.email ||
            !$scope.auth.data.password
        ) return;

        await $authData.login($scope.auth.data);

        $scope.auth.userId = $authData.getUserId();
        $state.go('rooms');
    };

    this.register = async () => {
        if (
            !$scope.auth.data.email ||
            !$scope.auth.data.password ||
            !$scope.auth.data.passwordRepeat
        ) return;

        await $authData.register($scope.auth.data);

        $scope.auth.userId = $authData.getUserId();
        $state.go('rooms');
    };

    this.signOut = async () => {
        await $authData.signOut();

        $state.go('login');
    };
});
