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

  // показывать ли модалку авторизации
  const [showAuthModal, setShowAuthModal] = useState(true);

  function handleTelegramAuth() {
    // здесь потом будет реальная авторизация через Telegram
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

    const query = search.trim().toLowerCase();
    const bySearch =
      !query ||
      item.accountName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    return byCategory && bySearch;
  });

  const visibleTrends = filteredTrends.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, search, period]);

  // если вдруг профиль появился (будущая реальная авторизация) — прячем модалку
  useEffect(() => {
    if (profile) {
      setShowAuthModal(false);
    }
  }, [profile]);

  const currentPeriodLabel =
    periodOptions.find((opt) => opt.value === period)?.label ?? '';

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:gap-4">
          {/* Верхняя строка: логотип + правый угол */}
          <div className="flex items-center justify-between gap-3">
            {/* Логотип */}
            <div className="flex items-center">
              <Image
                src={LOGO_SRC}
                alt="LIVEDUNE"
                width={110}
                height={30}
                className="h-[22px] w-auto"
                priority
              />
            </div>

            {/* Правый угол: период + аватар (без имени) */}
            <div className="flex items-center gap-3">
              {/* Дропдаун периода */}
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
                          period === opt.value
                            ? 'bg-[#F5F6F7] text-gray-900'
                            : 'text-gray-800 hover:bg-[#F5F6F7]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {period === opt.value && (
                          <span className="text-xs text-gray-600">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Аватар без имени после входа */}
              {profile && (
                <div className="group relative">
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
                    <button className="mt-2 w-full py-2 text-left text-sm font-medium text-[#FF1753] hover:underline">
                      Выйти
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Вторая строка: поиск (на мобилке под логотипом, на десктопе растягивается) */}
          <div className="flex flex-1 items-center">
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

      {/* КАТЕГОРИИ */}
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
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
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

      {/* КОНТЕНТ */}
      <main className="mx-auto max-w-7xl px-4 pt-6 pb-10">
        <Masonry
          trends={visibleTrends}
          onCardClick={(trend) => setSelectedTrend(trend)}
        />

        {visibleCount < filteredTrends.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + 12)}
              className="rounded-full border border-gray-200 px-6 py-2 text-sm font-medium text-gray-800 hover:bg-[#F5F5F7] transition"
            >
              Загрузить ещё
            </button>
          </div>
        )}
      </main>

      {/* MODAL / POPOVER с деталями тренда */}
      {selectedTrend && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setSelectedTrend(null)}
        >
          <div
            className="flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* слева — картинка (потом будет видео) */}
            <div className="relative w-full bg-black md:w-1/2">
              <div className="relative w-full pt-[177.78%] md:h-full md:pt-0">
                <img
                  src={selectedTrend.image}
                  alt={selectedTrend.accountName}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            {/* справа — текст и метрики */}
            <div className="flex w-full flex-col gap-4 p-6 md:w-1/2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="mb-1 text-sm font-semibold text-gray-900">
                    {selectedTrend.accountName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {selectedTrend.postedAt ?? ''}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTrend(null)}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200"
                >
                  Закрыть
                </button>
              </div>

              <div className="text-sm leading-relaxed text-gray-800">
                {selectedTrend.description}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-4 rounded-2xl bg-[#F5F5F7] px-4 py-3 text-xs text-gray-700">
                <div className="flex items-center gap-1">
                  <span>👁️</span>
                  <span>
                    {selectedTrend.views?.toLocaleString('ru-RU') ?? '-'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>❤️</span>
                  <span>
                    {selectedTrend.likes?.toLocaleString('ru-RU') ?? '-'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>💾</span>
                  <span>
                    {selectedTrend.saves?.toLocaleString('ru-RU') ?? '-'}
                  </span>
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

              <div className="mt-auto text-xs text-gray-400">
                ID поста: {selectedTrend.id}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL АВТОРИЗАЦИИ ЧЕРЕЗ TELEGRAM */}
      {!profile && showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#F5F5F7]">
                <Image
                  src={LOGO_SRC}
                  alt="LIVEDUNE"
                  width={80}
                  height={22}
                  className="h-[18px] w-auto"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  Вход через Telegram
                </div>
                <div className="text-xs text-gray-500">
                  Чтобы сохранить ваши фильтры и тренды, войдите в аккаунт.
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Мы используем Telegram только для авторизации. Никаких лишних
                сообщений и спама — только доступ к вашим подборкам и истории.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowAuthModal(false)}
                className="order-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#F5F5F7] transition sm:order-1"
              >
                Продолжить без входа
              </button>
              <button
                onClick={handleTelegramAuth}
                className="order-1 rounded-full bg-[#FF1753] px-4 py-2 text-sm font-semibold text-white shadow hover:scale-[1.03] transition sm:order-2"
              >
                Войти через Telegram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}