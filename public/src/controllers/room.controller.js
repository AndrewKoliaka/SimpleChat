app.controller('room.controller', function ($scope) {
	this.$onInit = () => {
		$scope.room = {
			participants: [{ name: 'Steve Rogers', message: 'Hello' }, { name: 'Steve Rogers', message: 'Hello' }]
		};
	};
});
