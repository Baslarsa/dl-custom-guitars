"use client";
import RichText from "@/app/components/typography/RichText";
import SectionCategory from "@/app/components/typography/SectionCategory";
import useIsMobile from "@/hooks/useIsMobile";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import classNames from "classnames";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ProductDocumentData, Simplify } from "../../../prismicio-types";

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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const handleImageClick = (index: number) => {
    setOpen(true);
    setActiveIndex(index);
  };
  return (
    <div className="bg-neutral-950 text-white">
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
              <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
              >
                {product.images?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full md:h-[500px] h-[300px] overflow-hidden mb-10">
                      <PrismicNextImage
                        key={item.image.url}
                        field={item.image}
                        onClick={() => handleImageClick(index)}
                        className={classNames(
                          "h-full object-contain aspect-auto cursor-pointer"
                        )}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                // @ts-expect-error out of control
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="mySwiper"
              >
                {product.images?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-36 cursor-pointer">
                      <PrismicNextImage
                        key={item.image.url}
                        field={item.image}
                        className="rounded-lg w-full h-full object-cover object-center"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              // @ts-expect-error out of control
              slides={product.images?.map((item) => ({
                src: item.image.url,
              }))}
              index={activeIndex}
            />
            <div className="mt-8 lg:col-span-5">
              {/* Product details */}
              <div className="">
                <h2 className="font-bold">Description</h2>

                <RichText text={product.description} />
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
          <div className="w-full h-[500px] mt-16">
            <div className="my-6">
              <SectionCategory text="Guitar demo" />
            </div>
            <div
              className="w-full h-full"
              data-oembed={`${product.video_url}`}
              data-oembed-type={`video`}
              data-oembed-provider={"YouTube"}
            >
              {
                <iframe
                  width={"100%"}
                  height={isMobile ? "200px" : "100%"}
                  className="max-h-[410px] max-w-[700px]"
                  src={product.video_url || ""}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title="Embedded youtube"
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
