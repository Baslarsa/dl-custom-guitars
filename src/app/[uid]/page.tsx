import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";

export async function generateMetadata() {
  const client = createClient();

  const page = await client.getSingle("default_page");

  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
  };
}
export default async function Page({ params }: { params: { uid: string } }) {
  const client = createClient();

  const page = await client.getByUID("default_page", params.uid);

  return <SliceZone slices={page.data.slices} components={components} />;
}
