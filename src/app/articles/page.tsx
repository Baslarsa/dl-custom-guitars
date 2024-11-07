import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Metadata, ResolvingMetadata } from "next";
import CardGrid, { CardProps } from "../components/CardGrid";
import { ArticleDocument } from "../../../prismicio-types";
type Props = {
  params: Promise<{ uid: string; title: string; description: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient({}, false);

  const page = await client.getSingle("articles_page");
  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
  };
}

const articleToCard = (article: ArticleDocument<string>): CardProps => {
  return {
    id: article.uid,
    title: article.data.title,
    description: article.data.sub_title,
    date: new Date(article.first_publication_date).toDateString(),
    datetime: article.first_publication_date,
    imageUrl: article.data.image.url || "",
    href: `/articles/${article.uid}`,
  };
};
export default async function Page() {
  const client = createClient({}, false);

  const request = await client.getSingle("articles_page");
  const data = request.data;
  const articles = await client.getAllByType("article", {
    orderings: [
      {
        field: "document.first_publication_date",
        direction: "desc",
      },
    ],
  });
  const cardArticles = articles.map((article) => articleToCard(article));
  return (
    <div className="bg-black">
      <div className="mt-8">
        <SliceZone slices={data.slices} components={components} />
        <CardGrid items={cardArticles} />
      </div>
    </div>
  );
}
