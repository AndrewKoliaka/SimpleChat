app.factory('$httpResponseErrorInterceptor', function ($errorAlert) {
    return {
        responseError: $errorAlert.show
    };
});
