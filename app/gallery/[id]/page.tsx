"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GalleryItemPage() {
  const [selectedSize, setSelectedSize] = useState("UK 10");
  const [selectedColor, setSelectedColor] = useState(0);

  const colors = ["bg-[#911A4D]", "bg-[#2F081E]", "bg-[#CFAE9B]", "bg-[#F3E5DC]"];
  const sizes = ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"];

  return (
    <div className="min-h-screen bg-fiyma-cream text-fiyma-espresso flex flex-col items-center">
      <div className="w-full bg-fiyma-cream overflow-hidden">

        {/* ================= HEADER ================= */}
        <header className="w-full border-b border-fiyma-taupe/30 bg-fiyma-cream">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16 py-4">
            <div className="flex items-center">
              <Link href="/" className="block relative">
                <Image src="/logo.jpeg" alt="Fiyma Designs Logo" width={140} height={50} className="h-10 w-auto object-contain" priority />
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide font-medium">
              <Link href="/" className="hover:text-fiyma-berry transition-colors">Home</Link>
              <Link href="/gallery" className="text-fiyma-berry font-semibold transition-colors">Gallery</Link>
              <Link href="/about" className="hover:text-fiyma-berry transition-colors">About</Link>
              <Link href="/contact" className="hover:text-fiyma-berry transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center gap-4 text-fiyma-espresso">
              <button aria-label="Search" className="hover:text-fiyma-berry">🔍</button>
              <button aria-label="Cart" className="hover:text-fiyma-berry">🛍️</button>
            </div>
          </div>
        </header>

        {/* ================= BREADCRUMB ================= */}
        <div className="px-6 md:px-16 pt-6 pb-2 text-xs text-fiyma-espresso/60 flex items-center gap-2">
          <Link href="/" className="hover:text-fiyma-berry">Home</Link>
          <span>/</span>
          <Link href="/gallery" className="hover:text-fiyma-berry">Gallery</Link>
          <span>/</span>
          <span className="text-fiyma-espresso font-medium">The Executive Edit[cite: 8]</span>
        </div>

        {/* ================= PRODUCT DETAIL SECTION ================= */}
        <section className="px-6 md:px-16 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-fiyma-taupe/20">
          
          {/* Left: Thumbnail Selector + Main Image */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
            {/* Thumbnails vertical stack */}
            <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible">
              {[1, 2, 3, 4, 5].map((thumb) => (
                <div key={thumb} className="w-16 h-20 bg-fiyma-taupe/20 border border-fiyma-taupe/40 shrink-0 cursor-pointer flex items-center justify-center text-[10px] text-fiyma-taupe italic">
                  [Thumb {thumb}]
                </div>
              ))}
            </div>

            {/* Main Image Viewer */}
            <div className="relative flex-1 h-[450px] md:h-[550px] bg-fiyma-taupe/20 border border-fiyma-taupe/30 flex items-center justify-center text-fiyma-taupe italic order-1 md:order-2">
              <span>[ Main Product Image: The Executive Edit ][cite: 8]</span>
              <button aria-label="Favorite" className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-fiyma-espresso hover:text-fiyma-berry shadow-sm transition-colors">
                ♡
              </button>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="lg:col-span-5 flex flex-col">
            <h1 className="font-serif text-3xl font-normal text-fiyma-espresso mb-1">The Executive Edit[cite: 8]</h1>
            <p className="text-xs uppercase tracking-wider text-fiyma-espresso/60 mb-3">Corporate[cite: 8]</p>
            <p className="text-xl font-serif font-bold text-fiyma-espresso mb-4">N185,000[cite: 8]</p>

            <p className="text-xs text-fiyma-espresso/80 leading-relaxed mb-6">
              A tailored set that speaks before you do. Designed for the modern woman who leads with quiet power[cite: 8].
            </p>

            {/* Features tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-fiyma-espresso/70 mb-6 pb-6 border-b border-fiyma-taupe/30">
              <span className="flex items-center gap-1">✦ Premium wool blend[cite: 8]</span>
              <span className="flex items-center gap-1">✦ Fully lined[cite: 8]</span>
              <span className="flex items-center gap-1">✦ Relaxed fit[cite: 8]</span>
            </div>

            {/* Select Color */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-fiyma-espresso mb-2">Select Color[cite: 8]</label>
              <div className="flex items-center gap-3">
                {colors.map((colorClass, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-7 h-7 rounded-full ${colorClass} transition-all ${
                      selectedColor === idx ? "ring-2 ring-offset-2 ring-fiyma-berry" : "opacity-80 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Select Size */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-fiyma-espresso">Select Size[cite: 8]</label>
                <button className="text-[11px] text-fiyma-berry underline hover:text-fiyma-espresso">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-medium border transition-all ${
                      selectedSize === size
                        ? "bg-fiyma-berry text-white border-fiyma-berry shadow-sm"
                        : "bg-white/60 text-fiyma-espresso border-fiyma-taupe/40 hover:border-fiyma-berry"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordions / Dropdowns */}
            <div className="space-y-3 mb-8 text-xs font-medium border-t border-fiyma-taupe/30 pt-6">
              {["Size Guide", "Fabric & Care", "Production & Delivery", "Customization"].map((section) => (
                <div key={section} className="flex justify-between items-center py-2.5 border-b border-fiyma-taupe/30 cursor-pointer hover:text-fiyma-berry">
                  <span>{section}[cite: 8]</span>
                  <span>+</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-fiyma-berry hover:bg-fiyma-berry/90 text-white text-xs uppercase tracking-wider py-3.5 transition-all shadow-md">
                Replicate This Design →[cite: 8]
              </button>
              <button className="w-full bg-white/70 hover:bg-white text-fiyma-espresso border border-fiyma-taupe/50 text-xs uppercase tracking-wider py-3.5 transition-all">
                Enquire About This Piece[cite: 8]
              </button>
            </div>

          </div>
        </section>

        {/* ================= YOU MAY ALSO LOVE ================= */}
        <section className="px-6 md:px-16 py-16">
          <h2 className="font-serif text-2xl text-fiyma-espresso mb-8">You May Also Love[cite: 8]</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "The Business Classic", cat: "Corporate", price: "N180,000" },
              { title: "The Aso Ebi Muse", cat: "Aso Ebi", price: "Price on request" },
              { title: "The Weekend Edit", cat: "Casual", price: "N90,000" },
              { title: "The Soft Power", cat: "Corporate", price: "N180,000" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col group cursor-pointer">
                <div className="w-full h-72 bg-fiyma-taupe/20 border border-fiyma-taupe/30 flex items-center justify-center text-fiyma-taupe italic text-xs mb-3">
                  [ {item.title} ]
                </div>
                <h3 className="font-serif text-sm font-semibold text-fiyma-espresso">{item.title}</h3>
                <p className="text-xs text-fiyma-espresso/60 mt-0.5">
                  {item.cat} · <span className="font-medium text-fiyma-espresso">{item.price}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}