// Redirect www.captains-chest.com to the apex; serve static assets otherwise.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.captains-chest.com") {
      url.hostname = "captains-chest.com";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
