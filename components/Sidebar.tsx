import {
  PieChart,
  Users,
  Package,
  ChartBarStacked,
  Ad,
  Container,
  LogOut,
  Barcode,
} from "lucide-react";

export default function Sidebar() {
  return (
    <>
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col md:flex shrink-0">
        <div className="h-16 flex items-center justify-center border-b border-slate-800 px-6 mt-5">
          <span className="text-[20px] font-bold tracking-wider text-slate-400">
            PT. Makmur Jaya Sentosa
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium bg-indigo-600 text-white rounded-lg transition-colors"
          >
            <PieChart className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="/user_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Users className="w-5 h-5" />
            Pengguna
          </a>
          <a
            href="/product_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Package className="w-5 h-5" />
            Produk
          </a>
          <a
            href="/category_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <ChartBarStacked className="w-5 h-5" />
            Kategori
          </a>
          <a
            href="/brand_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Ad className="w-5 h-5" />
            Brand
          </a>
          <a
            href="/supplier_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Container className="w-5 h-5" />
            Supplier
          </a>
          <a
            href="/product_variant_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Barcode className="w-5 h-5" />
            Product Variant
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff"
              alt="Avatar"
              className="w-9 h-9 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-slate-400">admin@dev.com</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-red-400">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </>
  );
}
