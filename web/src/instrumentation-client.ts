import { initBotId } from "botid/client/core";

// Vercel BotID (Basic, free): runs an invisible challenge in the browser and
// attaches its result to these requests; the route rejects calls without it.
initBotId({
  protect: [{ path: "/api/applications", method: "POST" }],
});
