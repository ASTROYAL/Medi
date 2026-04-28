import Link from "next/link";
import { Activity, Pill, Clock, ArrowRight, ShieldCheck, Microscope } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Microscope className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-blue-900">MediCore Labs</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#tests" className="text-slate-600 hover:text-blue-600 font-medium">Lab Tests</Link>
              <Link href="#medicines" className="text-slate-600 hover:text-blue-600 font-medium">Medicines</Link>
              <Link href="#about" className="text-slate-600 hover:text-blue-600 font-medium">About Us</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-blue-600 font-medium hover:text-blue-700">Login</Link>
              <Link href="/dashboard" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Patient Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blue-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800"></div>
        {/* Placeholder abstract shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-cyan-400 opacity-20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Your Health, <br/><span className="text-cyan-400">Our Priority.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto lg:mx-0">
              Book lab tests from home, order medicines with quick delivery, and manage your family's health records all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-cyan-500 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 shadow-lg transition-all flex items-center justify-center gap-2">
                <Activity className="w-5 h-5" /> Book Lab Test
              </button>
              <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 shadow-lg transition-all flex items-center justify-center gap-2">
                <Pill className="w-5 h-5" /> Order Medicines
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 mt-16 lg:mt-0 relative z-10">
             <div className="bg-white p-2 rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Laboratory Scientist"
                  className="rounded-xl w-full h-auto object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose MediCore Labs?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We provide a seamless digital healthcare experience from sample collection to medicine delivery.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Home Sample Collection</h3>
              <p className="text-slate-600">Book a test online and our certified phlebotomists will visit your home at your selected timeslot.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 text-cyan-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">100% Accurate Reports</h3>
              <p className="text-slate-600">Our state-of-the-art diagnostic equipment ensures highly accurate and fast report generation.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Digital Health Records</h3>
              <p className="text-slate-600">Access your complete medical history, view health trends, and download smart PDF reports anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Ready to take control of your health?</h2>
          <p className="text-lg text-slate-600 mb-8">Create an account today to easily book tests, order medicines, and track your family's health.</p>
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg transition-all">
            Go to Patient Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Microscope className="h-6 w-6 text-cyan-400" />
            <span className="font-bold text-xl text-white">MediCore Labs</span>
          </div>
          <p className="mb-6">&copy; 2024 MediCore Digital Pathology & Pharmacy. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}