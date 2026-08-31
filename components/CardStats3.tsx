import { Users, TrendingDown } from "lucide-react";

export default function CardStats3() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">Pengguna Aktif</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">8,920</h3>
        <span className="text-xs text-rose-600 font-medium mt-2 inline-flex items-center gap-1">
          <TrendingDown className="w-3.5 h-3.5" /> -2% minggu ini
        </span>
      </div>
      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
        <Users className="w-6 h-6" />
      </div>
    </div>
  );
}
