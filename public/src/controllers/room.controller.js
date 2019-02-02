app.controller('room.controller', function (
    $scope, $state, $errorAlert, $anchorScroll,
    $roomData, $authData, $messageData, $userData,
    $socket, $socketEvents) {
    this.$onInit = () => {
        $scope.room = {
            userId: $authData.getUserId(),
            data: null,
            isTyping: false,
            editingMessageId: null,
            message: '',
            history: [],
            inviteUsersList: [],
            inviteUsersPopup: {
                isActive: false
            }
        };

        const { roomId } = $state.params;

        this._getRoomData(roomId);
        this._getHistory(roomId);

        $socket.connect();
        $socket.on($socketEvents.MESSAGE, data => {
            $scope.room.history.push(data);
            $scope.$apply();
        });
        $socket.on($socketEvents.MESSAGE_IS_TYPING, data => {
            $scope.room.isTyping = !!data.message;
            $scope.$apply();
        });
        $socket.on($socketEvents.ERROR, $errorAlert.show);
    };

    this._getRoomData = async roomId => {
        const { data } = await $roomData.getRoom(roomId);

        $scope.room.data = data;
    };

    this._getHistory = async roomId => {
        const { data } = await $roomData.getHistory(roomId);

        $scope.room.history = data;
    };

    this._onMessageUpdated = () => {
        this._getHistory($state.params.roomId);
        $scope.room.editingMessageId = null;
    };

    this.sendMessage = async () => {
        if (!$scope.room.message) return;

        const messageData = {
            roomId: $scope.room.data._id,
            text: $scope.room.message
        };

        if ($scope.room.editingMessageId) {
            await $messageData.updateMessage($scope.room.editingMessageId, messageData);

            this._onMessageUpdated();
        } else {
            $socket.emit($socketEvents.MESSAGE, messageData);
        }

        $scope.room.message = '';
    };

    this.onTypeMessage = () => $socket.emit($socketEvents.MESSAGE_IS_TYPING, $scope.room.message);

    this.checkIsMe = userId => userId === $scope.room.userId;

    this.scrollToLastMessage = () => $anchorScroll('lastMessage');

    this.editMessage = message => {
        $scope.room.editingMessageId = message._id;
        $scope.room.message = message.text;
    };

    this.deleteMessage = async messageId => {
        await $messageData.deleteMessage(messageId);

        this._getHistory($state.params.roomId);
    };

    this.openInvitePopup = () => {
        $scope.room.inviteUsersPopup.isActive = true;

        this._getInviteUserList();
    };

    this._getInviteUserList = async () => {
        const { data } = await $userData.getUserList();

        this._onInviteUserListLoaded(data);
    };

    this._onInviteUserListLoaded = userList => {
        const { participants } = $scope.room.data;
        const participantsIds = participants.map(participantItem => participantItem._id);

        $scope.room.inviteUsersList = userList.filter(user => !participantsIds.includes(user._id));
    };

    this.addParticipant = async participantId => {
        const roomId = $state.params.roomId;
        const data = { id: participantId };

        await $roomData.addParticipant(roomId, data);
        await this._getRoomData(roomId);

        this._getInviteUserList();
    };
});
