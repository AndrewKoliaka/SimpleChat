app.factory('$httpLoadingInterceptor', function ($rootScope) {
    return {
        request (req) {
            $rootScope.isLoading = true;

            return req;
        },
        response (res) {
            $rootScope.isLoading = false;

            return res;
        }
    };
});
