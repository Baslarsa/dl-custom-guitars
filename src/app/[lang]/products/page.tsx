import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Metadata } from "next";
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
  const client = createClient({}, false);
  const { lang } = await params;
  const page = await client.getSingle("products_page", {
    fetchLinks: [
      "product.title",
      "product.description",
      "product.images",
      "product.price",
    ],
    lang,
  });
  return {
    title: page.data.seo_title,
    description: page.data.seo_description,
  };
}
export default async function Page({ params }: Props) {
  const client = createClient({}, false);
  const { lang } = await params;
  const request = await client.getSingle("products_page", {
    fetchLinks: [
      "product.title",
      "product.description",
      "product.images",
      "product.price",
    ],
    lang,
  });
  const data = request.data.products.map((item) => item.products);

  // @ts-expect-error out of control
  const deepProducts = data.map((item) => ({ ...item.data, uid: item.uid }));
  const productItems = deepProducts.map((item) => ({
    images: item.images?.map(
      (image: { image: PrismicNextImageProps }) => image.image
    ),
    name: item.title,
    description: item.description,
    href: `/products/${item.uid}`,
    id: item.uid,
    price: item.price,
  }));
  return (
    <div className="bg-black">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {productItems.map((item) => {
            return (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-800 bg-black"
              >
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-96 overflow-hidden">
                  {item.images && (
                    <PrismicNextImage
                      field={item.images[0]}
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
