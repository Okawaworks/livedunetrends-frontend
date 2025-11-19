export type TrendCategory =
  | "Все категории"
  | "Банки"
  | "Красота и косметика"
  | "Культура и искусство"
  | "Одежда и стиль"
  | "Рестораны и кафе"
  | "Ритейл"
  | "Спорт и отдых";

export const trendCategories: TrendCategory[] = [
  "Все категории",
  "Банки",
  "Красота и косметика",
  "Культура и искусство",
  "Одежда и стиль",
  "Рестораны и кафе",
  "Ритейл",
  "Спорт и отдых",
];

export const mockTrends = [
  {
    id: 1,
    accountName: "art_moscow",
    description:
      "Новая выставка современного искусства в Музее Архитектуры. Представлены VR-инсталляции, цифровые работы и интерактивные объекты. Выставка погружает зрителя в новый опыт взаимодействия.",
    views: 8300,
    likes: 203,
    saves: 35,
    engagementRate: 5.3,
    postedAt: "6 дней назад",
    image: "/reels1.jpg",
    category: "Культура и искусство",
  },
  {
    id: 2,
    accountName: "beauty_trends",
    description:
      "Топовые бьюти лайфхаки недели. Подборка трендов макияжа, ухода и эффектов вроде ‘glass skin’.",
    views: 15000,
    likes: 650,
    saves: 98,
    engagementRate: 6.2,
    postedAt: "4 дня назад",
    image: "/reels5.jpg",
    category: "Красота и косметика",
  },
  {
    id: 3,
    accountName: "bank_x",
    description:
      "Банк предложил онлайн-сервис для малого бизнеса. Быстрое одобрение и простой процесс оформления.",
    views: 12000,
    likes: 320,
    saves: 50,
    engagementRate: 4.5,
    postedAt: "2 дня назад",
    image: "/reels3.jpg",
    category: "Банки",
  },
  {
    id: 4,
    accountName: "travel_sky",
    description:
      "Путешествие по Амальфитанскому побережью. Короткий гид по маршрутам, пляжам и местам, которые обязательно стоит посетить.",
    views: 22000,
    likes: 1800,
    saves: 240,
    engagementRate: 7.8,
    postedAt: "1 день назад",
    image: "/reels5.jpg",
    category: "Спорт и отдых",
  },
  {
    id: 5,
    accountName: "fashion_daily",
    description:
      "Обзор осенних луков. Как сочетать базовые вещи и добавлять яркие акценты, чтобы выглядеть современно.",
    views: 10300,
    likes: 780,
    saves: 115,
    engagementRate: 6.1,
    postedAt: "3 дня назад",
    image: "/reels4.jpg",
    category: "Одежда и стиль",
  },
  {
    id: 6,
    accountName: "cafe_morning",
    description:
      "Лучшие кофейни Москвы для удалённой работы. Рекомендации по атмосфере, Wi-Fi и десертам.",
    views: 8100,
    likes: 240,
    saves: 32,
    engagementRate: 3.9,
    postedAt: "7 дней назад",
    image: "/reels3.jpg",
    category: "Рестораны и кафе",
  },
  {
    id: 7,
    accountName: "retail_now",
    description:
      "Новые тренды в мерчандайзинге и выкладке товаров. Как визуальная коммуникация влияет на продажи.",
    views: 6400,
    likes: 130,
    saves: 20,
    engagementRate: 2.8,
    postedAt: "5 дней назад",
    image: "/reels1.jpg",
    category: "Ритейл",
  },
  {
    id: 8,
    accountName: "sport_lab",
    description:
      "Разбор техники бега для новичков. Как избежать травм и повысить выносливость.",
    views: 5400,
    likes: 300,
    saves: 80,
    engagementRate: 4.9,
    postedAt: "8 часов назад",
    image: "/reels2.jpg",
    category: "Спорт и отдых",
  },
  {
    id: 9,
    accountName: "gallery_room",
    description:
      "Мини-экскурсия по новой галерее. Художники, композиции, цветовые решения — коротко и вдохновляюще.",
    views: 9700,
    likes: 420,
    saves: 65,
    engagementRate: 5.0,
    postedAt: "6 часов назад",
    image: "/reels4.jpg",
    category: "Культура и искусство",
  },
  {
    id: 10,
    accountName: "makeup_today",
    description:
      "Лёгкий макияж для офиса: быстрые шаги и бюджетные продукты.",
    views: 14200,
    likes: 530,
    saves: 120,
    engagementRate: 5.5,
    postedAt: "1 день назад",
    image: "/reels2.jpg",
    category: "Красота и косметика",
  },
  {
    id: 11,
    accountName: "fitness_now",
    description:
      "5 упражнений, которые стоит делать каждый день. Тренировка для дома.",
    views: 20000,
    likes: 1500,
    saves: 210,
    engagementRate: 8.1,
    postedAt: "2 дня назад",
    image: "/reels1.jpg",
    category: "Спорт и отдых",
  },
  {
    id: 12,
    accountName: "local_cafe",
    description:
      "Авторский десерт недели. Шоколадный торт с солёной карамелью и апельсином.",
    views: 3900,
    likes: 160,
    saves: 18,
    engagementRate: 4.2,
    postedAt: "11 часов назад",
    image: "/reels3.jpg",
    category: "Рестораны и кафе",
  },
  {
    id: 13,
    accountName: "brand_style",
    description:
      "Как собрать базовый осенний гардероб: 7 вещей, которые подходят всем.",
    views: 7600,
    likes: 420,
    saves: 70,
    engagementRate: 4.9,
    postedAt: "3 часа назад",
    image: "/reels2.jpg",
    category: "Одежда и стиль",
  },
  {
    id: 14,
    accountName: "city_art",
    description:
      "Уличные художники украсили стену в центре города. Мурал посвящён теме экологии.",
    views: 6800,
    likes: 250,
    saves: 40,
    engagementRate: 3.8,
    postedAt: "12 часов назад",
    image: "/reels1.jpg",
    category: "Культура и искусство",
  },
  {
    id: 15,
    accountName: "beauty_lab",
    description:
      "Как восстановить кожу осенью: советы дерматолога и лайфхаки ухода.",
    views: 11400,
    likes: 760,
    saves: 140,
    engagementRate: 6.7,
    postedAt: "9 часов назад",
    image: "/reels2.jpg",
    category: "Красота и косметика",
  },
  {
    id: 16,
    accountName: "run_free",
    description:
      "Марафонцы делятся опытом подготовки: питание, сон, тренировки.",
    views: 15700,
    likes: 900,
    saves: 180,
    engagementRate: 6.9,
    postedAt: "1 час назад",
    image: "/reels3.jpg",
    category: "Спорт и отдых",
  },
  {
    id: 17,
    accountName: "shop_now",
    description:
      "Как ритейл готовится к Чёрной пятнице. Новые выкладки и покупательские сценарии.",
    views: 4800,
    likes: 110,
    saves: 15,
    engagementRate: 2.4,
    postedAt: "3 дня назад",
    image: "/reels1.jpg",
    category: "Ритейл",
  },
  {
    id: 18,
    accountName: "chef_diary",
    description:
      "Шеф-повар показывает быстрый рецепт пасты с трюфельным маслом.",
    views: 9300,
    likes: 500,
    saves: 88,
    engagementRate: 5.7,
    postedAt: "5 дней назад",
    image: "/reels4.jpg",
    category: "Рестораны и кафе",
  },
];
