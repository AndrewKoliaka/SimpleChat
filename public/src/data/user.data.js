app.service('$userData', function ($data) {
    this.getUserList = () => $data.user.getAll().$promise;
});
