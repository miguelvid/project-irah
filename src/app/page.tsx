// pages/index.tsx
import Head from "next/head";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-900">
      <Head>
        <title>IRÁH | Alta Gastronomia</title>
        <meta
          name="description"
          content="IRÁH - Memória afetiva, alta gastronomia e muito sabor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-grow flex-col">
        {/* Hero Section */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
          {/* Background texture effect */}
          <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10 mix-blend-soft-light"></div>

          <div className="z-10 max-w-3xl">
            <h1 className="mb-6 font-serif text-4xl tracking-wide text-amber-300 md:text-5xl lg:text-6xl">
              MEMÓRIA AFETIVA, ALTA GASTRONOMIA E MUITO SABOR.
            </h1>
            <p className="text-xl font-light tracking-wider text-amber-300 md:text-2xl">
              É tudo isso que você pode encontrar aqui.
            </p>

            <div className="mt-16">
              <div>
                <Image
                  src="/logo.svg"
                  alt="IRÁH Restaurant"
                  width={120}
                  height={120}
                  className="mx-auto"
                />
                <p className="mt-4 font-serif text-xl tracking-widest text-amber-300">
                  IRÁH
                </p>
                <p className="mt-1 text-sm tracking-wider text-amber-300">
                  GASTRONOMIA
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 mx-auto">
            <button className="border border-amber-300 px-8 py-3 tracking-wider text-amber-300 transition duration-300 hover:bg-amber-300 hover:text-emerald-900">
              RESERVE UMA MESA
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
