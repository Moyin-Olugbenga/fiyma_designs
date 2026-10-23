"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-fiyma-cream text-fiyma-espresso flex items-center justify-center p-4 md:p-8">
      
      <div className="w-full max-w-5xl bg-fiyma-cream shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-fiyma-taupe/30">
        
        <div className="lg:col-span-6 relative bg-fiyma-plum text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">
        
          <div className="flex items-center gap-2 z-10">
            <span className="text-xl">👑</span>
            <span className="font-serif tracking-widest text-lg font-bold">FIYMA</span>
          </div>

          {/* Actual Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/signup-bg.jpg" // Replace with your image filename in the public folder
              alt="Fiyma Gift Box & Fabric" 
              fill 
              className="object-cover opacity-60"
              priority
            />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 mt-32 md:mt-48">
            <h1 className="font-serif text-3xl md:text-5xl font-normal leading-tight mb-4">
              More than fashion.<br />It&apos;s a lifestyle.[cite: 10]
            </h1>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-sm">
              Create an account to enjoy a seamless shopping experience, exclusive updates and personalized service[cite: 10].
            </p>
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center bg-fiyma-cream">
          <div className="flex justify-end mb-6">
            <Link href="/" className="text-xs text-fiyma-espresso/70 hover:text-fiyma-berry transition-colors">
              ← Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="font-serif text-3xl text-fiyma-espresso mb-2">Welcome Back</h2>
            <p className="text-xs text-fiyma-espresso/70 leading-relaxed">
              Sign in to access your account, order history, wishlist and more.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-fiyma-espresso/50">👤</span>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white/70 border border-fiyma-taupe/40 text-xs pl-9 pr-4 py-3 text-fiyma-espresso placeholder-fiyma-espresso/40 focus:outline-none focus:ring-1 focus:ring-fiyma-berry"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-fiyma-espresso/50">🔒</span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className="w-full bg-white/70 border border-fiyma-taupe/40 text-xs pl-9 pr-10 py-3 text-fiyma-espresso placeholder-fiyma-espresso/40 focus:outline-none focus:ring-1 focus:ring-fiyma-berry"
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

            <div className="flex items-center justify-between text-xs py-1">
              <label className="flex items-center gap-2 cursor-pointer text-fiyma-espresso/80">
                <input type="checkbox" className="rounded border-fiyma-taupe text-fiyma-berry focus:ring-fiyma-berry" />
                <span>Remember me</span>
              </label>
              <Link href="#" className="text-fiyma-espresso/80 hover:text-fiyma-berry">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="w-full bg-fiyma-berry hover:bg-fiyma-berry/90 text-white text-xs uppercase tracking-wider py-3.5 transition-all shadow-md">
              Sign In →
            </button>
          </form>

          <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-fiyma-taupe/30"></div>
            <span className="flex-shrink mx-4 text-[11px] text-fiyma-espresso/50 uppercase tracking-wider">or continue with</span>
            <div className="flex-grow border-t border-fiyma-taupe/30"></div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-white hover:bg-white/80 border border-fiyma-taupe/40 text-xs text-fiyma-espresso py-3 flex items-center justify-center gap-2 transition-all">
              <span>G</span> Continue with Google
            </button>
            <button className="w-full bg-white hover:bg-white/80 border border-fiyma-taupe/40 text-xs text-fiyma-espresso py-3 flex items-center justify-center gap-2 transition-all">
              <span></span> Continue with Apple
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}