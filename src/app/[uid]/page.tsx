import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: Promise<{ uid: string; title: string; description: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("default_page");

  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
  };
}
export default async function Page({ params }: Props) {
  const client = createClient();

  const page = await client.getByUID("default_page", (await params).uid);

  return <SliceZone slices={page.data.slices} components={components} />;
}
