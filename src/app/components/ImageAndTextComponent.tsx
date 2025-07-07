"use client";
import {
  Content,
  GroupField,
  ImageFieldImage,
  KeyTextField,
  RichTextField,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { Simplify } from "../../../prismicio-types";
import ButtonGroup from "./buttons/ButtonGroup";
import RichText from "./typography/RichText";
const ImageAndTextComponent = ({
  image,
  title,
  text,
  buttons,
}: {
  image: ImageFieldImage;
  title: KeyTextField;
  text: RichTextField;
  buttons?: GroupField<
    Simplify<Content.ImageAndTextSliceDefaultPrimaryCtasItem>
  >;
}) => {
  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="relative isolate -z-10 overflow-hidden bg-linear-to-b from-indigo-100/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            {/* <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We’re changing the way people connect</h1> */}
            <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
              {title}
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1 text-gray-900">
              <RichText text={text} />
              {buttons && (
                <ButtonGroup dark buttons={buttons.map((b) => b.link)} />
              )}
            </div>
            <PrismicNextImage
              field={image}
              className="mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />
      </div>
    </main>
  );
};

export default ImageAndTextComponent;
