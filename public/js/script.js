// Define the common headers and method used for API calls
const queryData = {
	headers: {'Content-Type': 'application/json'}, // For JSON structuring for the data to be POST
	method:  'POST' // API calls will be using the POST method
};

/**
 * This function makes a POST request to a specified URL.
 * It can optionally handle form submission events.
 * This function is asynchronous, meaning it returns a Promise.
 *
 * @param {string} url - The URL to make the request to.
 * @param {Event} [event] - Optional. The form submit event.
 */
async function apiCall(url, event = null) {
	// Cloning the base query configuration
	const options = {...queryData};

	if (event) {
		// If an `event` is passed, prevent the default browser behaviour.
		event.preventDefault();

		// If the event is of the type 'submit' (which is related to form submission),
		if (event.type === 'submit') {
			// Create a form data object from form inputs
			const formData   = new FormData(event.target);

			// Convert form data to an easy-to-process Object
			const formValues = Object.fromEntries(formData.entries());

			// Stringify our processed form data and attach it to the options as the request body.
			options.body     = JSON.stringify(formValues);
		}
	}

	const response = await fetch(url, options); // Make the request to the url with the specified options
	if (response.ok) {
		// If the server returned a response status in the range 200-299, handle the response
		const data = await response.json();

		// If the response includes a "redirect" property, redirect to that URL.
		if (data.redirect) window.location = data.redirect;
	}
}