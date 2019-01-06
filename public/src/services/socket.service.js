app.service('$socket', function () {
    this._socket = null;

    this.connect = () => {
        this._socket = io();
    };

    this.isConnected = () => this._socket && this._socket.connected;

    this.emit = (eventName, sendData, callbackFn) => this._socket.emit(eventName, sendData, callbackFn);

    this.on = (eventName, callbackFn) => this._socket.on(eventName, callbackFn);
});
