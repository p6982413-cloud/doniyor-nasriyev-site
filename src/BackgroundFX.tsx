import { useEffect, useState } from 'react';

export default function BackgroundFX() {
  const [flight, setFlight] = useState(1);
  const [top, setTop] = useState(18);
  const [size, setSize] = useState(240);

  // Har 5 soniyada yangi samolyot: tasodifiy balandlik va o'lcham
  useEffect(() => {
    const id = setInterval(() => {
      setFlight((f) => f + 1);
      setTop(8 + Math.random() * 50); // ekran balandligining 8%-58% oralig'i
      setSize(160 + Math.random() * 160); // 160-320 px
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes fx-fly {
          from { transform: translateX(-350px); }
          to   { transform: translateX(calc(100vw + 350px)); }
        }
        @keyframes fx-cloud {
          from { transform: translateX(-30vw); }
          to   { transform: translateX(130vw); }
        }
        @keyframes fx-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-30px) scale(1.06); }
        }
        @keyframes fx-trail {
          from { opacity: 0.5; }
          to   { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fx-anim { animation: none !important; }
        }
      `}</style>

      {/* Suzuvchi yumshoq dog'lar */}
      <div
        className="fx-anim absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-300/20 blur-3xl"
        style={{ animation: 'fx-float 9s ease-in-out infinite' }}
      />
      <div
        className="fx-anim absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-indigo-300/20 blur-3xl"
        style={{ animation: 'fx-float 12s ease-in-out infinite 2s' }}
      />

      {/* Sekin suzuvchi bulutlar */}
      {[
        { t: '12%', w: 220, d: 70, delay: 0 },
        { t: '40%', w: 300, d: 95, delay: -30 },
        { t: '70%', w: 180, d: 80, delay: -55 },
      ].map((c, i) => (
        <div
          key={i}
          className="fx-anim absolute left-0 rounded-full bg-white/70 blur-xl"
          style={{
            top: c.t,
            width: c.w,
            height: c.w / 3,
            animation: `fx-cloud ${c.d}s linear infinite`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      {/* Samolyot (har 5 soniyada qayta uchadi) */}
      <div
        key={flight}
        className="fx-anim absolute left-0"
        style={{
          top: `${top}%`,
          width: size,
          animation: 'fx-fly 4.5s linear forwards',
        }}
      >
        {/* Iz (contrail) */}
        <div
          className="absolute right-full top-1/2 h-[3px] w-[60%] -translate-y-1/2 rounded-full bg-gradient-to-l from-slate-400/50 to-transparent"
          style={{ animation: 'fx-trail 4.5s linear forwards' }}
        />
        <svg viewBox="0 0 200 60" className="w-full h-auto text-slate-400/60" fill="currentColor">
          {/* Fyuzelyaj */}
          <ellipse cx="100" cy="32" rx="88" ry="9" />
          {/* Burun */}
          <path d="M184 32 q14 0 14 0 q-6 -7 -14 -9 z" />
          {/* Qanot */}
          <path d="M92 30 L58 2 L78 2 L118 30 Z" />
          <path d="M92 34 L58 62 L78 62 L118 34 Z" opacity="0.8" />
          {/* Dum */}
          <path d="M22 28 L6 8 L20 8 L38 28 Z" />
        </svg>
      </div>
    </div>
  );
}
