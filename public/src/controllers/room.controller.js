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

    this._getRoomData = roomId => $roomData.getRoom(roomId)
        .then(({ data }) => { $scope.room.data = data; });

    this._getHistory = roomId => $roomData.getHistory(roomId)
        .then(({ data }) => { $scope.room.history = data; });

    this._onMessageUpdated = () => {
        this._getHistory($state.params.roomId);
        $scope.room.editingMessageId = null;
    };

    this.sendMessage = () => {
        if (!$scope.room.message) return;

        const messageData = {
            roomId: $scope.room.data._id,
            text: $scope.room.message
        };

        if ($scope.room.editingMessageId) {
            $messageData.updateMessage($scope.room.editingMessageId, messageData)
                .then(this._onMessageUpdated);
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

    this.deleteMessage = messageId => $messageData.deleteMessage(messageId)
        .then(this._getHistory($state.params.roomId));

    this.openInvitePopup = () => {
        $scope.room.inviteUsersPopup.isActive = true;

        this._getInviteUserList();
    };

    this._getInviteUserList = () => $userData.getUserList()
        .then(this._onInviteUserListLoaded);

    this._onInviteUserListLoaded = response => {
        const { userList } = response.data;
        const { participants } = $scope.room.data;
        const participantsIds = participants.map(participantItem => participantItem._id);

        $scope.room.inviteUsersList = userList.filter(user => !participantsIds.includes(user._id));
    };

    this.addParticipant = participantId => {
        const roomId = $state.params.roomId;
        const data = { id: participantId };

        $roomData.addParticipant(roomId, data)
            .then(this._getRoomData)
            .then(this._getInviteUserList);
    };
});
