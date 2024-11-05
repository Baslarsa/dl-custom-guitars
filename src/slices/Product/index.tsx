import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import classNames from "classnames";

import {
  ProductDocument,
  ProductDocumentData,
  Simplify,
} from "../../../prismicio-types";

/**
 * Props for `Product`.
 */
export type ProductProps = SliceComponentProps<Content.ProductSlice>;

/**
 * Component for "Product" Slices.
 */
const Product = ({
  data,
}: {
  data: Simplify<ProductDocumentData>;
}): JSX.Element => {
  const product = data;

  return (
    <div className="bg-black text-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium">{product.title}</h1>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                {product.images?.map((item) => (
                  <img
                    key={item.image.url}
                    alt={item.image.alt as string}
                    src={item.image.url as string}
                    className={classNames(
                      product.images[0]?.image.id === item.image.id
                        ? "lg:col-span-2 lg:row-span-1"
                        : "hidden lg:block",
                      "rounded-lg max-h-[600px] w-full object-cover object-center"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              {/* Product details */}
              <div className="">
                <h2 className="font-bold">Description</h2>

                <PrismicRichText field={product.description} />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="font-bold">Specs</h2>

                <div className="mt-4 text-white">
                  <ul role="list-disc">
                    {product.specs?.map((item) => (
                      <li key={item.value} className="flex justify-between">
                        <span className="font-normal mr-2">{item.title}</span>
                        {item.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
