import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *
Disallow:

Sitemap: ${process.env.SITE_URL || "https://dlcustomguitars.com"}/sitemap.xml
`);
  res.end();
}
