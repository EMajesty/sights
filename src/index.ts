import { IMAGE_FILES } from './image-list';

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    if (!IMAGE_FILES.length) {
      return new Response("No images found.", { status: 404 });
    }
    const randomFile = IMAGE_FILES[Math.floor(Math.random() * IMAGE_FILES.length)];
    const imageUrl = `/img/${randomFile}`;

    const logoUrl = `/svg/logo-top.svg`;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>we have such sights to show you</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            min-height: 100vh;
            margin: 0;
            display: flex;
	    flex-direction: column;
            justify-content: space-between;
            align-items: center;
	    min-height: 100vh;
            position: relative;
          }
          img {
            max-width: 90vw;
            max-height: 80vh;
          }
	  .logo-top {
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 1.5em;
            margin-bottom: 1.5em;
            color: #000;
            user-select: none;
          }
	  .logo-top svg {
		width: 10vw;
  		max-width: 80px;
  		min-width: 32px;
  		height: auto;
  		display: block;
	  }
        </style>
      </head>
      <body>
      	<div class="logo-top"> <img src="${logoUrl}" /> </div>
        <div class="main-content"> <img src="${imageUrl}" onclick="window.location.reload()" /> </div>
      </body>
      </html>
    `;

    // If the request is for the root, serve the HTML page
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=UTF-8" },
      });
    }

    // Otherwise, try to serve the static asset (the image)
    // @ts-ignore: ASSETS binding is provided by Wrangler
    return env.ASSETS.fetch(request);
  }
};

