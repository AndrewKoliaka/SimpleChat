app.service('$errorAlert', function () {
	this.show = error => {
		alert(`Something went wrong. ${error.data.info}`);
		console.error(error);
	}
});
