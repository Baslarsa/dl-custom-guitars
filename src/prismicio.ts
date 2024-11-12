import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 */
const routes: prismic.ClientConfig["routes"] = [
  {
    type: "home_page",
    path: "/",
  },
  {
    type: "default_page",
    path: "/:uid",
  },
  {
    type: "article",
    path: "/articles/:uid",
  },
  {
    type: "products_page",
    path: "/products",
  },
  {
    type: "product_page",
    path: "/products/:uid",
  },
  {
    type: "articles_page",
    path: "/articles",
  },
  {
    type: "tools",
    path: "/tools",
  },
];

/**
 * Creates a Prismic client for the project's repository.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (
  config: prismicNext.CreateClientConfig = {},
  cache = true
) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions: cache
      ? { next: { tags: ["prismic"], revalidate: 60 } }
      : { next: { tags: ["prismic"] }, cache: "no-store" },
    ...config,
  });

  if (process.env.NODE_ENV !== "production") {
    prismicNext.enableAutoPreviews({
      client,
      previewData: config.previewData,
      req: config.req,
    });
  }

  return client;
};
