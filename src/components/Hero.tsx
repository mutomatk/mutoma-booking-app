import { ChevronDown, MapPin } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
          alt="Luxury apartment"
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up stagger-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Itawa, Ndola — Zambia
          </div>
        </div>

        <h1 className="animate-fade-in-up stagger-2 text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
          Luxury Living,
          <br />
          <span className="text-[#FF385C]">Redefined</span>
        </h1>

        <p className="animate-fade-in-up stagger-3 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover handpicked premium apartments in Ndola. Experience comfort,
          elegance, and the warmth of home — away from home.
        </p>

        <div className="animate-fade-in-up stagger-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="btn-coral !px-8 !py-4 !text-lg !rounded-2xl"
          >
            Explore Apartments
          </button>
          <button
            onClick={onExplore}
            className="px-8 py-4 rounded-2xl text-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            View Gallery
          </button>
        </div>
      </div>

      <button
        onClick={onExplore}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
