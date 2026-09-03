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

import axios from "axios";

import Modal from "./Modal";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const logout = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload bawaan form
    try {
      const res = await axios.post("http://localhost:3000/api/logout");

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <>
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col md:flex shrink-0">
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <p className="text-center text-gray-700">{message}</p>
        </Modal>
        <div className="h-16 flex items-center justify-center border-b border-slate-800 px-6 mt-5">
          <span className="text-[20px] font-bold tracking-wider text-slate-400">
            PT. Makmur Jaya Sentosa
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium bg-indigo-600 text-white rounded-lg transition-colors"
          >
            <PieChart className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/user_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Users className="w-5 h-5" />
            Pengguna
          </Link>
          <Link
            to="/product_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Package className="w-5 h-5" />
            Produk
          </Link>
          <Link
            to="/category_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <ChartBarStacked className="w-5 h-5" />
            Kategori
          </Link>
          <Link
            to="/brand_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Ad className="w-5 h-5" />
            Brand
          </Link>
          <Link
            to="/supplier_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Container className="w-5 h-5" />
            Supplier
          </Link>
          <Link
            to="/product_variant_data"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Barcode className="w-5 h-5" />
            Product Variant
          </Link>
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
          <button
            className="text-slate-400 hover:text-red-400"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </>
  );
}
