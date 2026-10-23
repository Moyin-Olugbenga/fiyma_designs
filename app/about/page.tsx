import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-fiyma-cream text-fiyma-espresso flex flex-col items-center">
      <div className="w-full bg-fiyma-cream overflow-hidden">
        <Navbar />

        {/* ================= HERO SECTION ================= */}
        <section className="px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b border-fiyma-taupe/20">
          <div className="w-full h-[400px] bg-fiyma-taupe/20 border border-fiyma-taupe/30 flex items-center justify-center text-fiyma-taupe italic text-sm">
            [ About Hero Image: Woman in Plum Gown & Gele ]
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-fiyma-berry mb-3 font-semibold">THE FIYMA DESIGNS</p>
            <h1 className="font-serif text-3xl md:text-5xl font-normal leading-tight mb-6">
              More than fashion.<br />A philosophy.
            </h1>
            <p className="text-fiyma-espresso/80 text-sm leading-relaxed mb-8">
              Fiyma Designs was born from a single belief — that every woman deserves to feel extraordinary, not just on special occasions, but in every chapter of her life.
            </p>
            <button className="bg-fiyma-berry hover:bg-fiyma-berry/90 text-white text-xs tracking-wider px-6 py-3 transition-all shadow-md">
              Our Story →
            </button>
          </div>
        </section>

        {/* ================= THE FIYMA PHILOSOPHY ================= */}
        <section className="px-6 md:px-16 py-20 text-center border-b border-fiyma-taupe/20">
          <h2 className="font-serif text-3xl md:text-4xl text-fiyma-espresso mb-12">The Fiyma Philosophy</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-4 text-fiyma-berry">🦋</div>
              <h3 className="font-serif text-lg font-semibold mb-2">Intentional Design</h3>
              <p className="text-xs text-fiyma-espresso/70 max-w-xs leading-relaxed">
                Every piece is created with a purpose and a woman in mind.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-2xl mb-4 text-fiyma-berry">✨</div>
              <h3 className="font-serif text-lg font-semibold mb-2">Timeless Elegance</h3>
              <p className="text-xs text-fiyma-espresso/70 max-w-xs leading-relaxed">
                Styles that transcend trends and seasons.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-2xl mb-4 text-fiyma-berry">🧵</div>
              <h3 className="font-serif text-lg font-semibold mb-2">Exceptional Quality</h3>
              <p className="text-xs text-fiyma-espresso/70 max-w-xs leading-relaxed">
                Thoughtful fabrics, meticulous tailoring, lasting beauty.
              </p>
            </div>
          </div>
        </section>

        {/* ================= THE COLLECTIONS ================= */}
        <section className="px-6 md:px-16 py-20 border-b border-fiyma-taupe/20">
          <h2 className="font-serif text-3xl md:text-4xl text-fiyma-espresso mb-10">The Collections</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col bg-white/40 border border-fiyma-taupe/30 p-4">
              <div className="w-full h-72 bg-fiyma-taupe/20 mb-4 flex items-center justify-center text-fiyma-taupe italic text-xs">
                [ Corporate Image ]
              </div>
              <h3 className="font-serif text-lg font-semibold mb-1">Corporate</h3>
              <p className="text-xs text-fiyma-espresso/70 mb-4">For the woman who leads.</p>
              <Link href="/gallery" className="text-xs font-bold uppercase tracking-wider text-fiyma-espresso hover:text-fiyma-berry">
                Explore →
              </Link>
            </div>

            <div className="flex flex-col bg-white/40 border border-fiyma-taupe/30 p-4">
              <div className="w-full h-72 bg-fiyma-taupe/20 mb-4 flex items-center justify-center text-fiyma-taupe italic text-xs">
                [ Aso Ebi Image ]
              </div>
              <h3 className="font-serif text-lg font-semibold mb-1">Aso Ebi</h3>
              <p className="text-xs text-fiyma-espresso/70 mb-4">For moments worth remembering.</p>
              <Link href="/gallery" className="text-xs font-bold uppercase tracking-wider text-fiyma-espresso hover:text-fiyma-berry">
                Explore →
              </Link>
            </div>

            <div className="flex flex-col bg-white/40 border border-fiyma-taupe/30 p-4">
              <div className="w-full h-72 bg-fiyma-taupe/20 mb-4 flex items-center justify-center text-fiyma-taupe italic text-xs">
                [ Casual Image ]
              </div>
              <h3 className="font-serif text-lg font-semibold mb-1">Casual</h3>
              <p className="text-xs text-fiyma-espresso/70 mb-4">Beautifully, effortlessly you.</p>
              <Link href="/gallery" className="text-xs font-bold uppercase tracking-wider text-fiyma-espresso hover:text-fiyma-berry">
                Explore →
              </Link>
            </div>
          </div>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="px-6 md:px-16 py-20 text-center flex flex-col items-center">
          <h2 className="font-serif text-2xl md:text-3xl text-fiyma-espresso mb-6">
            Ready to find your next favorite piece?
          </h2>
          <Link href="/gallery">
            <button className="bg-fiyma-berry hover:bg-fiyma-berry/90 text-white text-xs uppercase tracking-widest px-8 py-3 transition-all shadow-md">
              Explore the Collection →
            </button>
          </Link>
        </section>

        <Footer />

      </div>
    </div>
  );
}