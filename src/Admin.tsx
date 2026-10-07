import React, { useEffect, useState } from 'react';
import { supabase } from './supabase';
import {
  BarChart3,
  LogOut,
  MessageSquare,
  Trash2,
  Users,
  Eye,
  RefreshCw,
} from 'lucide-react';

interface Question {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');

  const [totalVisits, setTotalVisits] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setLoggedIn(true);
      await loadData();
    }

    setLoading(false);
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoginLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Email yoki parol noto‘g‘ri.');
      setLoginLoading(false);
      return;
    }

    setLoggedIn(true);
    setPassword('');
    await loadData();

    setLoginLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();

    setLoggedIn(false);
    setQuestions([]);
    setTotalVisits(0);
    setTodayVisits(0);
    setTotalQuestions(0);
  };

  const loadData = async () => {
    setError('');

    const { count: visitsCount, error: visitsError } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true });

    if (visitsError) {
      setError('Statistikani yuklashda xatolik yuz berdi.');
      return;
    }

    setTotalVisits(visitsCount || 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count: todayCount } = await supabase
      .from('visits')
      .select('*', {
        count: 'exact',
        head: true,
      })
      .gte('created_at', today.toISOString());

    setTodayVisits(todayCount || 0);

    const { data: questionData, count: questionCount, error } =
      await supabase
        .from('questions')
        .select('id,name,message,created_at', {
          count: 'exact',
        })
        .order('created_at', { ascending: false });

    if (error) {
      setError('Savollarni yuklashda xatolik yuz berdi.');
      return;
    }

    setQuestions(questionData || []);
    setTotalQuestions(questionCount || 0);
  };

  const deleteQuestion = async (id: number) => {
    const confirmed = window.confirm(
      'Bu savolni o‘chirishni xohlaysizmi?'
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Savolni o‘chirishda xatolik yuz berdi.');
      return;
    }

    await loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b2c0b_0%,transparent_35%)]" />

        <form
          onSubmit={login}
          className="relative w-full max-w-md bg-[#111] border border-[#2b2b2b] rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-5">
              <BarChart3 className="w-8 h-8 text-[#d4af37]" />
            </div>

            <h1 className="text-3xl font-bold">
              Admin Panel
            </h1>

            <p className="text-gray-500 mt-2">
              Doniyor Nasriyev
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Admin email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Emailingiz"
                required
                className="w-full bg-[#080808] border border-[#333] rounded-xl px-4 py-3 outline-none focus:border-[#d4af37] transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Parol
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolingiz"
                required
                className="w-full bg-[#080808] border border-[#333] rounded-xl px-4 py-3 outline-none focus:border-[#d4af37] transition"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#d4af37] text-black font-bold rounded-xl py-3 hover:bg-[#e5c158] transition disabled:opacity-50"
            >
              {loginLoading ? 'Kirilmoqda...' : 'Admin panelga kirish'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <header className="border-b border-[#222] bg-[#0c0c0c]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Admin Panel
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Doniyor Nasriyev sayti boshqaruvi
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-3 rounded-xl border border-[#333] hover:border-[#d4af37] hover:text-[#d4af37] transition"
              title="Yangilash"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#333] hover:border-red-500 hover:text-red-400 transition"
            >
              <LogOut className="w-5 h-5" />
              Chiqish
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-8">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#d4af37]" />
              </div>

              <span className="text-xs text-gray-500">
                JAMI
              </span>
            </div>

            <p className="text-4xl font-bold">
              {totalVisits}
            </p>

            <p className="text-gray-500 mt-2">
              Tashriflar
            </p>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-400" />
              </div>

              <span className="text-xs text-gray-500">
                BUGUN
              </span>
            </div>

            <p className="text-4xl font-bold">
              {todayVisits}
            </p>

            <p className="text-gray-500 mt-2">
              Bugungi tashriflar
            </p>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>

              <span className="text-xs text-gray-500">
                JAMI
              </span>
            </div>

            <p className="text-4xl font-bold">
              {totalQuestions}
            </p>

            <p className="text-gray-500 mt-2">
              Kelgan savollar
            </p>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">
                Kelgan savollar
              </h2>

              <p className="text-gray-500 mt-1">
                Faqat admin ko‘ra oladi
              </p>
            </div>
          </div>

          {questions.length === 0 ? (
            <div className="bg-[#111] border border-[#222] rounded-2xl p-10 text-center">
              <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-4" />

              <p className="text-gray-400">
                Hozircha hech qanday savol kelmagan.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="bg-[#111] border border-[#222] rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                          <span className="text-[#d4af37] font-bold">
                            {question.name
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {question.name}
                          </h3>

                          <p className="text-xs text-gray-500">
                            {new Date(
                              question.created_at
                            ).toLocaleString('uz-UZ')}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-7 whitespace-pre-wrap">
                        {question.message}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        deleteQuestion(question.id)
                      }
                      className="p-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
                      title="O‘chirish"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
