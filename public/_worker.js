// Redirect www.captains-chest.com to the apex; serve static assets otherwise.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.captains-chest.com") {
      url.hostname = "captains-chest.com";
      return Response.redirect(url.toString(), 301);
    }
    // Never serve repo docs (e.g. a stale cached README.md).
    if (url.pathname.toLowerCase().endsWith(".md")) {
      return new Response("Not found", { status: 404, headers: { "cache-control": "no-store" } });
    }
    return env.ASSETS.fetch(request);
  },
};
