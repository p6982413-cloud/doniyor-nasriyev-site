```tsx
import React, { useState, useRef } from 'react';
import {
  Award,
  Trophy,
  Copy,
  Check,
  Share2,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Camera,
} from 'lucide-react';

import BackgroundFX from './BackgroundFX';

// Official Social Platforms requested
interface SocialItem {
  id: string;
  name: string;
  url: string;
  handle: string;
  description: string;
}

const SOCIAL_LINKS: SocialItem[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    url: 'https://t.me/Doniyor_Nasriyev',
    handle: '@Doniyor_Nasriyev',
    description: 'Tezkor xabar va to‘g‘ridan-to‘g‘ri muloqot',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/doniyor_nasriyev',
    handle: '@doniyor_nasriyev',
    description: 'Shaxsiy profil va yangiliklar',
  },
];

// Clean brand SVG icons
function BrandIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: string;
  className?: string;
}) {
  if (name === 'telegram') {
    return (
      <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    );
  }

  if (name === 'instagram') {
    return (
      <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }

  return null;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);
  const [activeInterest, setActiveInterest] = useState<
    'all' | 'football' | 'chess'
  >('all');

  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('doniyor_custom_photo');
      if (stored) return stored;
    } catch {
      // ignore
    }

    return '/doniyor-nasriyev.jpg';
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const handleCopyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHandle(id);
      setTimeout(() => setCopiedHandle(null), 2000);
    } catch {
      setCopiedHandle(id);
      setTimeout(() => setCopiedHandle(null), 2000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result as string;

        if (result) {
          setPhotoSrc(result);

          try {
            localStorage.setItem('doniyor_custom_photo', result);
          } catch {
            // ignore
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">

      <BackgroundFX />

      <header className="sticky top-0 z-40 bg-[#f8fafc]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">

          <a
            href="#hero"
            className="text-lg md:text-xl font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Doniyor Nasriyev
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a
              href="#about"
              className="hover:text-slate-900 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all"
            >
              Haqimda
            </a>

            <a
              href="#achievements"
              className="hover:text-slate-900 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all"
            >
              Yutuqlar
            </a>

            <a
              href="#interests"
              className="hover:text-slate-900 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all"
            >
              Qiziqishlar
            </a>

            <a
              href="#contact"
              className="hover:text-slate-900 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all"
            >
              Bog'lanish
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleCopyPageUrl}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              title="Havolani nusxalash"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Nusxalandi</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ulashish</span>
                </>
              )}
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xs whitespace-nowrap cursor-pointer"
            >
              <span>Bog'lanish</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleCopyPageUrl}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Havolani ulashish"
            >
              {copiedLink ? (
                <Check className="w-5 h-5 text-emerald-600" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Menyu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white/98 px-6 py-4 space-y-3 animate-fadeIn">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600 border-b border-slate-100"
            >
              Haqimda
            </a>

            <a
              href="#achievements"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600 border-b border-slate-100"
            >
              Yutuqlar
            </a>

            <a
              href="#interests"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600 border-b border-slate-100"
            >
              Qiziqishlar
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              Bog'lanish
            </a>

            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Bog'lanish</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}

      <main className="flex-1 relative z-10">

        {/* ===================== HERO SECTION ===================== */}

        <section
          id="hero"
          className="relative max-w-6xl mx-auto px-6 pt-12 pb-20 md:pt-20 md:pb-28 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">

            <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1">

              <div className="text-xs md:text-sm font-semibold tracking-wider text-blue-600 uppercase mb-3">
                SHAXSIY SAHIFA
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-4 text-balance">
                Doniyor Nasriyev
              </h1>

              <p className="text-xl sm:text-2xl font-medium text-slate-600 mb-6">
                Iqtisod yo'nalishi talabasi
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600 mb-8 border-l-2 border-blue-600 pl-4 py-0.5">
                <span>IELTS sohibi</span>
                <span className="text-slate-300" aria-hidden="true">
                  ·
                </span>
                <span>Milliy sertifikat</span>
                <span className="text-slate-300" aria-hidden="true">
                  ·
                </span>
                <span>
                  Xalqaro olimpiada terma jamoasi sobiq a'zosi
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shadow-blue-600/20 whitespace-nowrap cursor-pointer"
                >
                  Men haqimda bilish
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all shadow-xs whitespace-nowrap cursor-pointer"
                >
                  Bog'lanish (Telegram & Instagram)
                </a>
              </div>
            </div>

            <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative group w-full max-w-sm sm:max-w-md">

                <div className="absolute -inset-1.5 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-3xl blur-xs -z-10 opacity-70" />

                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-200 border border-slate-200/90 shadow-lg shadow-slate-900/5">

                  <img
                    src={photoSrc}
                    alt="Doniyor Nasriyev"
                    className="w-full h-full object-cover object-top grayscale transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/doniyor-nasriyev.jpg';
                    }}
                  />

                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 pointer-events-none" />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 px-2.5 py-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-lg text-[11px] font-medium backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Suratni almashtirish"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Suratni almashtirish</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        {/* ===================== ABOUT SECTION ===================== */}

        <section
          id="about"
          className="max-w-6xl mx-auto px-6 py-20 md:py-28"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

            <div className="md:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 block mb-2">
                  Tanishtiruv
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Men haqimda
                </h2>

                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  Iqtisodiy tahlil, ta'limdagi intilishlar va shaxsiy qiziqishlar haqida qisqacha ma'lumot.
                </p>
              </div>
            </div>

            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs">
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-normal text-slate-800 leading-relaxed tracking-normal">
                  “Men iqtisod yo'nalishida o'qiyman. IELTS va milliy sertifikat sohibiman, avval xalqaro olimpiada terma jamoasi a'zosi bo'lganman. Bo'sh vaqtimda futbol o'ynayman va shaxmat bilan shug'ullanaman.”
                </blockquote>

                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">
                    Doniyor Nasriyev
                  </span>
                  <span>Iqtisod yo'nalishi talabasi</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        {/* ===================== ACHIEVEMENTS SECTION ===================== */}

        <section
          id="achievements"
          className="max-w-6xl mx-auto px-6 py-20 md:py-28"
        >
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 block mb-2">
              Akademik & Ilmiy
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Yutuqlar
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Xalqaro va milliy miqyosda qo'lga kiritilgan muhim sertifikatlar hamda jamoaviy ishtiroklar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Award className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  IELTS sertifikati
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Ingliz tilini xalqaro standartlar asosida erkin egallaganlikni tasdiqlovchi nufuzli xalqaro sertifikat.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-600">
                <span>Xalqaro daraja</span>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Milliy sertifikat
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Davlat ta'lim me'yorlari va mutaxassislik fanlari bo'yicha yuqori bilim darajasini tasdiqlovchi sertifikat.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-600">
                <span>Respublika miqyosida</span>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Trophy className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Xalqaro olimpiada terma jamoasi
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Xalqaro miqyosdagi fan olimpiadasida terma jamoa tarkibida ishtirok etgan sobiq a'zo.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-600">
                <span>Terma jamoa sobiq a'zosi</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        {/* ===================== INTERESTS SECTION ===================== */}

        <section
          id="interests"
          className="max-w-6xl mx-auto px-6 py-20 md:py-28"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">

            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 block mb-2">
                Hobbiy va qiziqishlar
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Qiziqishlar
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Bo'sh vaqtlarda shug'ullanadigan asosiy sport va intellektual mashg'ulotlar.
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-200/60 rounded-lg self-start sm:self-auto">

              <button
                onClick={() => setActiveInterest('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeInterest === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Barchasi
              </button>

              <button
                onClick={() => setActiveInterest('football')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeInterest === 'football'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Futbol
              </button>

              <button
                onClick={() => setActiveInterest('chess')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeInterest === 'chess'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Shaxmat
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {(activeInterest === 'all' || activeInterest === 'football') && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-600">
                      Jamoaviy sport
                    </span>

                    <span className="text-xs font-medium text-blue-600">
                      Bo'sh vaqt
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    Futbol
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Bo'sh vaqtda faol jismoniy holatni saqlash, jamoaviy birdamlik, tezkor qaror qabul qilish va sog'lom raqobat ruhiyatini shakllantiruvchi sevimli sport turi.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Jamoaviy o'yin</span>
                  <span className="font-medium text-slate-700">
                    Doimiy mashg'ulot
                  </span>
                </div>
              </div>
            )}

            {(activeInterest === 'all' || activeInterest === 'chess') && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-600">
                      Intellektual sport
                    </span>

                    <span className="text-xs font-medium text-blue-600">
                      Mantiqiy tahlil
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    Shaxmat
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Strategik fikrlash, har bir yurish oqibatini chuqur tahlil qilish, sabr-toqat va iqtisodiy tahlilga xos bo'lgan tizimli mulohaza yuritish qobiliyatini charxlaydi.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Strategik fikrlash</span>
                  <span className="font-medium text-slate-700">
                    Taktik rejalashtirish
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        {/* ===================== CONTACT SECTION ===================== */}

        <section
          id="contact"
          className="max-w-6xl mx-auto px-6 py-20 md:py-28"
        >
          <div className="max-w-3xl mx-auto text-center mb-12">

            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 block mb-2">
              Muloqot va aloqa
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Bog'lanish
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Quyidagi rasmiy ijtimoiy tarmoqlar orqali bog'lanishingiz va profillarimni kuzatishingiz mumkin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {SOCIAL_LINKS.map((social) => (
              <div
                key={social.id}
                className="bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>

                  <div className="flex items-start justify-between gap-3 mb-4">

                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <BrandIcon
                        name={social.id}
                        className="w-6 h-6"
                      />
                    </div>

                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title={`${social.name} ochish`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {social.name}
                  </h3>

                  <p className="text-xs font-medium text-blue-600 mb-2">
                    {social.handle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {social.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">

                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Profilga o'tish</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() =>
                      handleCopyText(social.url, social.id)
                    }
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Havoladan nusxa olish"
                  >
                    {copiedHandle === social.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">
                          Nusxalandi
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Nusxa olish</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}

      <footer className="border-t border-slate-200 bg-white/70 py-10 text-xs text-slate-500">

        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">

          <div className="flex flex-col items-center sm:items-start gap-1.5">

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 text-sm">
                Doniyor Nasriyev
              </span>

              <span aria-hidden="true">·</span>

              <span>Iqtisod yo'nalishi talabasi</span>
            </div>

            <p className="text-xs text-slate-500 font-normal">
              Doniyor Nasriyev (Дониёр Насриев, Doniyor Nasriev)
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">

            <a
              href="https://t.me/Doniyor_Nasriyev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <BrandIcon name="telegram" className="w-4 h-4" />
              <span>Telegram</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>

            <span className="text-slate-300" aria-hidden="true">
              ·
            </span>

            <a
              href="https://instagram.com/doniyor_nasriyev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <BrandIcon name="instagram" className="w-4 h-4" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <div>
            <p>
              © {new Date().getFullYear()} Doniyor Nasriyev. Barcha huquqlar himoyalangan.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
```
