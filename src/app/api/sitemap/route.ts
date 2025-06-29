import { createClient } from "@/prismicio";

export async function GET() {
  const baseUrl = process.env.SITE_URL || "https://dlcustomguitars.com";
  const client = createClient();

  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);

  const allPages = await Promise.all(
    locales.map(async (locale) => {
      // @ts-expect-error out of control
      const clientWithLocale = createClient({ lang: locale });

      const homePage = await clientWithLocale.getAllByType("home_page");
      const defaultPages = await clientWithLocale.getAllByType("default_page");
      const productPages = await clientWithLocale.getAllByType("product");
      const productsPage = await clientWithLocale.getAllByType("products_page");

      return {
        locale,
        pages: [...homePage, ...defaultPages, ...productPages, ...productsPage],
      };
    })
  );

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const urls = allPages.flatMap(({ locale, pages }) =>
    pages.map((page) => {
      const prefix = locale; // you may want to skip prefix for default locale
      const isHome = page.uid === "home";
      const basePath =
        page.type === "product"
          ? `${baseUrl}/${prefix}/products`
          : `${baseUrl}/${prefix}`;
      const url = isHome ? `${baseUrl}/${prefix}` : `${basePath}/${page.uid}`;

      return `
        <url>
          <loc>${url}</loc>
          <lastmod>${formatDate(page.last_publication_date)}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
    })
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
