const queryData = {
	headers: {'Content-Type': 'application/json'},
	method:  'POST'
};

async function apiCall(url, event = null) {
	const options = {...queryData};

	if (event) {
		event.preventDefault();

		if (event.type === 'submit') {
			const formData   = new FormData(event.target);
			const formValues = Object.fromEntries(formData.entries());
			options.body     = JSON.stringify(formValues);
		}
	}

	const response = await fetch(url, options);
	if (response.ok) {
		const data = await response.json();
		if (data.redirect) window.location = data.redirect;
	} else console.log('error');
}