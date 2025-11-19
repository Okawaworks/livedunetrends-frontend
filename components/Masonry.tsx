'use client';

type MasonryProps = {
  trends: any[];
  onCardClick: (trend: any) => void;
};

export default function Masonry({ trends, onCardClick }: MasonryProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {trends.map((trend) => (
        <div
          key={trend.id}
          onClick={() => onCardClick(trend)}
          className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow transition-all duration-300 hover:shadow-xl"
        >
          {/* PREVIEW */}
          <div className="relative w-full overflow-hidden rounded-t-3xl">
            <div className="relative aspect-[9/16] w-full">
              <img
                src={trend.image} // тут важно: в mockTrends должно быть поле image
                alt={trend.accountName}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

            {/* PLAY + VIEWS */}
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              ▶ {trend.views ? trend.views.toLocaleString('ru-RU') : '—'}
            </div>

            {/* OPEN POST on HOVER */}
            <div className="absolute right-3 top-3 hidden rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-gray-800 shadow backdrop-blur transition-all group-hover:flex">
              Открыть пост
            </div>
          </div>

          {/* TEXT + METRICS */}
          <div className="flex flex-col gap-2 p-4">
            {/* Аккаунт */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-200">
                <img
                  src={trend.avatar ?? '/avatar-placeholder.png'}
                  alt={trend.accountName}
                  className="h-full w-full object-cover"
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

            <button className="mt-1 w-fit text-xs text-gray-500 hover:text-gray-700">
              Показать еще
            </button>

            {/* Метрики */}
            <div className="mt-2 flex items-center justify-between rounded-2xl bg-[#F5F5F7] px-4 py-3 text-[11px] text-gray-700">
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

            <div className="mt-1 text-xs text-gray-400">{trend.postedAt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}