// src/app/api/sitemap/route.ts

import { NextRequest } from "next/server";
import { createClient } from "@/prismicio";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.SITE_URL || "https://dlcustomguitars.com";

  // Initialize Prismic client
  const client = createClient();

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

  const pages = pagesFromPrismic.map((page) => {
    const baseUrlModified =
      page.type === "product" ? `${baseUrl}/products` : baseUrl;
    const url =
      page.uid === "home" ? `${baseUrl}` : `${baseUrlModified}/${page.uid}`;
    return `
      <url>
        <loc>${url}</loc>
        <lastmod>${page.last_publication_date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
