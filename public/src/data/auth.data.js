app.service('$authData', function ($data, $cookies, $q) {
    const tokenKey = 'token';

    this.isLogged = () => !!$cookies.get(tokenKey);

    this.decodeToken = () => {
        const token = $cookies.get(tokenKey);
        const decoded = {};

        decoded.header = JSON.parse(window.atob(token.split('.')[0]));
        decoded.payload = JSON.parse(window.atob(token.split('.')[1]));

        return decoded;
    };

    this.login = (loginData = {}) => $data.user.login(loginData).$promise;

    this.register = (registerData = {}) => $data.user.register(registerData).$promise;

    this.signOut = () => {
        const deferred = $q.defer();

        if (this.isLogged()) {
            $cookies.remove(tokenKey);
            deferred.resolve();
        } else {
            deferred.reject();
        }

        return deferred.promise;
    }
});
