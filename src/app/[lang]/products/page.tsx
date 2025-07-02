import { createClient } from "@/prismicio";
import { PrismicNextImageProps } from "@prismicio/next";
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {productItems.map((product) => {
            console.log(product);
            return (
              <div key={product.id} className="group relative">
                <img
                  alt={product.images[0].alt}
                  src={product.images[0].url}
                  className="h-96 w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3"
                />
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  <a href={product.href}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
