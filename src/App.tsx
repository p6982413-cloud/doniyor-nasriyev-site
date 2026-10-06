import React, { useRef, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Camera,
  Check,
  Copy,
  Crown,
  Instagram,
  Menu,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';

import BackgroundFX from './BackgroundFX';

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
    description: 'Tezkor aloqa va to‘g‘ridan-to‘g‘ri muloqot',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/doniyor_nasriyev',
    handle: '@doniyor_nasriyev',
    description: 'Shaxsiy profil va kundalik yangiliklar',
  },
];

function TelegramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.7 4.3c.3-1.1-.8-1.6-1.7-1.2L3.1 10.2c-1.2.5-1.2 1.2-.2 1.5l4.3 1.3 1.6 5.1c.2.7.1 1 .8 1 .5 0 .7-.2 1-.5l2.1-2 4.4 3.2c.8.5 1.4.2 1.6-.8L21.7 4.3zM8 12.6l9.9-6.2c.5-.3.9-.1.5.2l-8.1 7.3-.3 2.6-1.1-3.9-1.1-.3.2-.1z" />
    </svg>
  );
}

function SocialIcon({
  id,
  className = 'w-5 h-5',
}: {
  id: string;
  className?: string;
}) {
  if (id === 'telegram') {
    return <TelegramIcon className={className} />;
  }

  return <Instagram className={className} />;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSocial, setCopiedSocial] = useState<string | null>(null);
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

  const copyPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // ignore
    }

    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const copySocial = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }

    setCopiedSocial(id);
    setTimeout(() => setCopiedSocial(null), 2200);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result as string;

      if (!result) return;

      setPhotoSrc(result);

      try {
        localStorage.setItem('doniyor_custom_photo', result);
      } catch {
        // ignore
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden">
      <BackgroundFX />

      {/* GOLDEN BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#d4af37]/10 blur-[140px]" />
        <div className="absolute top-[45%] left-[-300px] w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
        <div className="absolute bottom-[-250px] right-[-200px] w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#080808]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <a href="#hero" className="group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#d4af37]/50 flex items-center justify-center bg-[#d4af37]/5">
                <Crown className="w-5 h-5 text-[#d4af37]" />
              </div>

              <div>
                <div className="text-sm font-bold tracking-[0.18em] text-white">
                  DONIYOR
                </div>
                <div className="text-[9px] tracking-[0.3em] text-[#d4af37]">
                  NASRIYEV
                </div>
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a
              href="#about"
              className="hover:text-[#d4af37] transition-colors"
            >
              Men haqimda
            </a>
            <a
              href="#achievements"
              className="hover:text-[#d4af37] transition-colors"
            >
              Yutuqlar
            </a>
            <a
              href="#interests"
              className="hover:text-[#d4af37] transition-colors"
            >
              Qiziqishlar
            </a>
            <a
              href="#contact"
              className="hover:text-[#d4af37] transition-colors"
            >
              Aloqa
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={copyPageUrl}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/70 hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4" />
                  Nusxalandi
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Havolani nusxalash
                </>
              )}
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37] text-black text-xs font-bold hover:bg-[#e4c35a] transition-all"
            >
              Bog'lanish
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={copyPageUrl}
              className="p-2.5 rounded-full border border-white/10 text-white/70 hover:text-[#d4af37] cursor-pointer"
              aria-label="Havolani nusxalash"
            >
              {copiedLink ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full border border-white/10 text-white/70 cursor-pointer"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0b0b0b] px-6 py-5 space-y-2">
            {[
              ['#about', 'Men haqimda'],
              ['#achievements', 'Yutuqlar'],
              ['#interests', 'Qiziqishlar'],
              ['#contact', 'Aloqa'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-sm text-white/70 border-b border-white/5 hover:text-[#d4af37]"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section
          id="hero"
          className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-24 md:pt-24 md:pb-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-7">
                <Sparkles className="w-3.5 h-3.5" />
                Shaxsiy Portfolio
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.95]">
                Doniyor
                <span className="block text-[#d4af37] mt-2">
                  Nasriyev
                </span>
              </h1>

              <div className="w-20 h-px bg-[#d4af37] my-8" />

              <p className="text-xl sm:text-2xl text-white/70 font-light">
                Iqtisod yo'nalishi talabasi
              </p>

              <p className="mt-5 max-w-2xl text-sm sm:text-base leading-7 text-white/45">
                IELTS va milliy sertifikat sohibi. Xalqaro olimpiada terma
                jamoasi sobiq a'zosi. Bilim, intilish va rivojlanish yo'lida
                harakat qiluvchi yosh mutaxassis.
              </p>

              <div className="flex flex-wrap gap-3 mt-9">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#d4af37] text-black text-sm font-bold hover:bg-[#e4c35a] transition-all"
                >
                  Men haqimda
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 bg-white/5 text-white text-sm font-semibold hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all"
                >
                  Bog'lanish
                </a>
              </div>

              <div className="flex flex-wrap gap-7 mt-10 pt-7 border-t border-white/10">
                <div>
                  <div className="text-[#d4af37] text-xl font-bold">IELTS</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/35 mt-1">
                    Sertifikat
                  </div>
                </div>

                <div>
                  <div className="text-[#d4af37] text-xl font-bold">
                    Milliy
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-white/35 mt-1">
                    Sertifikat
                  </div>
                </div>

                <div>
                  <div className="text-[#d4af37] text-xl font-bold">
                    Xalqaro
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-white/35 mt-1">
                    Olimpiada
                  </div>
                </div>
              </div>
            </div>

            {/* PHOTO */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px]">
                <div className="absolute -inset-5 rounded-[40px] border border-[#d4af37]/10" />
                <div className="absolute -inset-2 rounded-[34px] border border-[#d4af37]/25" />

                <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-[#111] border border-white/10 shadow-2xl">
                  <img
                    src={photoSrc}
                    alt="Doniyor Nasriyev"
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      e.currentTarget.src = '/doniyor-nasriyev.jpg';
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="text-[#d4af37] text-[10px] tracking-[0.25em] uppercase font-bold">
                      Doniyor Nasriyev
                    </div>

                    <div className="text-white text-lg font-semibold mt-1">
                      Economics Student
                    </div>
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute top-4 right-4 p-3 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-[#d4af37] opacity-0 hover:opacity-100 transition-all cursor-pointer"
                    title="Suratni almashtirish"
                  >
                    <Camera className="w-4 h-4" />
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="border-y border-white/10 bg-white/[0.015]"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <div className="text-[#d4af37] text-[10px] font-bold tracking-[0.25em] uppercase">
                  01 — Tanishtiruv
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold mt-4">
                  Men
                  <span className="text-[#d4af37]"> haqimda</span>
                </h2>
              </div>

              <div className="md:col-span-8">
                <div className="relative p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.025]">
                  <div className="absolute top-0 left-8 w-16 h-px bg-[#d4af37]" />

                  <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed text-white/75 font-light">
                    “Men iqtisod yo'nalishida o'qiyman. IELTS va milliy
                    sertifikat sohibiman, avval xalqaro olimpiada terma
                    jamoasi a'zosi bo'lganman. Bo'sh vaqtimda futbol o'ynayman
                    va shaxmat bilan shug'ullanaman.”
                  </p>

                  <div className="mt-10 flex items-center gap-3">
                    <div className="w-10 h-px bg-[#d4af37]" />
                    <span className="text-xs text-[#d4af37] font-semibold tracking-wider">
                      DONIYOR NASRIYEV
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section
          id="achievements"
          className="max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32"
        >
          <div className="mb-14">
            <div className="text-[#d4af37] text-[10px] font-bold tracking-[0.25em] uppercase">
              02 — Akademik
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mt-4">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Asosiy
                <span className="text-[#d4af37]"> yutuqlar</span>
              </h2>

              <p className="max-w-md text-sm leading-6 text-white/40">
                Ta'lim va xalqaro faoliyat davomida qo'lga kiritilgan muhim
                natijalar.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Award,
                number: '01',
                title: 'IELTS',
                text: 'Ingliz tilini xalqaro standartlar asosida egallaganlikni tasdiqlovchi xalqaro sertifikat.',
              },
              {
                icon: Sparkles,
                number: '02',
                title: 'Milliy sertifikat',
                text: "Bilim va akademik tayyorgarlik darajasini tasdiqlovchi milliy sertifikat.",
              },
              {
                icon: Trophy,
                number: '03',
                title: 'Xalqaro olimpiada',
                text: "Xalqaro fan olimpiadasida terma jamoa tarkibida ishtirok etgan sobiq a'zo.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group relative p-7 sm:p-9 rounded-3xl border border-white/10 bg-white/[0.025] hover:bg-[#d4af37]/[0.04] hover:border-[#d4af37]/30 transition-all duration-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/5 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#d4af37]" />
                    </div>

                    <span className="text-4xl font-black text-white/[0.06]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mt-9">{item.title}</h3>

                  <p className="text-sm text-white/40 leading-6 mt-3">
                    {item.text}
                  </p>

                  <div className="w-10 h-px bg-[#d4af37]/40 mt-7 group-hover:w-20 transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </section>

        {/* INTERESTS */}
        <section
          id="interests"
          className="border-y border-white/10 bg-white/[0.015]"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
              <div>
                <div className="text-[#d4af37] text-[10px] font-bold tracking-[0.25em] uppercase">
                  03 — Lifestyle
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold mt-4">
                  Qiziqishlar
                </h2>
              </div>

              <div className="flex gap-1 p-1 rounded-full bg-white/5 border border-white/10 w-fit">
                {[
                  ['all', 'Barchasi'],
                  ['football', 'Futbol'],
                  ['chess', 'Shaxmat'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() =>
                      setActiveInterest(
                        id as 'all' | 'football' | 'chess'
                      )
                    }
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeInterest === id
                        ? 'bg-[#d4af37] text-black'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {(activeInterest === 'all' ||
                activeInterest === 'football') && (
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] p-8 sm:p-10">
                  <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full border border-[#d4af37]/10" />
                  <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full border border-[#d4af37]/10" />

                  <div className="relative">
                    <div className="text-[#d4af37] text-xs tracking-[0.2em] uppercase">
                      Sport
                    </div>

                    <h3 className="text-3xl font-bold mt-4">Futbol</h3>

                    <p className="text-sm leading-7 text-white/40 mt-5 max-w-lg">
                      Faol jismoniy holatni saqlash, jamoaviy birdamlik,
                      tezkor qaror qabul qilish va sog'lom raqobat ruhini
                      rivojlantiruvchi sevimli sport turi.
                    </p>

                    <div className="flex gap-2 mt-8">
                      <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50">
                        Jamoaviy o'yin
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50">
                        Faollik
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {(activeInterest === 'all' ||
                activeInterest === 'chess') && (
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] p-8 sm:p-10">
                  <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full border border-[#d4af37]/10" />
                  <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full border border-[#d4af37]/10" />

                  <div className="relative">
                    <div className="text-[#d4af37] text-xs tracking-[0.2em] uppercase">
                      Intellektual sport
                    </div>

                    <h3 className="text-3xl font-bold mt-4">Shaxmat</h3>

                    <p className="text-sm leading-7 text-white/40 mt-5 max-w-lg">
                      Strategik fikrlash, har bir yurish oqibatini tahlil
                      qilish, sabr-toqat va tizimli fikrlash qobiliyatini
                      rivojlantiruvchi mashg'ulot.
                    </p>

                    <div className="flex gap-2 mt-8">
                      <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50">
                        Strategiya
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50">
                        Tahlil
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[#d4af37] text-[10px] font-bold tracking-[0.25em] uppercase">
              04 — Aloqa
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mt-4">
              Bog'lanish
            </h2>

            <p className="text-sm sm:text-base text-white/40 leading-7 mt-5">
              Men bilan bog'lanish yoki ijtimoiy tarmoqlardagi profillarimni
              kuzatish uchun quyidagi havolalardan foydalanishingiz mumkin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mt-14">
            {SOCIAL_LINKS.map((social) => (
              <div
                key={social.id}
                className="group p-7 sm:p-9 rounded-3xl border border-white/10 bg-white/[0.025] hover:border-[#d4af37]/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                    <SocialIcon id={social.id} className="w-7 h-7" />
                  </div>

                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-white/10 text-white/40 hover:text-[#d4af37] hover:border-[#d4af37]/30 transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {social.name}
                </h3>

                <p className="text-[#d4af37] text-sm mt-1">
                  {social.handle}
                </p>

                <p className="text-sm text-white/40 mt-4 leading-6">
                  {social.description}
                </p>

                <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/10">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#d4af37] hover:text-[#e4c35a]"
                  >
                    Profilga o'tish
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => copySocial(social.url, social.id)}
                    className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white cursor-pointer"
                  >
                    {copiedSocial === social.id ? (
                      <>
                        <Check className="w-4 h-4 text-[#d4af37]" />
                        Nusxalandi
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Nusxa
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Crown className="w-4 h-4 text-[#d4af37]" />
                <span className="text-sm font-bold tracking-wider">
                  DONIYOR NASRIYEV
                </span>
              </div>

              <p className="text-xs text-white/25 mt-2">
                Iqtisod yo'nalishi talabasi
              </p>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="https://t.me/Doniyor_Nasriyev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#d4af37] transition-colors"
              >
                <TelegramIcon className="w-5 h-5" />
              </a>

              <a
                href="https://instagram.com/doniyor_nasriyev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#d4af37] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} Doniyor Nasriyev
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
