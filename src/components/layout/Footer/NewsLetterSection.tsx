import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";

const NewsLetterSection = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-black rounded-[20px]">
      <p
        className={cn([
          integralCF.className,
          "font-bold text-[32px] md:text-[40px] text-white mb-9 md:mb-0",
        ])}
      >
        Confirme sua Presença
      </p>
      <div className="flex items-center">
        <div className="flex flex-col max-w-[349px] mx-auto">
          <Button
            variant="secondary"
            className="text-sm sm:text-base font-medium bg-white h-12 rounded-full px-4 py-3"
            aria-label="Subscribe to Newsletter"
            type="button"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
