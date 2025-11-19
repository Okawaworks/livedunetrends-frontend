'use client';

import Image from 'next/image';
import Masonry from '@/components/Masonry';
import {
  mockTrends,
  trendCategories,
  type TrendCategory,
} from '@/data/mockTrends';
import { useEffect, useState } from 'react';

const LOGO_SRC = '/livedune-logo.png';

type UserProfile = {
  id: string;
  first_name: string;
  photo_url: string;
  phone_number?: string;
  subscription?: string;
};

type Period = 'today' | 'week' | 'month' | 'year';

const periodOptions: { value: Period; label: string }[] = [
  { value: 'today', label: 'Сегодня' },
  { value: 'week', label: 'Эта неделя' },
  { value: 'month', label: 'Этот месяц' },
  { value: 'year', label: 'Этот год' },
];

export default function TrendsPage() {
  const [activeCategory, setActiveCategory] =
    useState<TrendCategory>('Все категории');
  const [search, setSearch] = useState('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [period, setPeriod] = useState<Period>('week');
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedTrend, setSelectedTrend] = useState<any | null>(null);

  const [showAuthModal, setShowAuthModal] = useState(true);

  function handleTelegramAuth() {
    setProfile({
      id: '12345',
      first_name: 'Алексей',
      photo_url: '/avatar-placeholder.png',
      phone_number: '+7 999 123-45-67',
      subscription: 'Активна',
    });
    setShowAuthModal(false);
  }

  const filteredTrends = mockTrends.filter((item) => {
    const byCategory =
      activeCategory === 'Все категории' || item.category === activeCategory;

    const q = search.trim().toLowerCase();
    const bySearch =
      !q ||
      item.accountName.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);

    return byCategory && bySearch;
  });

  const visibleTrends = filteredTrends.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, search, period]);

  useEffect(() => {
    if (profile) setShowAuthModal(false);
  }, [profile]);

  const currentPeriodLabel =
    periodOptions.find((opt) => opt.value === period)?.label ?? '';

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:gap-4">
          {/* Лого + период + аватар */}
          <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-start md:gap-4">
            <Image
              src={LOGO_SRC}
              alt="ТРЕНДЫ.РФ"
              width={180}
              height={48}
              className="h-[22px] w-auto md:h-[32px]"
              priority
            />

            <div className="ml-auto flex items-center gap-3 md:ml-0">
              {/* Период */}
              <div className="relative">
                <button
                  onClick={() => setIsPeriodOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full bg-[#F5F5F7] px-4 py-2 text-xs md:text-sm font-medium hover:bg-[#ECEDEF] transition"
                >
                  {currentPeriodLabel}
                  <span className="text-xs text-gray-500">▾</span>
                </button>

                {isPeriodOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-44 rounded-2xl border border-gray-200 bg-white py-2 shadow-xl">
                    {periodOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setPeriod(opt.value);
                          setIsPeriodOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-2 text-sm ${
                          opt.value === period
                            ? 'bg-[#F5F6F7] text-gray-900'
                            : 'text-gray-800 hover:bg-[#F5F6F7]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {opt.value === period && (
                          <span className="text-xs text-gray-600">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Аватар */}
              {profile && (
                <div className="relative group">
                  <button className="flex items-center">
                    <Image
                      src={profile.photo_url}
                      alt={profile.first_name}
                      width={32}
                      height={32}
                      className="rounded-full bg-gray-100"
                    />
                  </button>

                  <div className="pointer-events-none absolute right-0 z-40 mt-2 w-56 rounded-xl bg-white p-4 shadow-lg opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="mb-2 flex items-center gap-2">
                      <Image
                        src={profile.photo_url}
                        alt={profile.first_name}
                        width={38}
                        height={38}
                        className="rounded-full bg-gray-100"
                      />
                      <div>
                        <div className="text-sm font-semibold">
                          {profile.first_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {profile.phone_number ?? 'Телефон не указан'}
                        </div>
                      </div>
                    </div>

                    <div className="mb-2 text-sm">
                      <span className="font-semibold">Подписка:</span>{' '}
                      {profile.subscription ?? 'Нет подписки'}
                    </div>

                    <button className="w-full py-2 text-left text-sm text-[#FF1753] hover:underline">
                      Выйти
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Поиск */}
          <div className="flex w-full md:flex-1 items-center">
            <div className="flex h-12 w-full items-center rounded-full bg-[#F5F6F7] px-5">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="поиск по топ reels"
                className="w-full border-none bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Категории */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 overflow-x-auto">
          <span className="min-w-fit text-sm font-medium text-gray-500">
            Категории:
          </span>

          <div className="flex gap-2">
            {trendCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-[#F5F5F7] text-gray-900 hover:bg-[#FF1753] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Контент */}
      <main className="mx-auto max-w-7xl px-4 pt-6 pb-10">
        <Masonry
          trends={visibleTrends}
          onCardClick={(trend) => setSelectedTrend(trend)}
        />

        {visibleCount < filteredTrends.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + 12)}
              className="rounded-full border border-gray-200 px-6 py-2 text-sm font-medium text-gray-800 hover:bg-[#F5F5F7]"
            >
              Загрузить ещё
            </button>
          </div>
        )}
      </main>

      {/* 🔹 МОДАЛКА КАРТОЧКИ — ВЕРТИКАЛЬНЫЙ REELS */}
      {selectedTrend && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setSelectedTrend(null)}
        >
          <div
            className="flex w-full max-w-4xl flex-col md:flex-row rounded-[32px] overflow-hidden bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Левая колонка: вертикальный рилс 9:16 */}
            <div className="flex justify-center bg-black md:items-stretch md:w-auto w-full">
              <div className="relative w-[260px] md:w-[320px] max-w-full pt-[177%]">
                <img
                  src={selectedTrend.image}
                  alt={selectedTrend.accountName}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Правая колонка: текст + метрики, скролл при длинном описании */}
            <div className="flex flex-1 flex-col gap-5 p-6 overflow-y-auto max-h-[80vh]">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedTrend.accountName}
                  </div>
                  <div className="text-sm text-gray-400">
                    {selectedTrend.postedAt ?? ''}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTrend(null)}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200"
                >
                  Закрыть
                </button>
              </div>

              {/* Текст поста */}
              <p className="text-sm md:text-base leading-relaxed text-gray-800 whitespace-pre-line">
                {selectedTrend.description}
              </p>

              {/* Метрики */}
              <div className="mt-1 flex flex-wrap items-center gap-4 rounded-2xl bg-[#F5F5F7] px-5 py-4 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <span>👁️</span>
                  <span>{selectedTrend.views?.toLocaleString('ru-RU') ?? '-'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>❤️</span>
                  <span>{selectedTrend.likes?.toLocaleString('ru-RU') ?? '-'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>💾</span>
                  <span>{selectedTrend.saves?.toLocaleString('ru-RU') ?? '-'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>VR</span>
                  <span>
                    {selectedTrend.engagementRate != null
                      ? `${selectedTrend.engagementRate}%`
                      : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Телеграм-модалка */}
      {!profile && showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div
            className="w-full max-w-sm sm:max-w-md rounded-[40px] bg-white px-6 sm:px-8 py-10 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-[#E5F2FF]">
              <Image
                src="/telegram-icon.png"
                alt="Telegram"
                width={112}
                height={112}
                className="h-28 w-28"
              />
            </div>

            <h2 className="mb-3 text-xl sm:text-2xl font-semibold text-gray-900">
              Вход через Telegram
            </h2>

            <p className="mb-10 text-sm sm:text-base leading-relaxed text-gray-500">
              Мы используем Telegram только для авторизации.
              Никакого спама — только доступ к рейтингу
              Топ-трендов рилс в 10 категориях.
            </p>

            <button
              onClick={handleTelegramAuth}
              className="w-full rounded-full bg-[#FF1753] py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#FF1753]/40 transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              Войти через Telegram
            </button>
          </div>
        </div>
      )}
    </div>
  );
}