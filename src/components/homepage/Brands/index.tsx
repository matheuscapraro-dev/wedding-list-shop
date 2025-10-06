import Image from "next/image";
import React from "react";

const brandsData: { id: string; src_url: string }[] = [
  {
    id: "versace",
    src_url: "/icons/versace-logo.svg",
  },
  {
    id: "zara",
    src_url: "/icons/zara-logo.svg",
  },
  {
    id: "gucci",
    src_url: "/icons/gucci-logo.svg",
  },
  {
    id: "prada",
    src_url: "/icons/prada-logo.svg",
  },
  {
    id: "calvin-klein",
    src_url: "/icons/calvin-klein-logo.svg",
  },
];

const Brands = () => {
  return (
    <div className="bg-black">
      <div className="max-w-frame mx-auto flex flex-wrap items-center justify-center md:justify-between py-5 md:py-0 sm:px-4 xl:px-0 space-x-7">
        {brandsData.map((brand) => (
          <Image
            key={brand.id}
            priority
            src={brand.src_url}
            height={0}
            width={0}
            alt={brand.id}
            className="h-auto w-auto max-w-[116px] lg:max-w-48 max-h-[26px] lg:max-h-9 my-5 md:my-11"
          />
        ))}
      </div>
    </div>
  );
};

export default Brands;
