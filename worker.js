export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Try to serve the requested asset
    try {
      const asset = await env.ASSETS.fetch(request);
      
      // If asset found, return it
      if (asset.status !== 404) {
        return asset;
      }
      
      // For SPA routing: if asset not found and path doesn't have an extension,
      // serve index.html (for client-side routing)
      if (!url.pathname.includes('.')) {
        const indexRequest = new Request(`${url.origin}/index.html`, request);
        return await env.ASSETS.fetch(indexRequest);
      }
      
      return asset;
    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  },
};
