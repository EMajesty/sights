import { IMAGE_FILES } from './image-list';

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    if (!IMAGE_FILES.length) {
      return new Response("No images found.", { status: 404 });
    }
    const randomFile = IMAGE_FILES[Math.floor(Math.random() * IMAGE_FILES.length)];
    // Serve the image from the bundled assets
    const url = new URL(request.url);
    url.pathname = "/" + randomFile;
    // @ts-ignore: __STATIC_CONTENT is injected by Wrangler
    return env.ASSETS.fetch(url, request);
  }
};

