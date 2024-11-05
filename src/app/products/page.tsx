import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
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

  const page = await client.getSingle("products_page", {
    fetchLinks: [
      "product.title",
      "product.description",
      "product.images",
      "product.price",
    ],
  });
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

  const request = await client.getSingle("products_page", {
    fetchLinks: [
      "product.title",
      "product.description",
      "product.images",
      "product.price",
    ],
  });
  const data = request.data.products.map((item) => item.products);

  // @ts-ignore
  const deepProducts = data.map((item) => ({ ...item.data, uid: item.uid }));
  const productItems = deepProducts.map((item) => ({
    images: item.images.map((image: any) => image.image),
    name: item.title,
    description: item.description,
    href: `/products/${item.uid}`,
    id: item.uid,
    price: item.price,
  }));
  console.log(productItems);
  return (
    <div className="bg-black">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {productItems.map((item, i) => {
            return (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-800 bg-black"
              >
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-96 overflow-hidden">
                  {item.images && (
                    <img
                      alt={item.images[0].alt || item.name}
                      src={item.images[0].url}
                      className="h-full w-full object-cover object-center sm:h-full sm:w-full group-hover:opacity-75 transform group-hover:scale-110 scale-100 transition-all "
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium">
                    <a href={item.href || "#"}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.name}
                    </a>
                  </h3>
                  <PrismicRichText field={item.description} />
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-base font-medium">{item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
