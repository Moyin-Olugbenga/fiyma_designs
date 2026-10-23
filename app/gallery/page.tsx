"use client";

import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';

const galleryItems = [
  {
    title: "The Executive Edit",
    category: "Corporate",
    price: "N183,000",
    imageLabel: "[ The Executive Edit ]",
  },
  {
    title: "The Emerald Occasion",
    category: "Aso Ebi",
    price: "Price on request",
    imageLabel: "[ The Emerald Occasion ]",
  },
  {
    title: "The Weekend Muse",
    category: "Casual",
    price: "N90,000",
    imageLabel: "[ The Weekend Muse ]",
  },
  {
    title: "The Royal Bloom",
    category: "Aso Ebi",
    price: "N250,000",
    imageLabel: "[ The Royal Bloom ]",
  },
  {
    title: "The Power Suit",
    category: "Corporate",
    price: "N200,000",
    imageLabel: "[ The Power Suit ]",
  },
  {
    title: "The Lineo Grace",
    category: "Casual",
    price: "N130,000",
    imageLabel: "[ The Lineo Grace ]",
  },
];

const categories = ["All", "Corporate", "Aso Ebi", "Casual"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter items based on selected category
  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-fiyma-cream text-fiyma-espresso flex flex-col items-center">
      <div className="w-full bg-fiyma-cream overflow-hidden">

        <Navbar />

        {/* ================= HERO / TITLE SECTION ================= */}
        <section className="px-6 md:px-16 pt-12 pb-8">
          <h1 className="font-serif text-3xl md:text-5xl font-normal text-fiyma-espresso mb-2">
            Explore the Collection
          </h1>
          <p className="text-xs md:text-sm text-fiyma-espresso/70">
            Pieces for every occasion, every expression, every you...
          </p>
        </section>

        {/* ================= FILTERS & SEARCH ================= */}
        <section className="px-6 md:px-16 pb-8 space-y-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-5 py-2 rounded-full font-medium transition-colors ${
                    isActive
                      ? "bg-fiyma-berry text-white shadow-sm"
                      : "bg-fiyma-taupe/20 hover:bg-fiyma-taupe/30 text-fiyma-espresso border border-fiyma-taupe/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search bar & Sort Dropdown */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search by name, color, occasion, fabric..." 
                className="w-full bg-white/60 border border-fiyma-taupe/40 text-xs px-4 py-3 text-fiyma-espresso placeholder-fiyma-espresso/40 focus:outline-none focus:ring-1 focus:ring-fiyma-berry"
              />
            </div>
            <div className="w-full md:w-48">
              <select className="w-full bg-white/60 border border-fiyma-taupe/40 text-xs px-4 py-3 text-fiyma-espresso focus:outline-none focus:ring-1 focus:ring-fiyma-berry">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </section>

        {/* ================= GALLERY GRID ================= */}
        <section className="px-6 md:px-16 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div key={index} className="flex flex-col group cursor-pointer">
                {/* Image Placeholder with Favorite Icon */}
                <div className="relative w-full h-[400px] bg-fiyma-taupe/20 border border-fiyma-taupe/30 flex items-center justify-center text-fiyma-taupe italic text-xs mb-3 overflow-hidden">
                  <span>{item.imageLabel}</span>
                  <button aria-label="Favorite" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-fiyma-espresso hover:text-fiyma-berry shadow-sm transition-colors">
                    ♡
                  </button>
                </div>
                {/* Item Details */}
                <h3 className="font-serif text-base font-semibold text-fiyma-espresso">{item.title}</h3>
                <p className="text-xs text-fiyma-espresso/60 mt-0.5">
                  {item.category} · <span className="font-medium text-fiyma-espresso">{item.price}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-16 text-xs font-semibold">
            <button className="w-7 h-7 rounded-full bg-fiyma-berry text-white flex items-center justify-center shadow-sm">1</button>
            <button className="w-7 h-7 rounded-full hover:bg-fiyma-taupe/20 text-fiyma-espresso flex items-center justify-center transition-colors">2</button>
            <button className="w-7 h-7 rounded-full hover:bg-fiyma-taupe/20 text-fiyma-espresso flex items-center justify-center transition-colors">3</button>
            <button className="text-fiyma-espresso hover:text-fiyma-berry ml-2">→</button>
          </div>
        </section>

        <Footer />

      </div>
    </div>
  );
}