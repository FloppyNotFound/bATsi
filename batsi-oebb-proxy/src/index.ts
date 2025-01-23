import { checkIsAuthorized } from "./helpers/check-is-authorized";
import { toDestinationUrl } from "./helpers/to-destination-url";
import { defaultHeaders } from "./models/default-headers";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const isAuthorized = checkIsAuthorized(request.headers, env.API_TOKEN);
		if (!isAuthorized) {
			return new Response(null, { status: 401, headers: defaultHeaders });
		}

		const destinationURL = toDestinationUrl(request.url);

		let fetchResponse = null;
		try {
			fetchResponse = await fetch(destinationURL);
		} catch (err) {
			console.error(err);
			return new Response(null, { status: 404, headers: defaultHeaders });
		}

		const data = await fetchResponse.json();
		const json = JSON.stringify(data);

		const hasHttpSuccessCode = fetchResponse.status.toString().startsWith("2");
		if (!hasHttpSuccessCode) {
			return new Response(json, { status: 400, headers: defaultHeaders });
		}

		const response = new Response(json, {
			status: 200,
			headers: defaultHeaders,
		});

		return response;
	},
} satisfies ExportedHandler<Env>;
