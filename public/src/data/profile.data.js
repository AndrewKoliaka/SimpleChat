app.service('$profileData', function ($data) {
    this.updateUser = (id, userData = {}) => $data.user.update({ id }, userData).$promise;
    this.deleteUser = id => $data.user.delete({ id }).$promise;
});
