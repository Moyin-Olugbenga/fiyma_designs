"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-fiyma-cream text-fiyma-espresso flex items-center justify-center p-4 md:p-8">
      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-fiyma-cream shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-fiyma-taupe/30">
        
        {/* Left Side: Brand Visual Panel */}
        <div className="lg:col-span-6 relative bg-fiyma-plum text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">
          {/* Logo */}
          <div className="flex items-center gap-2 z-10">
            <span className="text-xl">👑</span>
            <span className="font-serif tracking-widest text-lg font-bold">FIYMA</span>
          </div>

          {/* Background Photo Placeholder */}
          <div className="absolute inset-0 bg-fiyma-taupe/20 flex items-center justify-center text-fiyma-taupe italic text-xs z-0 opacity-40">
            [ Background Image: Fiyma Gift Box & Fabric ]
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 mt-32 md:mt-48">
            <h1 className="font-serif text-3xl md:text-5xl font-normal leading-tight mb-4">
              More than fashion.<br />It&apos;s a lifestyle.
            </h1>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-sm">
              Create an account to enjoy a seamless shopping experience, exclusive updates and personalized service.
            </p>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center bg-fiyma-cream">
          <div className="flex justify-end mb-4">
            <Link href="/" className="text-xs text-fiyma-espresso/70 hover:text-fiyma-berry transition-colors">
              ← Back to Home
            </Link>
          </div>

          <div className="mb-6">
            <h2 className="font-serif text-3xl text-fiyma-espresso mb-1">Create Your Account</h2>
            <p className="text-xs text-fiyma-espresso/70">
              Join the Fiyma community.
            </p>
          </div>

          <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[11px] font-medium text-fiyma-espresso/80 mb-1">Full name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-fiyma-espresso/50">👤</span>
                <input 
                  type="text" 
                  placeholder="e.g. Adoeze Okafor" 
                  className="w-full bg-white/70 border border-fiyma-taupe/40 text-xs pl-9 pr-4 py-2.5 text-fiyma-espresso placeholder-fiyma-espresso/40 focus:outline-none focus:ring-1 focus:ring-fiyma-berry"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-fiyma-espresso/80 mb-1">Email address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-fiyma-espresso/50">✉️</span>
                <input 
                  type="email" 
                  placeholder="you@domain.com" 
                  className="w-full bg-white/70 border border-fiyma-taupe/40 text-xs pl-9 pr-4 py-2.5 text-fiyma-espresso placeholder-fiyma-espresso/40 focus:outline-none focus:ring-1 focus:ring-fiyma-berry"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-fiyma-espresso/80 mb-1">Phone number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-fiyma-espresso/50">📞</span>
                <input 
                  type="tel" 
                  placeholder="+234 801 234 5678" 
                  className="w-full bg-white/70 border border-fiyma-taupe/40 text-xs pl-9 pr-4 py-2.5 text-fiyma-espresso placeholder-fiyma-espresso/40 focus:outline-none focus:ring-1 focus:ring-fiyma-berry"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-fiyma-espresso/80 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-fiyma-espresso/50">🔒</span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Minimum 8 characters" 
                  className="w-full bg-white/70 border border-fiyma-taupe/40 text-xs pl-9 pr-10 py-2.5 text-fiyma-espresso placeholder-fiyma-espresso/40 focus:outline-none focus:ring-1 focus:ring-fiyma-berry"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-fiyma-espresso/60 hover:text-fiyma-espresso"
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs py-1">
              <input type="checkbox" id="terms" className="rounded border-fiyma-taupe text-fiyma-berry focus:ring-fiyma-berry" />
              <label htmlFor="terms" className="text-fiyma-espresso/80 text-[11px]">
                I agree to the <Link href="/faq" className="text-fiyma-berry underline">Terms & Conditions</Link> and <Link href="/faq" className="text-fiyma-berry underline">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className="w-full bg-fiyma-berry hover:bg-fiyma-berry/90 text-white text-xs uppercase tracking-wider py-3.5 transition-all shadow-md mt-2">
              Create Account →
            </button>
          </form>

          <div className="text-center text-xs text-fiyma-espresso/70 mt-6">
            Already have an account? <Link href="/signin" className="text-fiyma-berry font-semibold underline hover:text-fiyma-espresso">Sign in</Link>
          </div>

        </div>

      </div>
    </div>
  );
}