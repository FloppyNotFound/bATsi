import { checkIsAuthorized } from './helpers/check-is-authorized';
import { toDestinationUrl } from './helpers/to-destination-url';
import { defaultHeaders } from './models/default-headers';

export default {
  async fetch(request, env, _ctx): Promise<Response> {
    const isPreflightRequest = request.method === 'OPTIONS';
    const hasApiTokenHeader = request.headers.get('access-control-request-headers')?.split(',').includes('api_token');

    if (isPreflightRequest && hasApiTokenHeader) {
      return new Response(null, { status: 200, headers: defaultHeaders });
    }
    if (isPreflightRequest) {
      return new Response(null, { status: 401, headers: defaultHeaders });
    }

    const isAuthorized = checkIsAuthorized(request.headers, env.API_TOKEN);
    if (!isAuthorized) {
      return new Response(null, { status: 401, headers: defaultHeaders });
    }

    let fetchResponse = null;
    try {
      const destinationURL = toDestinationUrl(request.url);
      fetchResponse = await fetch(destinationURL);
    } catch (err) {
      console.error(err);
      return new Response(null, { status: 404, headers: defaultHeaders });
    }

    const data = await fetchResponse.json();
    const json = JSON.stringify(data);

    const hasHttpSuccessCode = fetchResponse.status.toString().startsWith('2');
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
