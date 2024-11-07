// pages/api/sitemap/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/prismicio";

export default async function sitemap(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const baseUrl = process.env.SITE_URL || "https://dlcustomguitars.com";
  const client = createClient();

  // Fetch data from Prismic for each type of page
  const homePage = await client.getAllByType("home_page");
  const defaultPages = await client.getAllByType("default_page");
  const productPages = await client.getAllByType("product");
  const productsPage = await client.getAllByType("products_page");

  const pagesFromPrismic = [
    ...homePage,
    ...defaultPages,
    ...productPages,
    ...productsPage,
  ];

  // Combine static and Prismic pages
  const pages = pagesFromPrismic.map((page) => {
    const url = page.uid === "home" ? `${baseUrl}` : `${baseUrl}/${page.uid}`;
    return `
      <url>
        <loc>${url}</loc>
        <lastmod>${page.last_publication_date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
  });

  // Return the sitemap XML response
  res.setHeader("Content-Type", "application/xml");
  res.write(
    `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${pages.join("")}
     </urlset>`
  );
  res.end();
}
