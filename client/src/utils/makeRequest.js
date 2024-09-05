import config from "./config";

export default async function makeRequest(
	url,
	method = "GET",
	data = undefined
) {
	const response = await fetch(url, {
		method: method,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Credentials": "true",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});
	try {
		return response.json();
	} catch {
		return response.text();
	}
}
