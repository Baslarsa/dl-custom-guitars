import { reverseLocaleLookup } from "@/i18n";
import { createClient } from "@/prismicio";
import Product from "@/slices/Product";
import { Metadata } from "next";
import Head from "next/head";
type Props = {
  params: Promise<{
    uid: string;
    title: string;
    description: string;
    lang: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const client = createClient({}, false);
  const page = await client.getSingle("product", {
    lang,
  });

  return {
    title: `${page.data.title} - DL Custom Guitars`,
    description: `${page.data.title} - Built by DL Custom Guitars`,
  };
}
export default async function Page({ params, searchParams }: Props) {
  const client = createClient();

  const { lang } = await params;

  const page = await client.getByUID("product", (await params).uid, {
    lang,
  });

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: page.data.title,
    image: page.data.images[0]?.image.url,
    description: page.data.description,
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>
      <Product data={page.data} />
    </>
  );
}
