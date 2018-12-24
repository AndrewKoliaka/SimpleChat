app.service('$userData', function ($data) {
    this.getUserList = () => $data.user.getAll().$promise;
    this.blockUser = id => $data.user.block({ id }).$promise;
    this.unBlockUser = id => $data.user.unBlock({ id }).$promise;
});
