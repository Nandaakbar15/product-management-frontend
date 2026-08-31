import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import CardStats from "../../../components/CardStats";
import CardStats2 from "../../../components/CardStats2";
import CardStats3 from "../../../components/CardStats3";
import CardStats4 from "../../../components/CardStats4";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 font-sans antialiased min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* 1. SIDEBAR */}
        <Sidebar />

        {/* 2. MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
          {/* HEADER */}
          <Header />

          {/* MAIN CONTAINER */}
          <main className="p-6 space-y-6 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Ringkasan Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Selamat datang kembali! Ini laporan statistik Anda hari ini.
                </p>
              </div>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card Stat 1 */}
              <CardStats />

              {/* Card Stat 2 */}
              <CardStats2 />

              {/* Card Stat 3 */}
              <CardStats3 />

              {/* Card Stat 4 */}
              <CardStats4 />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
