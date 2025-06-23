import { IMAGE_FILES } from './image-list';

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    // Pick a random image
    const randomFile = IMAGE_FILES[Math.floor(Math.random() * IMAGE_FILES.length)];
    // Serve the asset using the special __STATIC_CONTENT_MANIFEST and __STATIC_CONTENT bindings
    const url = new URL(request.url);
    url.pathname = "/" + randomFile;
    // Forward the request to the static asset handler
    return env.ASSETS.fetch(url, request);
  }
};
