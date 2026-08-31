import { TrendingUp } from "lucide-react";

export default function CardStats4() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">Tingkat Konversi</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">3.45%</h3>
        <span className="text-xs text-emerald-600 font-medium mt-2 inline-flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> +0.5% bulan ini
        </span>
      </div>
      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
        <TrendingUp className="w-6 h-6" />
      </div>
    </div>
  );
}
