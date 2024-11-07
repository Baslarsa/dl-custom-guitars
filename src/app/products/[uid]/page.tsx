import { createClient } from "@/prismicio";
import Product from "@/slices/Product";
import { Metadata } from "next";
import Head from "next/head";
type Props = {
  params: Promise<{ uid: string; title: string; description: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient({}, false);
  const page = await client.getSingle("product");

  return {
    title: `${page.data.title} - DL Custom Guitars`,
    description: `${page.data.title} - Built by DL Custom Guitars`,
  };
}
export default async function Page({ params, searchParams }: Props) {
  const client = createClient();

  const page = await client.getByUID("product", (await params).uid);

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
