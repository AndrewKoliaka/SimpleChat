app.controller('auth.controller', function ($scope, $errorAlert, $authData, $state) {
    this.$onInit = () => {
        $scope.auth = {
            data: {
                name: '',
                email: '',
                password: '',
                passwordRepeat: ''
            },
            isSpinner: false
        }
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
            .then(() => $state.go('home'))
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
            .then(() => $state.go('home'))
            .catch($errorAlert.show)
            .finally(this._hideSpinner);
    }

    this.signOut = () => {
        $authData.signOut()
            .then(() => $state.go('login'))
            .catch($errorAlert.show);
    }
});
