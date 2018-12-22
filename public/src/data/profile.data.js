app.service('$profileData', function ($data) {
	this.getUser = id => $data.getUser(id);
	this.updateUser = (id, userData = {}) => $data.updateUser(id, userData);
	this.deleteUser = id => $data.deleteUser(id);
});
