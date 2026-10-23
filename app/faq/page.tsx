"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';

const faqs = [
  { q: "How long does it take to receive my order?", a: "Standard production and delivery typically take 7 to 14 business days depending on your location and custom requirements." },
  { q: "Can I customise a design?", a: "Yes! You can customize colors, measurements, and design details via our Bespoke order option or by contacting our team." },
  { q: "What if my size isn't available?", a: "We offer custom sizing options. Simply select custom measurements during checkout or reach out to us on WhatsApp." },
  { q: "Do you offer returns or exchanges?", a: "Please review our returns policy for eligible items. Custom and bespoke tailored pieces are final sale." },
  { q: "How do I care for my garments?", a: "We recommend professional dry cleaning for all structured wool, silk, and heavily embellished pieces to maintain fabric integrity." },
  { q: "Do you ship internationally?", a: "Yes, we ship worldwide with expedited courier partners." },
  { q: "What payment methods do you accept?", a: "We accept secure bank transfers, debit cards, and online payment gateways." },
];

const policies = [
  { title: "Shipping Policy", desc: "Delivery timelines and costs", icon: "📦" },
  { title: "Returns & Exchanges", desc: "Terms and conditions", icon: "🔄" },
  { title: "Privacy Policy", desc: "How we protect your information", icon: "🔒" },
  { title: "Terms of Service", desc: "Your use of our website", icon: "📄" },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-fiyma-cream text-fiyma-espresso flex flex-col items-center">
      <div className="w-full bg-fiyma-cream overflow-hidden">

        <Navbar />

        {/* ================= MAIN CONTENT GRID ================= */}
        <section className="px-6 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Frequently Asked Questions */}
          <div className="lg:col-span-7">
            <h1 className="font-serif text-3xl font-normal text-fiyma-espresso mb-1">Frequently Asked Questions</h1>
            <p className="text-xs text-fiyma-espresso/60 mb-8">Everything you need to know about your Fiyma experience.</p>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="bg-white/50 border border-fiyma-taupe/30 overflow-hidden transition-all">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center p-4 text-left text-xs font-semibold text-fiyma-espresso hover:text-fiyma-berry"
                    >
                      <span>{faq.q}</span>
                      <span className="text-base font-bold">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-fiyma-espresso/70 leading-relaxed border-t border-fiyma-taupe/20 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Policies & Help Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-normal text-fiyma-espresso mb-1">Policies</h2>
              <p className="text-xs text-fiyma-espresso/60 mb-6">Our commitment to your satisfaction.</p>

              <div className="space-y-3">
                {policies.map((pol, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/50 border border-fiyma-taupe/30 p-4 hover:border-fiyma-berry transition-colors cursor-pointer">
                    <span className="text-lg">{pol.icon}</span>
                    <div>
                      <h3 className="text-xs font-semibold text-fiyma-espresso">{pol.title}</h3>
                      <p className="text-[11px] text-fiyma-espresso/60">{pol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Still have questions banner */}
            <div className="bg-fiyma-plum text-white p-6 shadow-md">
              <h3 className="font-serif text-lg font-semibold mb-1">Still have questions?</h3>
              <p className="text-xs text-white/70 mb-6">We&apos;re here to help.</p>

              <div className="flex items-center justify-between">
                <div className="text-xs">
                  <p className="text-white/60 text-[10px] uppercase tracking-wider">Chat with us on WhatsApp</p>
                  <p className="font-medium text-white">+234 801 234 5678</p>
                </div>
                <Link href="/contact">
                  <button className="bg-fiyma-berry hover:bg-fiyma-berry/80 text-white text-xs px-4 py-2.5 transition-colors">
                    Contact Us →
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </section>
        <Footer />

      </div>
    </div>
  );
}