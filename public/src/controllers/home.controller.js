app.controller('home.controller', function($scope, $data, $errorAlert) {
    this.$onInit = () => {
        $data.getRooms()
            .then(this._onRoomsLoad)
            .catch($errorAlert.show);
    }

    this._onRoomsLoad = (res) => {
        console.log(res)
    }
});
