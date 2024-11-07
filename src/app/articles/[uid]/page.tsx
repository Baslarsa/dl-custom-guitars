import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Metadata, ResolvingMetadata } from "next";
import PageTitleComponent from "../../components/typography/PageTitleComponent";
import ImageAndTextComponent from "../../components/ImageAndTextComponent";
import { PrismicNextImage } from "@prismicio/next";
import Container from "@/app/components/layout/Container";
import RichText from "@/app/components/typography/RichText";
type Props = {
  params: Promise<{ uid: string; title: string; description: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({
  params,
}: {
  params: { uid: string; title: string; description: string };
}): Promise<Metadata> {
  const uid = params.uid;
  const client = createClient({}, false);
  const page = await client.getByUID("article", uid);

  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
  };
}
export default async function Page({ params }: Props) {
  const client = createClient();

  const page = await client.getByUID("article", (await params).uid);

  return (
    <div className="py-16">
      <Container>
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <PageTitleComponent title={page.data.title} />
          <div className="rounded-md relative my-8 w-full h-[600px] overflow-hidden flex justify-center items-center">
            <PrismicNextImage
              field={page.data.image}
              width={800}
              fill={true}
              imgixParams={{
                fm: "jpg",
                auto: ["compress", "format", "enhance"],
                fit: "fill",
                q: 30,
              }}
            />
          </div>
          <div className="w-full py-2">
            <RichText text={page.data.sub_title} />
          </div>
          <RichText text={page.data.body_text} />
        </div>
        <SliceZone slices={page.data.slices} components={components} />
      </Container>
    </div>
  );
}
