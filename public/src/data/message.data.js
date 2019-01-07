app.service('$messageData', function ($data) {
    this.updateMessage = (id, messageData) => $data.message.update({ id }, messageData).$promise;
    this.deleteMessage = id => $data.message.delete({ id }).$promise;
});
