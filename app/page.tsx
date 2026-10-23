import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-fiyma-cream text-fiyma-espresso flex flex-col items-center">
      {/* Main Container simulating the framed layout */}
      <div className="w-full bg-fiyma-cream shadow-2xl overflow-hidden my-0">

      <Navbar />

        {/* ================= HERO SECTION ================= */}
        <section className="relative w-full bg-fiyma-plum text-white px-6 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between overflow-hidden">
          <div className="max-w-xl z-10 mb-10 md:mb-0">
            <p className="text-xs uppercase tracking-[0.25em] text-fiyma-taupe mb-4">FIYMA DESIGNS</p>
            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight mb-6">
              Elegance, in every expression.
            </h1>
            <p className="text-fiyma-cream/80 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              From the moments that define your career to the celebrations that become your memories. Discover pieces made for every expression of you.
            </p>
            <button className="bg-fiyma-berry hover:bg-fiyma-berry/90 text-white text-sm tracking-wider px-6 py-3 rounded-none transition-all flex items-center gap-2 shadow-md">
              Discover the Collection →
            </button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="w-full md:w-[45%] h-[400px] md:h-[500px] bg-fiyma-taupe/20 border border-fiyma-taupe/30 flex items-center justify-center text-fiyma-taupe italic text-sm relative">
            [ Hero Image: Woman in Plum Gown ]
          </div>
        </section>

        {/* ================= THE FIYMA WOMAN ================= */}
        <section className="px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b border-fiyma-taupe/20">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-fiyma-berry mb-2 font-semibold">THE FIYMA WOMAN</p>
            <h2 className="font-serif text-3xl md:text-4xl text-fiyma-espresso mb-6">
              Designed for every woman you are.
            </h2>
            <p className="text-fiyma-espresso/80 text-sm leading-relaxed mb-6">
              She leads, she celebrates, she lives. The Fiyma woman moves through every chapter of her life with grace, confidence and intention — and her wardrobe should do the same.
            </p>
            <Link href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-fiyma-espresso hover:text-fiyma-berry transition-colors">
              Our Story →
            </Link>
          </div>

          {/* Woman Portrait Placeholder */}
          <div className="w-full h-[320px] bg-fiyma-taupe/20 border border-fiyma-taupe/30 flex items-center justify-center text-fiyma-taupe italic text-sm">
            [ Portrait: Woman with Gele ]
          </div>
        </section>

        {/* ================= THE THREE WORLDS OF FIYMA ================= */}
        <section className="px-6 md:px-16 py-16 border-b border-fiyma-taupe/20">
          <h2 className="font-serif text-3xl md:text-4xl text-fiyma-espresso mb-2">The Three Worlds of Fiyma</h2>
          <p className="text-xs uppercase tracking-[0.15em] text-fiyma-espresso/60 mb-12">One signature. Three expressions.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* World 1 */}
            <div className="flex flex-col items-center">
              <div className="w-full h-80 bg-fiyma-taupe/20 border border-fiyma-taupe/30 mb-4 flex items-center justify-center text-fiyma-taupe italic text-xs">
                [ Corporate Image ]
              </div>
              <h3 className="font-serif text-lg font-semibold mb-1">Corporate</h3>
              <p className="text-xs text-fiyma-espresso/70 mb-4">That all-out heading as a mission.</p>
              <Link href="#" className="text-xs font-bold uppercase tracking-wider text-fiyma-espresso hover:text-fiyma-berry">
                Explore Collection →
              </Link>
            </div>

            {/* World 2 */}
            <div className="flex flex-col items-center">
              <div className="w-full h-80 bg-fiyma-taupe/20 border border-fiyma-taupe/30 mb-4 flex items-center justify-center text-fiyma-taupe italic text-xs">
                [ Aso Ebi Image ]
              </div>
              <h3 className="font-serif text-lg font-semibold mb-1">Aso Ebi</h3>
              <p className="text-xs text-fiyma-espresso/70 mb-4">For moments worth remembering.</p>
              <Link href="#" className="text-xs font-bold uppercase tracking-wider text-fiyma-espresso hover:text-fiyma-berry">
                Explore Collection →
              </Link>
            </div>

            {/* World 3 */}
            <div className="flex flex-col items-center">
              <div className="w-full h-80 bg-fiyma-taupe/20 border border-fiyma-taupe/30 mb-4 flex items-center justify-center text-fiyma-taupe italic text-xs">
                [ Casual Image ]
              </div>
              <h3 className="font-serif text-lg font-semibold mb-1">Casual</h3>
              <p className="text-xs text-fiyma-espresso/70 mb-4">Beautifully effortless you.</p>
              <Link href="#" className="text-xs font-bold uppercase tracking-wider text-fiyma-espresso hover:text-fiyma-berry">
                Explore Collection →
              </Link>
            </div>
          </div>
        </section>

        {/* ================= THE FIYMA EDIT ================= */}
        <section className="px-6 md:px-16 py-16 border-b border-fiyma-taupe/20">
          <h2 className="font-serif text-3xl md:text-4xl text-fiyma-espresso mb-2">The Fiyma Edit</h2>
          <p className="text-xs uppercase tracking-[0.15em] text-fiyma-espresso/60 mb-10">Curated pieces. Timeless results.</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-64 bg-fiyma-taupe/20 border border-fiyma-taupe/30 flex items-center justify-center text-fiyma-taupe italic text-xs p-2 text-center">
                [ Edit Item {item} ]
              </div>
            ))}
          </div>
        </section>

        {/* ================= THE ATELIER ================= */}
        <section className="px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b border-fiyma-taupe/20">
          <div className="w-full h-72 bg-fiyma-taupe/20 border border-fiyma-taupe/30 flex items-center justify-center text-fiyma-taupe italic text-sm">
            [ Atelier Crafting Hands / Embroidery ]
          </div>

          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-fiyma-espresso mb-2">The Atelier</h2>
            <p className="text-xs uppercase tracking-[0.15em] text-fiyma-berry mb-4 font-semibold">Exceptional fabrics. Masterful tailoring. Timeless results.</p>
            <p className="text-fiyma-espresso/80 text-sm leading-relaxed mb-6">
              Every piece begins with a vision and comes to life through a careful selection of ateliers & the construction and meticulous attention to detail.
            </p>
            <Link href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-fiyma-espresso hover:text-fiyma-berry transition-colors">
              The Process →
            </Link>
          </div>
        </section>

        {/* ================= CLIENT QUOTE & CTA ================= */}
        <section className="px-6 md:px-16 py-20 text-center flex flex-col items-center border-b border-fiyma-taupe/20">
          <blockquote className="max-w-xl font-serif text-xl md:text-2xl text-fiyma-espresso italic mb-4">
            &ldquo;The fit, the fabric, the way I feel — this is beyond just clothing. It&apos;s an experience.&rdquo;
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-fiyma-espresso/60 mb-10">— Client</p>

          <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-fiyma-espresso hover:text-fiyma-berry transition-colors">
            Explore the Full Collection →
          </Link>
        </section>
        <Footer />
      </div>
    </div>
  );
}