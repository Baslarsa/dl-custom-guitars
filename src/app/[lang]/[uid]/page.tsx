import { reverseLocaleLookup } from "@/i18n";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
type Props = {
  params: Promise<{
    uid: string;
    title: string;
    description: string;
    lang: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({
  params,
}: {
  params: { lang: string; uid: string };
}): Promise<Metadata> {
  const client = createClient({}, false);
  const { lang } = params;
  const page = await client.getSingle("default_page", {
    lang,
  });

  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("default_page", {
    lang: "*",
  });

  return pages.map((page) => ({
    lang: page.lang,
    uid: page.uid,
  }));
}
export default async function Page({ params }: Props) {
  const client = createClient();
  const { lang } = await params;

  const page = await client
    .getByUID("default_page", (await params).uid, {
      lang,
    })
    .catch(() => notFound());
  if (!page) {
    return <h1>404</h1>;
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
