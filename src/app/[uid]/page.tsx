import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: Promise<{ uid: string; title: string; description: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const uid = (await params).uid;
  const client = createClient();

  const page = await client.getSingle("default_page");

  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
    openGraph: {
      title: page.data.seo_title as string,
      description: page.data.seo_description as string,
    },
  };
}
export default async function Page({ params, searchParams }: Props) {
  const client = createClient();

  const page = await client.getByUID("default_page", (await params).uid);

  return <SliceZone slices={page.data.slices} components={components} />;
}
