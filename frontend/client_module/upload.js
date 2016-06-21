$(document).ready(function() {

	status('Choose a file :)');

	// Check to see when a user has selected a file
	var timerId;
	//timerId = setInterval(function() {
	//	if ($('#userPhotoInput').val() !== '') {
	//		clearInterval(timerId);

	// $('#uploadForm').submit();
	//	}
	//}, 500);
	function status(message) {
		$('#status').text(message);
	}

	$('#uploadForm').submit(function() {
		status('uploading the file ...');
		$(this).ajaxSubmit({
			// Note: can't use JSON otherwise IE8 will pop open a dialog
			// window trying to download the JSON as a file
			dataType: 'text',

			error: function(xhr) {
				status('Error: ' + xhr.status);
			},

			success: function(response) {

				try {
					response = $.parseJSON(response);
				} catch (e) {
					status('Bad response from server');
					return;
				}

				if (response.error) {
					status('Oops, something bad happened');
					return;
				}
				if ((!response.image) && (!response.success)) {
					status(response.msg);
					return;
				}

				var imageUrlOnServer = response.savedAs;

				status('Success, file uploaded to:' + imageUrlOnServer);
				$('#uploadForm').resetForm();
				//timerId = setInterval(function() {
				//if ($('#userPhotoInput').val() !== '') {
				// clearInterval(timerId);

				//$('#uploadForm').submit();
				// }
				//},
				//500);

				//$('<img/>').attr('src', imageUrlOnServer).appendTo($('body'));
			}
		});

		// Have to stop the form from submitting and causing
		// a page refresh - don't forget this
		return false;
	});

});