'use client';

import Image from 'next/image';

export default function Masonry({
  trends,
  onCardClick,
}: {
  trends: any[];
  onCardClick: (t: any) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {trends.map((trend) => (
        <div
          key={trend.id}
          onClick={() => onCardClick(trend)}
          className="
            group cursor-pointer overflow-hidden rounded-3xl bg-white shadow 
            transition-all duration-300 hover:shadow-xl
          "
        >
          {/* --- IMAGE / VIDEO PREVIEW --- */}
          <div className="relative w-full overflow-hidden rounded-t-3xl">
            <div className="relative aspect-[9/16] w-full">
              <Image
                src={trend.image}
                alt={trend.accountName}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

            {/* --- ВЕРХНИЙ PLAY / METRICS BADGE --- */}
            <div className="
              absolute left-3 top-3 flex items-center gap-2 
              rounded-full bg-black/60 px-3 py-1.5 text-white backdrop-blur 
              text-xs font-medium
            ">
              ▶ {trend.views ? trend.views.toLocaleString('ru-RU') : '—'}
            </div>

            {/* --- ОТКРЫТЬ ПОСТ (hover) --- */}
            <div
              className="
                absolute right-3 top-3 hidden 
                rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold 
                text-gray-800 shadow backdrop-blur 
                transition-all group-hover:flex
              "
            >
              Открыть пост
            </div>
          </div>

          {/* --- TEXT BLOCK --- */}
          <div className="flex flex-col gap-2 p-4">
            {/* Аккаунт */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src={trend.avatar ?? '/avatar-placeholder.png'}
                  alt={trend.accountName}
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {trend.accountName}
              </span>
            </div>

            {/* Описание */}
            <p className="line-clamp-3 text-sm text-gray-600">
              {trend.description}
            </p>

            {/* Показать ещё */}
            <button className="mt-1 w-fit text-xs text-gray-500 hover:text-gray-700">
              Показать еще
            </button>

            {/* МЕТРИКИ */}
            <div className="
              mt-2 flex items-center justify-between rounded-2xl bg-[#F5F5F7] px-4 py-3 
              text-[11px] text-gray-700
            ">
              <div className="flex items-center gap-1">
                👁️ {trend.views?.toLocaleString('ru-RU') ?? '-'}
              </div>
              <div className="flex items-center gap-1">
                ❤️ {trend.likes?.toLocaleString('ru-RU') ?? '-'}
              </div>
              <div className="flex items-center gap-1">
                💾 {trend.saves?.toLocaleString('ru-RU') ?? '-'}
              </div>
              <div className="flex items-center gap-1">
                VR {trend.engagementRate ? `${trend.engagementRate}%` : '-'}
              </div>
            </div>

            {/* Дата */}
            <div className="mt-1 text-xs text-gray-400">
              {trend.postedAt}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
