import { createClient } from "@/prismicio";
import ToolBox from "../../components/tools/ToolsPage";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

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
  const client = createClient();
  const { lang } = await params;
  const page = await client.getSingle("tools", {
    lang,
  });
  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
  };
}
export default async function Page() {
  const client = createClient();

  const request = await client.getSingle("tools");
  return (
    <div>
      <SliceZone slices={request.data.slices} components={components} />
      <ToolBox />
    </div>
  );
}
