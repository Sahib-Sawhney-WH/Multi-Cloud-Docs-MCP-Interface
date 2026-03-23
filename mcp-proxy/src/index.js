export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id",
        },
      });
    }

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream",
    };

    const sessionId = request.headers.get("Mcp-Session-Id");
    if (sessionId) headers["Mcp-Session-Id"] = sessionId;

    const res = await fetch("https://learn.microsoft.com/api/mcp", {
      method: "POST",
      headers,
      body: request.body,
    });

    const response = new Response(res.body, res);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Accept, Mcp-Session-Id");
    response.headers.set("Access-Control-Expose-Headers", "Mcp-Session-Id");
    return response;
  },
};
