export default function MiniProfile({ user }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-2">
        <img src={user.photo_url} className="w-8 h-8 rounded-full" alt={user.first_name} />
        <span>{user.first_name}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded-lg p-4 opacity-0 group-hover:opacity-100 transition">
        <div>
          <strong>Телефон:</strong> {user.phone_number || 'Не указан'}
        </div>
        <div>
          <strong>Статус подписки:</strong> {user.subscription || 'Нет подписки'}
        </div>
        <div>
          <button className="mt-2 text-blue-600">Выйти</button>
        </div>
      </div>
    </div>
  );
}