// src/app/api/robots/route.ts

import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const robotsTxt = `User-agent: *
Disallow:

Sitemap: ${process.env.SITE_URL || "https://dlcustomguitars.com"}/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
