app.service('$profileData', function ($data) {
	this.getUser = id => $data.user.get(id).$promise;
	this.updateUser = (id, userData = {}) => $data.user.update({ id }, userData).$promise;
	this.deleteUser = id => $data.user.delete({ id }).$promise;
});
