// src/app/api/robots/route.ts

export function GET() {
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
