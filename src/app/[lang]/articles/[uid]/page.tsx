import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import PageTitleComponent from "../../../components/typography/PageTitleComponent";
import { PrismicNextImage } from "@prismicio/next";
import Container from "@/app/components/layout/Container";
import RichText from "@/app/components/typography/RichText";
import { reverseLocaleLookup } from "@/i18n";
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

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("article", {
    lang: "*",
  });

  return pages.map((page) => ({
    lang: page.lang,
    uid: page.uid,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: { uid: string; title: string; description: string; lang: string };
}): Promise<Metadata> {
  const uid = params.uid;
  const lang = params.lang;
  const client = createClient({}, false);
  const page = await client.getByUID("article", uid, {
    lang,
  });

  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
  };
}
export default async function Page({ params }: Props) {
  const { lang } = await params;
  const client = createClient();

  const page = await client.getByUID("article", (await params).uid, {
    lang,
  });

  return (
    <div className="py-16">
      <Container>
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <PageTitleComponent title={page.data.title} />
          <div className="rounded-md relative my-8 w-full overflow-hidden flex justify-center items-center">
            <PrismicNextImage
              field={page.data.image}
              imgixParams={{
                fm: "jpg",
                auto: ["compress", "format", "enhance"],
                fit: "fill",
                q: 30,
              }}
            />
          </div>
          <div className="w-full">
            <RichText text={page.data.sub_title} />
          </div>
          <RichText text={page.data.body_text} />
        </div>
        <SliceZone slices={page.data.slices} components={components} />
      </Container>
    </div>
  );
}
