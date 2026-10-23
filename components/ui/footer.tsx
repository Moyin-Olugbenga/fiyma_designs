import Link from 'next/link';

export default function Footer() {
    return (
        
        <footer className="bg-fiyma-plum text-white px-6 md:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span>👑</span>
                <span className="font-serif tracking-widest text-lg font-bold">FIYMA</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Elegance, in every expression.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-fiyma-taupe mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li><Link href="#" className="hover:text-white">Home</Link></li>
                <li><Link href="#" className="hover:text-white">Gallery</Link></li>
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-fiyma-taupe mb-4">Collections</h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li><Link href="#" className="hover:text-white">Corporate</Link></li>
                <li><Link href="#" className="hover:text-white">Aso Ebi</Link></li>
                <li><Link href="#" className="hover:text-white">Casual</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-fiyma-taupe mb-4">Get in Touch</h4>
              <p className="text-xs text-white/80 mb-2">Lekki Phase 1, Lagos, Nigeria</p>
              <p className="text-xs text-white/80 mb-4">hello@fiyma.com</p>
              <div className="mt-4">
                <p className="text-xs font-semibold mb-2">Join our Inner Circle</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-white/10 border border-white/20 text-xs px-3 py-2 text-white placeholder-white/50 focus:outline-none w-full"
                  />
                  <button className="bg-fiyma-berry text-white text-xs px-4 py-2 hover:bg-fiyma-berry/80 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-4">
            <p>© 2025 Fiyma Designs. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white">Privacy</Link>
              <Link href="#" className="hover:text-white">Terms</Link>
              <Link href="#" className="hover:text-white">Shipping</Link>
            </div>
          </div>
        </footer>
    )
}