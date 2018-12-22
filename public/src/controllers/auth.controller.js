app.controller('auth.controller', function ($scope, $errorAlert, $authData, $state) {
    this.$onInit = () => {
        $scope.auth = {
            data: {
                name: '',
                email: '',
                password: '',
                passwordRepeat: ''
            },
            isSpinner: false,
            userId: null
        }

        $scope.auth.userId = $authData.getUserId();
    }

    this._showSpinner = () => {
        $scope.auth.isSpinner = true;
    }

    this._hideSpinner = () => {
        $scope.auth.isSpinner = false;
    }

    this.checkIsLogged = () => $authData.isLogged();

    this.login = () => {
        if (
            !$scope.auth.data.email ||
            !$scope.auth.data.password
        ) return;

        this._showSpinner();
        $authData.login($scope.auth.data)
            .then(() => {
                $scope.auth.userId = $authData.getUserId();
                $state.go('rooms', { userId: $scope.auth.userId })
            })
            .catch($errorAlert.show)
            .finally(this._hideSpinner);
    }

    this.register = () => {
        if (
            !$scope.auth.data.email ||
            !$scope.auth.data.password ||
            !$scope.auth.data.passwordRepeat
        ) return;

        this._showSpinner();
        $authData.register($scope.auth.data)
            .then(() => {
                $scope.auth.userId = $authData.getUserId();
                $state.go('rooms', { userId: $scope.auth.userId })
            })
            .catch($errorAlert.show)
            .finally(this._hideSpinner);
    }

    this.signOut = () => {
        $authData.signOut()
            .then(() => $state.go('login'))
            .catch($errorAlert.show);
    }
});
