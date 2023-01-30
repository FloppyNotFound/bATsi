/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { toDestinationUrl } from "./helpers/to-destination-url";

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

const defaultHeaders: HeadersInit = {
  "content-type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "http://localhost:4200",
};

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const destinationURL = toDestinationUrl(request.url);

    let fetchResponse = null;
    try {
      fetchResponse = await fetch(destinationURL);
    } catch (err) {
      console.error(err);
      return new Response(null, { status: 404, headers: defaultHeaders });
    }

    const data = await (<Response>fetchResponse).json();
    const json = JSON.stringify(data, null, 2);

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
};
