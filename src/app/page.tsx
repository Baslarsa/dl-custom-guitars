import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
  };
}
export default async function Home() {
  const client = createClient();
  const page = await client.getSingle("home_page");
  return <SliceZone slices={page.data.slices} components={components} />;
}
