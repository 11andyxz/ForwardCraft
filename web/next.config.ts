import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  /* config options here */
};

// BotID proxies its challenge through our own domain so ad-blockers can't strip it.
export default withBotId(nextConfig);
