import React from 'react';

export interface Trend {
  id: string | number;
  image: string;
  accountName: string;
  description: string;
  views?: number;
  likes?: number;
  saves?: number;
  engagementRate?: number;
  postedAt?: string;
  category?: string;
  // запас на будущее
  [key: string]: any;
}

interface MasonryProps {
  trends: Trend[];
  onCardClick?: (trend: any) => void;
}

function formatViews(num?: number) {
  if (num == null) return '-';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toString();
}

const Masonry: React.FC<MasonryProps> = ({ trends, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {trends.map((trend) => (
        <article
          key={trend.id}
          onClick={() => onCardClick?.(trend)}
          className="group cursor-pointer overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-transform duration-150 hover:-translate-y-1"
        >
          {/* Верхняя часть: превью Reels */}
          <div className="relative w-full overflow-hidden">
            {/* Контейнер под соотношение 9:16 */}
            <div className="relative w-full pt-[177.78%]">
              <img
                src={trend.image}
                alt={trend.accountName}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Градиент и контент поверх */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 via-black/20 to-black/5 p-4">
                {/* Views + кнопка на hover */}
                <div className="flex items-start justify-between">
                  <div className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                    <span>▶</span>
                    <span>{formatViews(trend.views)}</span>
                  </div>

                  <button
                    className="pointer-events-auto inline-flex items-center rounded-full border border-white/70 bg-black/40 px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100"
                  >
                    Открыть пост
                  </button>
                </div>

                {/* Аккаунт + описание */}
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[11px] font-semibold text-gray-900">
                      {trend.accountName?.[0]?.toUpperCase() ?? 'A'}
                    </div>
                    <span className="text-sm font-semibold text-white drop-shadow">
                      {trend.accountName}
                    </span>
                  </div>
                  <p className="line-clamp-3 text-xs leading-snug text-white/90">
                    {trend.description}
                  </p>
                  <span className="text-[11px] font-medium text-white/80 underline">
                    Показать ещё
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Нижняя панель с метриками */}
          <div className="border-t border-gray-100 bg-[#F4F4F7] px-5 py-3 text-[11px] text-gray-700">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1">
                <span>👁️</span>
                <span>{trend.views?.toLocaleString('ru-RU') ?? '-'}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>{trend.likes?.toLocaleString('ru-RU') ?? '-'}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💾</span>
                <span>{trend.saves?.toLocaleString('ru-RU') ?? '-'}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>VR</span>
                <span>
                  {trend.engagementRate != null
                    ? `${trend.engagementRate}%`
                    : '-'}
                </span>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-gray-400">
              {trend.postedAt ?? ''}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Masonry;
