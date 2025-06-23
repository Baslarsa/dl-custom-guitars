import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  const client = createClient();
  const page = await client.getSingle("home_page", {
    lang,
  });

  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
  };
}
export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const client = createClient();
  const page = await client.getSingle("home_page", {
    lang,
  });
  return <SliceZone slices={page.data.slices} components={components} />;
}
