import "../styles/globals.css";

export const metadata = {
  title: "LiveDune — Тренды Reels",
  description: "Лента трендов Reels в стиле Pinterest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-[#F7F7F8] font-inter text-neutral-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}