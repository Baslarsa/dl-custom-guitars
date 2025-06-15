import { createClient } from "@/prismicio";
import ToolBox from "../components/tools/ToolsPage";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

type Props = {
  params: Promise<{ uid: string; title: string; description: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const page = await client.getSingle("tools");
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
