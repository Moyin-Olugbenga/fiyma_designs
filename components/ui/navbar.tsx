import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    return (
<header className="w-full border-b border-fiyma-taupe/30 bg-fiyma-cream py-4">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16">
    
    <div className="flex items-center">
      <Link href="/" className="block relative">
        <Image 
          src="/logo.jpg" 
          alt="Fiyma Designs Logo" 
          width={250} 
          height={100} 
          className="h-10 w-auto object-contain"
          priority
        />
      </Link>
    </div>

    {/* Navigation Links */}
    <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide font-medium">
      <Link href="/" className="hover:text-fiyma-berry transition-colors">Home</Link>
      <Link href="/gallery" className="hover:text-fiyma-berry transition-colors">Gallery</Link>
      <Link href="/about" className="hover:text-fiyma-berry transition-colors">About</Link>
      <Link href="/contact" className="hover:text-fiyma-berry transition-colors">Contact</Link>
      <Link href="/faq" className="hover:text-fiyma-berry transition-colors">FAQs</Link>
    </nav>

    {/* Icons */}
    <div className="flex items-center gap-4 text-fiyma-espresso">
      <Link href="/search" aria-label="Search" className="hover:text-fiyma-berry">
        
      </Link>
      <Link href="/cart" aria-label="Cart" className="hover:text-fiyma-berry">
      </Link>

      <Link href="/signup" aria-label="Sign Up" className="bg-fiyma-berry hover:bg-fiyma-berry/90 text-white text-sm tracking-wider px-6 py-3 rounded-none transition-all flex items-center gap-2 shadow-md"> Sign up
      </Link>
       
    </div>

  </div>
</header>
    );
} 