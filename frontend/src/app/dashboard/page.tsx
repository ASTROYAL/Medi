import Link from "next/link";
import { LayoutDashboard, FileText, ShoppingBag, User, LogOut, Activity } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="font-bold text-xl text-blue-900">MediCore</span>
        </div>
        <div className="p-4 flex-1">
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg font-medium">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 px-4 py-3 rounded-lg font-medium transition-colors">
              <FileText className="w-5 h-5" /> Lab Reports
            </a>
            <a href="#" className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 px-4 py-3 rounded-lg font-medium transition-colors">
              <ShoppingBag className="w-5 h-5" /> My Orders
            </a>
            <a href="#" className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 px-4 py-3 rounded-lg font-medium transition-colors">
              <User className="w-5 h-5" /> Profile
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-200">
          <Link href="/" className="flex items-center gap-3 text-slate-600 hover:text-red-600 px-4 py-2 font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Welcome back, John</h1>
              <p className="text-slate-500">Here's an overview of your health status.</p>
            </div>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              Book New Test
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-full">Processing</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Complete Blood Count</h3>
              <p className="text-sm text-slate-500 mb-4">Sample collected today at 9:00 AM</p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 w-2/3 h-full rounded-full"></div>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-right">Report expected by 6:00 PM</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">Delivered</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Monthly Medicines</h3>
              <p className="text-sm text-slate-500 mb-4">Order #ORD-8821</p>
              <button className="w-full py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                Reorder
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow-md text-white flex flex-col justify-center items-center text-center">
              <h3 className="font-bold text-xl mb-2">Need a Doctor?</h3>
              <p className="text-blue-100 text-sm mb-4">Book a tele-consultation with our top physicians.</p>
              <button className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-bold w-full hover:bg-blue-50 transition-colors">
                Consult Now
              </button>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Reports</h2>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <tr>
                  <th className="px-6 py-3 font-medium">Test Name</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Patient</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Lipid Profile</td>
                  <td className="px-6 py-4 text-slate-500">Oct 12, 2023</td>
                  <td className="px-6 py-4 text-slate-500">John Doe</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 font-medium hover:text-blue-800 text-sm">Download PDF</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Thyroid Profile (T3, T4, TSH)</td>
                  <td className="px-6 py-4 text-slate-500">Aug 05, 2023</td>
                  <td className="px-6 py-4 text-slate-500">Jane Doe</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 font-medium hover:text-blue-800 text-sm">Download PDF</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}