import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Camera,
  Check,
  Copy,
  Crown,
  Instagram,
  Menu,
  MessageSquare,
  Send,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';

import BackgroundFX from './BackgroundFX';
import { supabase } from './supabase';

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
      <path d="M21.7 4.3c.3-1.1-.8-1.6-1.7-1.2L3.1 10.2c-1.2.5-1.2 1.2-.2 1.5l4.3 1.3 1.6 5.1c.2.7.1 1 .8 1 .5 0 .7-.2 1-.5l2.1-2 4.4 3.2c.8.5 1.4.2 1.6-.8L21.7 4.3zM8 12.6l9.9-6.2c.5-.3.9-.1.5.2l-8.1 7.3-.3 2.6-1.1 2.6-.3-3.9-1.1-.3.2-.1z" />
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

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sendingQuestion, setSendingQuestion] = useState(false);
  const [questionSent, setQuestionSent] = useState(false);
  const [questionError, setQuestionError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  /*
   * TASHRIFNI HISOBLASH
   * Bir brauzer sessiyasida qayta-qayta refresh qilinsa,
   * har safar yangi tashrif hisoblanmaydi.
   */
  useEffect(() => {
    const visitKey = 'doniyor_site_visit';

    try {
      const alreadyVisited = sessionStorage.getItem(visitKey);

      if (alreadyVisited) return;

      sessionStorage.setItem(visitKey, 'true');

      supabase.from('visits').insert({}).then(() => {
        // visit saved
      });
    } catch {
      supabase.from('visits').insert({}).then(() => {
        // visit saved
      });
    }
  }, []);

  /*
   * /admin MANZILIGA KIRILGANDA ADMIN PANELNI OCHISH
   */
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      window.location.replace('/admin');
    }
  }, []);

  const copyPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // ignore
    }

    setCopiedLink(true);

    setTimeout(() => {
      setCopiedLink(false);
    }, 2200);
  };

  const copySocial = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }

    setCopiedSocial(id);

    setTimeout(() => {
      setCopiedSocial(null);
    }, 2200);
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

  const sendQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    setQuestionError('');
    setQuestionSent(false);

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanMessage) {
      setQuestionError('Iltimos, ism va savolni kiriting.');
      return;
    }

    if (cleanName.length > 100) {
      setQuestionError('Ism 100 ta belgidan oshmasligi kerak.');
      return;
    }

    if (cleanMessage.length > 2000) {
      setQuestionError('Savol 2000 ta belgidan oshmasligi kerak.');
      return;
    }

    setSendingQuestion(true);

    const { error } = await supabase.from('questions').insert({
      name: cleanName,
      message: cleanMessage,
    });

    if (error) {
      setQuestionError(
        'Savol yuborilmadi. Iltimos, birozdan keyin qayta urinib ko‘ring.'
      );

      setSendingQuestion(false);
      return;
    }

    setName('');
    setMessage('');
    setQuestionSent(true);
    setSendingQuestion(false);

    setTimeout(() => {
      setQuestionSent(false);
    }, 4000);
  };

  const interests = [
    {
      id: 'football',
      title: 'Football',
      icon: Trophy,
      text: 'Sport, jamoaviy ruh va raqobat menga yoqadi.',
    },
    {
      id: 'chess',
      title: 'Chess',
      icon: Crown,
      text: 'Strategik fikrlash va oldindan reja tuzish.',
    },
  ];

  const filteredInterests =
    activeInterest === 'all'
      ? interests
      : interests.filter((item) => item.id === activeInterest);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden">
      <BackgroundFX />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#080808]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5">
          <div className="h-20 flex items-center justify-between">
            <a
              href="#home"
              className="font-bold text-xl tracking-wider"
            >
              DN<span className="text-[#d4af37]">.</span>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a
                href="#home"
                className="text-gray-300 hover:text-[#d4af37] transition"
              >
                Bosh sahifa
              </a>

              <a
                href="#about"
                className="text-gray-300 hover:text-[#d4af37] transition"
              >
                Men haqimda
              </a>

              <a
                href="#achievements"
                className="text-gray-300 hover:text-[#d4af37] transition"
              >
                Yutuqlar
              </a>

              <a
                href="#interests"
                className="text-gray-300 hover:text-[#d4af37] transition"
              >
                Qiziqishlar
              </a>

              <a
                href="#contact"
                className="text-gray-300 hover:text-[#d4af37] transition"
              >
                Aloqa
              </a>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-5 space-y-3">
              {[
                ['#home', 'Bosh sahifa'],
                ['#about', 'Men haqimda'],
                ['#achievements', 'Yutuqlar'],
                ['#interests', 'Qiziqishlar'],
                ['#contact', 'Aloqa'],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-300 hover:text-[#d4af37]"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20"
      >
        <div className="max-w-7xl mx-auto px-5 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#d4af37]/30 bg-[#d4af37]/5 rounded-full px-4 py-2 mb-7">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />

                <span className="text-sm text-[#d4af37]">
                  Personal Portfolio
                </span>
              </div>

              <p className="text-gray-500 uppercase tracking-[0.3em] text-sm mb-4">
                Salom, men
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                NASRIYEV
                <span className="block text-[#d4af37]">
                  DONIYOR
                </span>
              </h1>

              <p className="text-gray-400 text-lg max-w-xl mt-7 leading-8">
                Maqsad sari intiluvchi, yangi bilim va imkoniyatlarni
                izlashdan to‘xtamaydigan inson.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 bg-[#d4af37] text-black font-bold px-6 py-3.5 rounded-xl hover:bg-[#e5c158] transition"
                >
                  Men haqimda
                  <ArrowUpRight className="w-5 h-5" />
                </a>

                <button
                  onClick={copyPageUrl}
                  className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-6 py-3.5 rounded-xl hover:border-[#d4af37]/50 transition"
                >
                  {copiedLink ? (
                    <Check className="w-5 h-5 text-[#d4af37]" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}

                  {copiedLink ? 'Nusxalandi' : 'Saytni ulashish'}
                </button>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute w-80 h-80 rounded-full bg-[#d4af37]/10 blur-3xl" />

              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-[2rem] border border-[#d4af37]/30 p-2 bg-[#111]">
                <img
                  src={photoSrc}
                  alt="Doniyor Nasriyev"
                  className="w-full h-full object-cover rounded-[1.6rem]"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-5 right-5 w-12 h-12 rounded-xl bg-black/80 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition"
                  title="Rasmni almashtirish"
                >
                  <Camera className="w-5 h-5" />
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
        className="py-24 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="max-w-3xl">
            <p className="text-[#d4af37] uppercase tracking-[0.25em] text-sm mb-4">
              Men haqimda
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold mb-7">
              O‘zim haqimda
            </h2>

            <p className="text-gray-400 text-lg leading-8">
              Men Nasriyev Doniyor. O‘z ustimda ishlash, yangi
              bilimlarni o‘rganish va kelajak uchun katta maqsadlar
              sari harakat qilishni yaxshi ko‘raman.
            </p>

            <p className="text-gray-500 text-lg leading-8 mt-5">
              Har bir yangi tajribani rivojlanish uchun imkoniyat
              deb bilaman.
            </p>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section
        id="achievements"
        className="py-24 border-t border-white/5 bg-[#0b0b0b]"
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-12">
            <p className="text-[#d4af37] uppercase tracking-[0.25em] text-sm mb-4">
              Natijalar
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold">
              Yutuqlar
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Trophy,
                title: 'Maqsadlar',
                text: 'Katta maqsadlar qo‘yib, ularga bosqichma-bosqich erishish.',
              },
              {
                icon: Award,
                title: 'Rivojlanish',
                text: 'Har kuni yangi bilim va tajriba olishga intilish.',
              },
              {
                icon: Sparkles,
                title: 'Kelajak',
                text: 'Yangi imkoniyatlar va kuchli loyihalar sari harakat.',
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-[#111] border border-white/5 rounded-2xl p-7 hover:border-[#d4af37]/30 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#d4af37]" />
                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 leading-7">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section
        id="interests"
        className="py-24 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-10">
            <p className="text-[#d4af37] uppercase tracking-[0.25em] text-sm mb-4">
              Menga yoqadi
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold">
              Qiziqishlar
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              ['all', 'Barchasi'],
              ['football', 'Football'],
              ['chess', 'Chess'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() =>
                  setActiveInterest(
                    id as 'all' | 'football' | 'chess'
                  )
                }
                className={`px-5 py-2.5 rounded-xl border transition ${
                  activeInterest === id
                    ? 'bg-[#d4af37] text-black border-[#d4af37]'
                    : 'border-white/10 text-gray-400 hover:border-[#d4af37]/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filteredInterests.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="bg-[#111] border border-white/5 rounded-2xl p-7"
                >
                  <Icon className="w-8 h-8 text-[#d4af37] mb-5" />

                  <h3 className="text-2xl font-bold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 leading-7">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUESTION */}
      <section
        id="question"
        className="py-24 border-t border-white/5 bg-[#0b0b0b]"
      >
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-5">
              <MessageSquare className="w-7 h-7 text-[#d4af37]" />
            </div>

            <p className="text-[#d4af37] uppercase tracking-[0.25em] text-sm mb-3">
              Savolingiz bormi?
            </p>

            <h2 className="text-4xl font-bold">
              Menga savol yuboring
            </h2>

            <p className="text-gray-500 mt-4">
              Savolingizni yuboring. U faqat admin panelda
              ko‘rinadi.
            </p>
          </div>

          <form
            onSubmit={sendQuestion}
            className="bg-[#111] border border-white/5 rounded-3xl p-6 sm:p-8"
          >
            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">
                Ismingiz
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingizni yozing"
                maxLength={100}
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-[#d4af37] transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">
                Savolingiz
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Savolingizni yozing..."
                maxLength={2000}
                rows={6}
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-[#d4af37] transition resize-none"
              />
            </div>

            {questionError && (
              <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
                {questionError}
              </div>
            )}

            {questionSent && (
              <div className="mb-5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
                <Check className="w-5 h-5" />
                Savolingiz muvaffaqiyatli yuborildi!
              </div>
            )}

            <button
              type="submit"
              disabled={sendingQuestion}
              className="w-full bg-[#d4af37] text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5c158] transition disabled:opacity-50"
            >
              <Send className="w-5 h-5" />

              {sendingQuestion
                ? 'Yuborilmoqda...'
                : 'Savolni yuborish'}
            </button>
          </form>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-12">
            <p className="text-[#d4af37] uppercase tracking-[0.25em] text-sm mb-4">
              Aloqa
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold">
              Men bilan bog‘laning
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {SOCIAL_LINKS.map((social) => (
              <div
                key={social.id}
                className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#d4af37]/30 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                      <SocialIcon
                        id={social.id}
                        className="w-6 h-6"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        {social.name}
                      </h3>

                      <p className="text-[#d4af37] text-sm">
                        {social.handle}
                      </p>
                    </div>
                  </a>

                  <button
                    onClick={() =>
                      copySocial(social.url, social.id)
                    }
                    className="p-3 rounded-xl border border-white/10 hover:border-[#d4af37]/40 transition"
                  >
                    {copiedSocial === social.id ? (
                      <Check className="w-5 h-5 text-[#d4af37]" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-gray-500 mt-5">
                  {social.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Nasriyev Doniyor
          </p>

          <p className="text-gray-700 text-xs">
            Personal Portfolio
          </p>
        </div>
      </footer>
    </div>
  );
}
