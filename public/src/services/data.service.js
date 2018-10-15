app.service('$data', function ($resource, $api) {
	this.login = params => $resource($api.login).save(params).$promise;
	this.register = params => $resource($api.register).save(params).$promise;
});
