import Image from "next/image";
import { Link } from "../../navigation";
import { Suspense } from "react";
import ExpandingArrow from "@/components/expanding-arrow";

import { useTranslations } from "next-intl";
import NowHeight from "@/components/now-height";

// export const dynamic = 'force-dynamic'

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Link
        href="/transaction"
        className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>{t("start")}</p>
        <ExpandingArrow />
      </Link>
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        ObChain Web
      </h1>
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{t("about")}</h2>
            <p className="text-sm text-gray-500">ObChain Web</p>
          </div>
          <div>
            <Suspense>
              {/* @ts-expect-error Async Server Component */}
              <NowHeight />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-gray-600">{t("description")}</p>
        </div>
      </div>
      <p className="font-light text-gray-600 w-full max-w-lg text-center mt-6">
        This is a newly Web3 chain built on the Obchain protocol.
      </p>
      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
        {/* <Link href="https://oboard.eu.org">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link> */}
        <Link
          href="https://github.com/oboard/obchain-web"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
  );
}
