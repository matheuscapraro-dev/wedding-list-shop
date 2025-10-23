"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";
import WeddingCountdown from "@/components/ui/WeddingCountdown";
import { User } from "@/lib/features/user/userSlice";

const Header = ({ user }: { user: User }) => {
  const group = user.group;
  switch (group) {
    case 1:
      var weddingDate = new Date("2025-12-21T15:00:00");
      break;
    case 2:
      var weddingDate = new Date("2026-01-09T15:00:00");
      break;
    case 3:
      var weddingDate = new Date("2025-01-11T15:00:00");
      break;
    case 4:
      var weddingDate = new Date("2025-01-17T15:00:00");
      break;
    default:
      var weddingDate = new Date("2025-12-21T15:00:00");
  }
  return (
    <header className="bg-[#F2F0F1] pt-10 md:pt-24 overflow-hidden">
      <div className="md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <section className="max-w-frame px-4">
          <motion.h2
            initial={{ y: "100px", opacity: 0, rotate: 10 }}
            animate={{ y: "0", opacity: 1, rotate: 0 }}
            transition={{ duration: 0.2 }}
            className={cn([
              integralCF.className,
              "text-4xl lg:text-[64px] lg:leading-[64px] mb-5 lg:mb-8",
            ])}
          >
            Casamento de Matheus e Alessandra
          </motion.h2>
          <motion.p
            initial={{ y: "100px", opacity: 0 }}
            animate={{ y: "0", opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-black/60 text-sm lg:text-base mb-2 lg:mb-8 max-w-[545px]"
          >
            Sejam bem-vindos à nossa lista de presentes! Fiquem à vontade para
            nos presentear com um dos itens.
          </motion.p>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            animate={{ y: "0", opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              href="/shop"
              className="w-full md:w-72 mb-5 md:mb-6 inline-block text-center bg-black hover:bg-black/80 transition-all text-white px-14 py-4 rounded-full hover:animate-pulse"
            >
              Escolha seu Presente
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            animate={{ y: "0", opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mb-12 md:mb-24"
          >
            <WeddingCountdown weddingDate={weddingDate} />
          </motion.div>
        </section>
        <motion.section
          initial={{ y: "100px", opacity: 0, rotate: 10 }}
          animate={{ y: "0", opacity: 1, rotate: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="relative md:px-4 min-h-[70vh] max-w-[35rem] md:min-h-[428px] bg-cover bg-top xl:bg-[center_top_-1.6rem] bg-no-repeat bg-[url('/images/header-homepage.png')] md:bg-[url('/images/header-homepage.png')]"
        >
          <Image
            priority
            src="/icons/big-star.svg"
            height={104}
            width={104}
            alt="big star"
            className="absolute right-7 xl:right-0 top-0 max-w-[76px] max-h-[76px] lg:max-w-24 lg:max-h-max-w-24 xl:max-w-[104px] xl:max-h-[104px] animate-[spin_4s_infinite]"
          />
          <Image
            priority
            src="/icons/small-star.svg"
            height={56}
            width={56}
            alt="small star"
            className="absolute left-7 md:left-0 top-24 sm:top-24 md:top-24 lg:top-24 max-w-11 max-h-11 md:max-w-14 md:max-h-14 animate-[spin_3s_infinite]"
          />
        </motion.section>
      </div>
    </header>
  );
};

export default Header;
