"use client";

import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("bespoke");

  return (
    <div className="min-h-screen bg-fiyma-cream text-fiyma-espresso flex flex-col items-center">
      <div className="w-full bg-fiyma-cream overflow-hidden">

        <Navbar />

        {/* ================= HERO BANNER ================= */}
        <section className="relative w-full bg-gradient-to-r from-fiyma-taupe/30 to-fiyma-berry/20 px-6 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between border-b border-fiyma-taupe/20">
          <div className="max-w-xl z-10 mb-8 md:mb-0">
            <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-4 text-fiyma-espresso">
              Let&apos;s stay in touch.
            </h1>
            <p className="text-fiyma-espresso/80 text-xs md:text-sm leading-relaxed max-w-md">
              Have a question, need styling advice or ready to discuss a bespoke creation? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="w-full md:w-[40%] h-[260px] bg-fiyma-taupe/20 border border-fiyma-taupe/30 flex items-center justify-center text-fiyma-taupe italic text-xs">
            [ Contact Hero Image: Woman in Strap Dress ]
          </div>
        </section>

        {/* ================= TABS & MAIN CONTENT ================= */}
        <section className="px-6 md:px-16 py-12">
          {/* Tabs */}
          <div className="flex border-b border-fiyma-taupe/30 mb-10 max-w-xl">
            <button 
              onClick={() => setActiveTab("general")}
              className={`pb-3 px-6 text-xs font-semibold tracking-wider transition-colors border-b-2 ${
                activeTab === "general" 
                  ? "border-fiyma-berry text-fiyma-berry" 
                  : "border-transparent text-fiyma-espresso/60 hover:text-fiyma-espresso"
              }`}
            >
              General Enquiries
            </button>
            <button 
              onClick={() => setActiveTab("bespoke")}
              className={`pb-3 px-6 text-xs font-semibold tracking-wider transition-colors border-b-2 ${
                activeTab === "bespoke" 
                  ? "border-fiyma-berry text-fiyma-berry" 
                  : "border-transparent text-fiyma-espresso/60 hover:text-fiyma-espresso"
              }`}
            >
              Bespoke / Bulk Order
            </button>
          </div>

          {/* Form & Quick Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Form Column */}
            <div className="md:col-span-2 bg-white/40 border border-fiyma-taupe/30 p-8">
              <h2 className="font-serif text-xl text-fiyma-espresso mb-1">Bespoke & Group Orders</h2>
              <p className="text-xs text-fiyma-espresso/70 mb-6">
                Tell us about your request and we&apos;ll get back to you with a personalized response.
              </p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-fiyma-espresso mb-1">Enquiry Type</label>
                    <select className="w-full bg-white border border-fiyma-taupe/40 text-xs px-3 py-2.5 text-fiyma-espresso focus:outline-none focus:ring-1 focus:ring-fiyma-berry">
                      <option>Select</option>
                      <option>Bespoke Tailoring</option>
                      <option>Bridal / Aso Ebi Group</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-fiyma-espresso mb-1">Occasion</label>
                    <select className="w-full bg-white border border-fiyma-taupe/40 text-xs px-3 py-2.5 text-fiyma-espresso focus:outline-none focus:ring-1 focus:ring-fiyma-berry">
                      <option>Select</option>
                      <option>Wedding</option>
                      <option>Corporate Gala</option>
                      <option>Birthday / Celebration</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-fiyma-espresso mb-1">Estimated number of garments</label>
                    <select className="w-full bg-white border border-fiyma-taupe/40 text-xs px-3 py-2.5 text-fiyma-espresso focus:outline-none focus:ring-1 focus:ring-fiyma-berry">
                      <option>Select</option>
                      <option>1 garment</option>
                      <option>2 - 5 garments</option>
                      <option>6+ garments (Group/Aso Ebi)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-fiyma-espresso mb-1">Desired timeline</label>
                    <select className="w-full bg-white border border-fiyma-taupe/40 text-xs px-3 py-2.5 text-fiyma-espresso focus:outline-none focus:ring-1 focus:ring-fiyma-berry">
                      <option>Select</option>
                      <option>Within 2 weeks</option>
                      <option>Within a month</option>
                      <option>1 to 3 months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-fiyma-espresso mb-1">Design inspiration (optional)</label>
                  <div className="border border-dashed border-fiyma-taupe/60 bg-white/60 p-4 text-center">
                    <p className="text-[11px] text-fiyma-espresso/60 mb-1">Upload images (max 10MB - JPG, PNG)</p>
                    <button type="button" className="text-xs font-semibold text-fiyma-berry hover:underline">
                      📁 Drag & drop files here or click to upload
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-fiyma-espresso mb-1">Budget range (optional)</label>
                  <select className="w-full bg-white border border-fiyma-taupe/40 text-xs px-3 py-2.5 text-fiyma-espresso focus:outline-none focus:ring-1 focus:ring-fiyma-berry">
                    <option>Select</option>
                    <option>₦100,000 - ₦250,000</option>
                    <option>₦250,000 - ₦500,000</option>
                    <option>₦500,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-fiyma-espresso mb-2">Preferred contact method</label>
                  <div className="flex items-center gap-6 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="contactMethod" defaultChecked className="text-fiyma-berry focus:ring-fiyma-berry" />
                      <span>WhatsApp</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="contactMethod" className="text-fiyma-berry focus:ring-fiyma-berry" />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="contactMethod" className="text-fiyma-berry focus:ring-fiyma-berry" />
                      <span>Phone</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full bg-fiyma-berry hover:bg-fiyma-berry/90 text-white text-xs uppercase tracking-wider py-3.5 transition-all shadow-md mt-4">
                  Submit Enquiry →
                </button>
              </form>
            </div>

            {/* Quick Contact Column */}
            <div className="space-y-6">
              <div className="bg-white/40 border border-fiyma-taupe/30 p-6">
                <h3 className="font-serif text-lg text-fiyma-espresso mb-6">Quick Contact</h3>
                
                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-base text-fiyma-berry">💬</span>
                    <div>
                      <p className="text-fiyma-espresso/60 text-[10px] uppercase tracking-wider">WhatsApp</p>
                      <p className="font-medium text-fiyma-espresso">+234 801 234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-base text-fiyma-berry">📸</span>
                    <div>
                      <p className="text-fiyma-espresso/60 text-[10px] uppercase tracking-wider">Instagram</p>
                      <p className="font-medium text-fiyma-espresso">@fiyma.designs</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-base text-fiyma-berry">✉️</span>
                    <div>
                      <p className="text-fiyma-espresso/60 text-[10px] uppercase tracking-wider">Email</p>
                      <p className="font-medium text-fiyma-espresso">hello@fiyma.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Note Box */}
              <div className="bg-fiyma-taupe/15 border border-fiyma-taupe/30 p-4 text-xs text-fiyma-espresso leading-relaxed">
                We typically respond within 24 hours. For urgent requests, please reach out via WhatsApp.
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}